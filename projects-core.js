/* Projects group real expenses; legacy project entries are retained as provenance. */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.ProjectLedger = api;
})(typeof globalThis === "object" ? globalThis : this, function () {
  "use strict";
  const cents = amount => Math.round(Number(amount || 0) * 100);
  function allExpenses(state) {
    return Object.entries(state.months).flatMap(([monthId, month]) =>
      month.expenses.map(expense => ({ monthId, expense })));
  }
  function findExpense(state, id, monthId = null) {
    const matches = allExpenses(state).filter(row => row.expense.id === id && (!monthId || row.monthId === monthId));
    if (matches.length > 1) throw new Error("ambiguous-expense");
    return matches[0] || null;
  }
  function projectExpenses(state, projectId) {
    return allExpenses(state).filter(row => row.expense.projectId === projectId)
      .sort((a, b) => b.expense.date.localeCompare(a.expense.date) ||
        String(b.expense.createdAt || "").localeCompare(String(a.expense.createdAt || "")));
  }
  function pendingEntries(project) {
    return project.legacySettled ? [] : (project.entries || []).filter(entry => !entry.resolution);
  }
  function migrate(state) {
    for (const project of state.projects || []) {
      if (project.accountingVersion === 1) continue;
      project.entries = Array.isArray(project.entries) ? project.entries : [];
      project.legacySettled = project.status === "settled";
      project.accountingVersion = 1;
      if (!project.legacySettled) continue;
      // Only explicit settlement IDs can repair a missing association. Never
      // infer a payment from names, amounts, dates, or the original entries.
      for (const id of project.settlementExpenseIds || []) {
        const row = findExpense(state, id);
        if (row && !row.expense.projectId) row.expense.projectId = project.id;
      }
    }
    return state;
  }
  function total(state, projectId) {
    return projectExpenses(state, projectId).reduce((sum, row) => sum + cents(row.expense.amount), 0) / 100;
  }
  function monthForDate(date) {
    if (!/^\d{4}-(0[1-9]|1[0-2])-\d{2}$/.test(String(date))) throw new Error("invalid-date");
    const parsed = new Date(`${date}T12:00:00Z`);
    if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) throw new Error("invalid-date");
    return date.slice(0, 7);
  }
  function cascade(state, fromMonthId) {
    let previousKey = fromMonthId;
    Object.keys(state.months).sort().filter(key => key > fromMonthId).forEach(key => {
      const previous = state.months[previousKey];
      for (const fund of state.months[key].funds) {
        const prior = previous.funds.find(item => item.name === fund.name);
        if (prior) fund.start = Number(prior.start || 0) + Number(prior.allocation || 0) -
          previous.expenses.filter(expense => expense.category === prior.name).reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
      }
      previousKey = key;
    });
  }
  function putExpense(state, { originalId = null, originalMonthId = null, id, payload, stamp }) {
    const monthId = monthForDate(payload.date);
    const month = state.months[monthId];
    if (!month || !Number.isFinite(payload.amount) || payload.amount <= 0) throw new Error("invalid-expense");
    const original = originalId ? findExpense(state, originalId, originalMonthId) : null;
    if (originalId && !original) throw new Error("missing-expense");
    if (payload.projectId && !state.projects.some(project => project.id === payload.projectId)) throw new Error("missing-project");
    const financialChange = !original || original.monthId !== monthId ||
      original.expense.date !== payload.date || original.expense.category !== payload.category ||
      cents(original.expense.amount) !== cents(payload.amount);
    if (financialChange && !month.funds.some(fund => fund.name === payload.category)) throw new Error("missing-category");
    if (!original && findExpense(state, id)) throw new Error("duplicate-expense");
    const expense = { ...(original?.expense || {}), ...payload, id: originalId || id,
      createdAt: original?.expense.createdAt || stamp, updatedAt: stamp };
    if (!payload.projectId) delete expense.projectId;
    if (original) {
      const list = state.months[original.monthId].expenses;
      list.splice(list.indexOf(original.expense), 1);
    }
    month.expenses.push(expense);
    const affectedFrom = [monthId, original?.monthId].filter(Boolean).sort()[0];
    if (financialChange) {
      for (const [key, category] of [[monthId, expense.category], [original?.monthId, original?.expense.category]]) {
        const fund = state.months[key]?.funds.find(item => item.name === category);
        if (fund) fund.updatedAt = stamp;
      }
      cascade(state, affectedFrom);
    }
    for (const project of state.projects) {
      if ([expense.projectId, original?.expense.projectId].includes(project.id)) project.updatedAt = stamp;
    }
    return { expense, monthId, financialChange, affectedFrom };
  }
  function linkExpenses(state, refs, projectId, stamp, allowReassign = false) {
    if (projectId && !state.projects.some(project => project.id === projectId)) throw new Error("missing-project");
    const rows = refs.map(ref => findExpense(state, ref.id, ref.monthId));
    if (rows.some(row => !row)) throw new Error("missing-expense");
    if (!allowReassign && rows.some(row => row.expense.projectId && row.expense.projectId !== projectId)) throw new Error("already-linked");
    for (const row of rows) {
      const previous = row.expense.projectId;
      if (projectId) row.expense.projectId = projectId;
      else delete row.expense.projectId;
      row.expense.updatedAt = stamp;
      for (const project of state.projects) if ([projectId, previous].includes(project.id)) project.updatedAt = stamp;
    }
  }
  function resolveEntry(state, projectId, entryId, ref, kind, stamp, allowReassign = false) {
    const project = state.projects.find(item => item.id === projectId);
    const entry = project && pendingEntries(project).find(item => item.id === entryId);
    if (!entry) return false;
    if (!["posted", "linked", "dismissed"].includes(kind)) throw new Error("invalid-resolution");
    if (kind !== "dismissed") linkExpenses(state, [ref], projectId, stamp, allowReassign);
    entry.resolution = { kind, expenseId: ref?.id || null, resolvedAt: stamp };
    project.updatedAt = stamp;
    return true;
  }
  function deleteExpense(state, ref, stamp) {
    const row = findExpense(state, ref.id, ref.monthId);
    if (!row) return false;
    const month = state.months[row.monthId];
    month.expenses.splice(month.expenses.indexOf(row.expense), 1);
    const fund = month.funds.find(item => item.name === row.expense.category);
    if (fund) fund.updatedAt = stamp;
    const project = state.projects.find(item => item.id === row.expense.projectId);
    if (project) project.updatedAt = stamp;
    cascade(state, row.monthId);
    return true;
  }
  function postLegacyExpense(state, { projectId, entryId, id, payload, stamp }) {
    const project = state.projects.find(item => item.id === projectId);
    if (!project || !pendingEntries(project).some(entry => entry.id === entryId)) return null;
    const result = putExpense(state, { id, payload: { ...payload, projectId,
      legacyProjectEntryId: entryId }, stamp });
    resolveEntry(state, projectId, entryId, { id: result.expense.id, monthId: result.monthId }, "posted", stamp);
    return result;
  }
  function deleteProject(state, id, stamp) {
    const project = state.projects.find(item => item.id === id);
    if (!project) return false;
    if (pendingEntries(project).length) throw new Error("pending-legacy");
    const refs = projectExpenses(state, id).map(row => ({ id: row.expense.id, monthId: row.monthId }));
    linkExpenses(state, refs, null, stamp, true);
    state.projects = state.projects.filter(item => item.id !== id);
    return true;
  }
  return { allExpenses, findExpense, projectExpenses, pendingEntries, migrate, total, monthForDate,
    cascade, putExpense, linkExpenses, resolveEntry, postLegacyExpense, deleteExpense, deleteProject };
});
