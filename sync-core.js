/* Deterministic sync rules, shared by the browser and Node's test runner. */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.MoneySync = api;
})(typeof globalThis === "object" ? globalThis : this, function () {
  "use strict";
  const LOCAL_KEYS = new Set([
    "currentMonth", "language", "languageNormalized", "privacyMode", "fundSort", "fundOrder",
    "backupDirty", "lastBackupAt", "updatedAt", "cloudSync", "backupCreatedAt", "app"
  ]);
  const absent = Symbol("absent");
  function canonical(value) {
    if (value === absent) return "<absent>";
    if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
    if (value && typeof value === "object") {
      return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;
    }
    return JSON.stringify(value);
  }
  function equal(left, right) { return canonical(left) === canonical(right); }
  function recordEqual(left, right) {
    if (!isObject(left) || !isObject(right)) return equal(left, right);
    const l = { ...left }, r = { ...right };
    delete l.updatedAt;
    delete r.updatedAt;
    return equal(l, r);
  }
  function content(state) {
    const result = {};
    for (const [key, value] of Object.entries(state)) {
      if (!LOCAL_KEYS.has(key)) Object.defineProperty(result, key, { value: structuredClone(value), enumerable: true, writable: true });
    }
    return result;
  }
  function withContent(local, data) {
    const result = structuredClone(data);
    for (const key of LOCAL_KEYS) {
      if (key !== "backupCreatedAt" && key !== "app" && Object.hasOwn(local, key)) result[key] = structuredClone(local[key]);
    }
    if (!result.months?.[result.currentMonth]) result.currentMonth = Object.keys(result.months || {}).sort().at(-1);
    return result;
  }
  function isObject(value) { return value !== absent && value !== null && typeof value === "object" && !Array.isArray(value); }
  function idArray(value) {
    return Array.isArray(value) && value.every(item => isObject(item) && typeof item.id === "string" && item.id);
  }
  function merge(base, local, remote) {
    const conflicts = [];
    // Scan balance adjustments before equality shortcuts at parent objects.
    // Separate transfers can end at the same balance while having distinct
    // ledger events, so their financial intent cannot be inferred safely.
    for (const [monthId, month] of Object.entries(base.months || {})) {
      for (const original of month.funds || []) {
        const l = local.months?.[monthId]?.funds?.find(item => item.id === original.id);
        const r = remote.months?.[monthId]?.funds?.find(item => item.id === original.id);
        const changed = item => item && ["start", "allocation", "name"].some(key => !equal(item[key], original[key]));
        if (changed(l) && changed(r)) conflicts.push(`/months/${monthId}/funds/${original.id}`);
      }
    }
    function visit(b, l, r, path, atomic = false) {
      // Updated timestamps support sorting, but are not a financial conflict.
      if (atomic) {
        if (recordEqual(l, r)) return String(l?.updatedAt || "") > String(r?.updatedAt || "") ? l : r;
        if (recordEqual(l, b)) return r;
        if (recordEqual(r, b)) return l;
      }
      if (equal(l, r)) return l;
      if (equal(l, b)) return r;
      if (equal(r, b)) return l;
      // Records are atomic: changing different fields of the same expense or
      // fund can still change its meaning. Deletion versus editing conflicts.
      if (!atomic && idArray(b) && idArray(l) && idArray(r)) {
        const maps = [b, l, r].map(list => new Map(list.map(item => [item.id, item])));
        if (maps.some((map, index) => map.size !== [b, l, r][index].length)) {
          conflicts.push(path); return l;
        }
        const ids = [...new Set([...l, ...r, ...b].map(item => item.id))];
        return ids.map(id => visit(...maps.map(map => map.has(id) ? map.get(id) : absent), `${path}/${id}`, true)).filter(item => item !== absent);
      }
      if (!atomic && isObject(b) && isObject(l) && isObject(r)) {
        const result = {};
        for (const key of new Set([...Object.keys(b), ...Object.keys(l), ...Object.keys(r)])) {
          if (["__proto__", "constructor", "prototype"].includes(key)) { conflicts.push(`${path}/${key}`); continue; }
          const value = visit(...[b, l, r].map(obj => Object.hasOwn(obj, key) ? obj[key] : absent), `${path}/${key}`);
          if (value !== absent) result[key] = value;
        }
        return result;
      }
      conflicts.push(path || "/");
      return l;
    }
    const value = structuredClone(visit(base, local, remote, ""));
    if (!conflicts.length) {
      const existing = new Set([...ledgerIssues(base), ...ledgerIssues(local), ...ledgerIssues(remote)]);
      conflicts.push(...ledgerIssues(value).filter(issue => !existing.has(issue)));
    }
    return { value, conflicts: [...new Set(conflicts)] };
  }
  function validLedger(data, maxVersion = 3) {
    if (!isObject(data) || !isObject(data.months) || !Object.keys(data.months).length) return false;
    const version = Number(data.dataVersion || 1);
    if (!Number.isSafeInteger(version) || version < 1 || version > maxVersion) return false;
    return Object.entries(data.months).every(([id, month]) => /^\d{4}-(0[1-9]|1[0-2])$/.test(id) &&
      isObject(month) && ["funds", "incomes", "expenses"].every(key => idArray(month[key]) && new Set(month[key].map(row => row.id)).size === month[key].length));
  }
  function ledgerIssues(data) {
    if (!validLedger(data)) return ["invalid-ledger"];
    const issues = [];
    const projectIds = new Set((data.projects || []).map(project => project.id));
    const expenseIds = new Set();
    const keys = Object.keys(data.months).sort();
    keys.forEach((key, index) => {
      const month = data.months[key];
      const names = new Set(month.funds.map(fund => fund.name));
      if (names.size !== month.funds.length) issues.push(`duplicate-category/${key}`);
      const allocated = month.funds.reduce((sum, fund) => sum + Number(fund.allocation || 0), 0);
      const income = month.incomes.reduce((sum, item) => sum + Number(item.amount || 0), 0);
      if (Math.round((allocated - income) * 100) > 0) issues.push(`overallocated/${key}/${Math.round((allocated - income) * 100)}`);
      month.expenses.forEach(expense => {
        if (!names.has(expense.category)) issues.push(`missing-category/${key}/${expense.id}`);
        if (Number(data.dataVersion) >= 3 && expense.projectId && !projectIds.has(expense.projectId)) issues.push(`missing-project/${key}/${expense.id}`);
        if (expenseIds.has(expense.id)) issues.push(`duplicate-expense/${expense.id}`);
        expenseIds.add(expense.id);
      });
      if (!index) return;
      const previous = data.months[keys[index - 1]];
      month.funds.forEach(fund => {
        const prior = previous.funds.find(item => item.name === fund.name);
        if (!prior) return;
        const spent = previous.expenses.filter(item => item.category === prior.name).reduce((sum, item) => sum + Number(item.amount || 0), 0);
        const expected = Math.round((Number(prior.start || 0) + Number(prior.allocation || 0) - spent) * 100);
        if (Math.round(Number(fund.start || 0) * 100) !== expected) issues.push(`month-continuity/${key}/${fund.id}`);
      });
    });
    return issues;
  }
  return { content, withContent, equal, merge, validLedger, ledgerIssues };
});
