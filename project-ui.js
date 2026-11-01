const PROJECT_COPY = {
  en: {
    settled: "Completed", settledProjects: "Completed projects", settle: "Complete", reopen: "Reopen",
    projectSpending: "Total spent", projectOptional: "Project (optional)", noProject: "No project",
    linkExisting: "Link existing expenses", unlinkProject: "Remove from project", originalDetails: "Original details",
    pendingLegacy: (count, amount) => `${count} old project record${count === 1 ? "" : "s"} to review · ${amount}`,
    legacyExplanation: "These records have not been posted. Confirm the payment date and category, or link an expense you already recorded.",
    reviewLegacy: "Review old record", postLegacy: "Confirm & post expense", dismissLegacy: "Skip this old record",
    dismissLegacyConfirm: "Skip this old record? No expense will be created. The original record remains in the project history.",
    legacyPostConfirm: "Post this payment to its dated month? The category balance and later months will update. Check that you have not already recorded it elsewhere.",
    pendingBeforeComplete: "Review or skip the remaining old records first.",
    deleteProjectConfirm: name => `Delete ${name}? Its real expenses and category balances will be kept.`,
    completeProjectConfirm: "Complete this project? Its expenses and category balances will stay unchanged.",
    reopenProjectConfirm: "Reopen this project? Its expenses and category balances will stay unchanged.",
    deleteSettledProjectExpenseConfirm: "Delete this real expense? Its category balance and project total will update.",
    unlinkProjectConfirm: "Remove this expense from the project? The expense and category balance will be kept.",
    noProjectExpenses: "No posted expenses yet.", searchProjectExpenses: "Search date, category, note or project",
    selectExpenses: "Select expenses to link. Their amounts, dates and category balances will not change.",
    chooseExpense: "Select an expense first.", reassignExpense: "Some selected expenses belong to another project. Move their project association here? Category balances will stay unchanged.",
    linkLegacyConfirm: "Link this existing expense to the old record? No new payment will be created. The project total will use the existing expense amount.",
    reviewFirst: "Finish reviewing old project records before deleting this project.",
    missingExpenseCategory: "This category does not exist in the payment month. Choose a category available in that month.",
    unavailableCategory: "not in this month", financialMonthChange: "This changes a payment in an earlier month. Later-month starting balances will also update. Continue?",
    expenseDateInvalid: "Enter a valid payment date.", originalOnly: "Original records are for reference; only linked real expenses count toward the total.",
    legacyMismatch: "Some historical settlement expenses are missing or were changed. Original details are retained for reference; no replacement payments were created.",
    resolvedPosted: "Posted", resolvedLinked: "Linked", resolvedDismissed: "Skipped", restoreLegacy: "Review again",
    localPreview: "Local preview · Cloud sync is disabled. Changes stay in this browser.",
    projectExpense: "Project expense", recordPosted: "Expense posted", expensesLinked: "Expenses linked",
    currentProject: "Already in this project", paymentDate: "Payment date"
  },
  zh: {
    settled: "已完成", settledProjects: "已完成项目", settle: "完成项目", reopen: "重新打开",
    projectSpending: "累计开销", projectOptional: "所属项目（可选）", noProject: "不关联项目",
    linkExisting: "关联已有开销", unlinkProject: "从项目移除", originalDetails: "原始明细",
    pendingLegacy: (count, amount) => `${count} 笔旧项目记录待处理 · ${amount}`,
    legacyExplanation: "这些记录尚未入账。请核对付款日期和分类后入账，或关联你已经记录过的开销。",
    reviewLegacy: "处理旧记录", postLegacy: "确认并入账", dismissLegacy: "跳过这条旧记录",
    dismissLegacyConfirm: "跳过这条旧记录？不会创建开销，原始记录仍保留在项目历史中。",
    legacyPostConfirm: "按付款日期将这笔费用入账？对应分类余额和后续月份会更新，请确认没有在其他地方重复记录。",
    pendingBeforeComplete: "请先处理或跳过剩余旧记录。",
    deleteProjectConfirm: name => `删除 ${name}？真实开销会保留，分类余额不会改变。`,
    completeProjectConfirm: "完成这个项目？已记录的开销和分类余额保持不变。",
    reopenProjectConfirm: "重新打开这个项目？已记录的开销和分类余额保持不变。",
    deleteSettledProjectExpenseConfirm: "删除这笔真实开销？对应分类余额和项目总额会一起更新。",
    unlinkProjectConfirm: "从项目移除这笔开销？真实开销和分类余额会保留。",
    noProjectExpenses: "还没有已入账的开销。", searchProjectExpenses: "搜索日期、分类、备注或项目",
    selectExpenses: "选择要关联的已有开销。金额、付款日期和分类余额均保持不变。",
    chooseExpense: "请先选择开销。", reassignExpense: "部分开销已属于其他项目。将它们改为关联当前项目？分类余额不会改变。",
    linkLegacyConfirm: "将这条旧记录关联到已有开销？不会新增扣款，项目总额以已有开销金额为准。",
    reviewFirst: "请先处理旧项目记录，再删除项目。",
    missingExpenseCategory: "付款月份没有这个分类，请选择该月份已有的分类。",
    unavailableCategory: "该月份不存在", financialMonthChange: "这会修改较早月份的开销，后续月份起始余额也会更新。继续吗？",
    expenseDateInvalid: "请输入有效的付款日期。", originalOnly: "原始记录仅供参考，累计开销只计算关联的真实支出。",
    legacyMismatch: "部分历史结算开销已被修改或缺失。原始明细仍保留，系统没有补记或重复扣款。",
    resolvedPosted: "已入账", resolvedLinked: "已关联", resolvedDismissed: "已跳过", restoreLegacy: "重新处理",
    localPreview: "本地预览 · 云端同步已关闭，所有修改仅保存在此浏览器。",
    projectExpense: "项目开销", recordPosted: "已入账", expensesLinked: "已关联开销",
    currentProject: "已属于当前项目", paymentDate: "付款日期"
  }
};

function projectExpenseRows(project) { return ProjectLedger.projectExpenses(state, project.id); }
function projectNameFor(id) { return state.projects.find(project => project.id === id)?.name || ""; }
function pendingProjectEntries(project) { return ProjectLedger.pendingEntries(project); }
function projectBadge(id) {
  const name = projectNameFor(id);
  return name ? `<span class="expense-project-badge">${escapeHtml(name)}</span>` : "";
}
function renderRealProjectCard(project) {
  const total = projectTotal(project);
  const pending = pendingProjectEntries(project);
  return `<article class="project-card ${project.status === "settled" ? "is-settled" : ""}" data-action="view-project" data-id="${escapeAttr(project.id)}">
    <div class="project-card-head"><h3>${escapeHtml(project.name)}</h3><div class="project-card-amount"><small>${t("projectSpending")}</small><strong>${money(total)}</strong></div></div>
    <div class="project-card-meta"><span>${escapeHtml(projectDateRange(project))}</span><span>${escapeHtml(projectDefaultCategoryName(project) || "-")}</span>
      <span class="status-pill compact ${project.status === "settled" ? "is-settled" : ""}"><i></i><span>${t(project.status === "settled" ? "settled" : "active")}</span></span></div>
    ${pending.length ? `<p class="project-pending-note">${escapeHtml(t("pendingLegacy", pending.length, money(sum(pending))))}</p>` : ""}
    <div class="mini-breakdown">${renderAllocationBarSegments(projectBreakdown(project), total)}</div>
  </article>`;
}
function renderRealProjectDetail() {
  const project = selectedProject();
  if (!project) return;
  const completed = project.status === "settled";
  const rows = projectExpenseRows(project);
  const total = projectTotal(project);
  const breakdown = projectBreakdown(project);
  els.projectDetailName.textContent = project.name;
  els.projectDetailName.title = t("editProject");
  els.projectDetailMetaBtn.title = t("editProject");
  els.projectDetailStatus.classList.toggle("is-active", !completed);
  els.projectDetailStatus.classList.toggle("is-settled", completed);
  els.projectDetailStatus.innerHTML = `<i></i><span>${t(completed ? "settled" : "active")}</span>`;
  els.projectDetailTotal.textContent = money(total);
  document.querySelector("#projectSpendingLabel").textContent = t("projectSpending");
  els.projectDetailDefaultFund.textContent = projectDefaultCategoryName(project) || "-";
  els.projectDetailDates.textContent = projectDateRange(project);
  els.projectBreakdownBar.innerHTML = renderAllocationBarSegments(breakdown, total);
  els.projectBreakdownList.innerHTML = breakdown.map(item => `<div class="project-breakdown-row"><span><i style="--dot:${item.color}"></i>${escapeHtml(item.label)}</span><strong>${money(item.amount)}</strong></div>`).join("") || `<p class="empty compact-empty">${t("noProjectExpenses")}</p>`;
  els.addProjectEntryBtn.hidden = false;
  els.deleteProjectBtn.hidden = false;
  els.deleteProjectBtn.disabled = false;
  els.deleteProjectBtn.title = t("deleteProject");
  els.settleProjectBtn.textContent = t(completed ? "reopen" : "settle");
  els.settleProjectBtn.disabled = false;
  els.settleProjectBtn.classList.remove("primary-action");
  els.settleProjectBtn.classList.add("secondary-action");
  document.querySelector("#linkProjectExpenseBtn").textContent = t("linkExisting");
  renderProjectPlan(project);
  setProjectDetailSection(projectDetailSection);
  els.projectEntriesList.innerHTML = rows.map(({ expense, monthId }) => `<tr class="clickable-row" data-action="edit-project-expense" data-id="${escapeAttr(expense.id)}" data-month-id="${monthId}" tabindex="0" aria-label="${escapeAttr(t("editRecord", expense.category, money(expense.amount)))}">
    <td>${escapeHtml(formatShortDate(expense.date))}</td><td>${escapeHtml(expense.category)}</td><td>${escapeHtml(expense.note || "-")}</td><td class="number">${money(expense.amount)}</td></tr>`).join("") || `<tr><td colspan="4" class="empty">${t("noProjectExpenses")}</td></tr>`;
  renderProjectLegacy(project);
}
function renderProjectLegacy(project) {
  const pending = pendingProjectEntries(project);
  const panel = document.querySelector("#projectLegacyPanel");
  panel.hidden = !pending.length;
  panel.innerHTML = pending.length ? `<strong>${escapeHtml(t("pendingLegacy", pending.length, money(sum(pending))))}</strong><p>${t("legacyExplanation")}</p>
    ${pending.map(entry => `<button class="legacy-entry-review" type="button" data-action="review-project-legacy" data-id="${escapeAttr(entry.id)}"><span>${escapeHtml(entry.date)} · ${escapeHtml(entry.note || entry.category)}</span><strong>${money(entry.amount)}</strong><span aria-hidden="true">›</span></button>`).join("")}` : "";
  const history = document.querySelector("#projectOriginalDetails");
  const originals = project.entries || [];
  history.hidden = !originals.length;
  const settlementRows = (project.settlementExpenseIds || []).map(id => ProjectLedger.findExpense(state, id));
  const originalTotal = Math.round(sum(originals) * 100);
  const settledTotal = settlementRows.reduce((value, row) => value + Math.round(Number(row?.expense.amount || 0) * 100), 0);
  const mismatch = project.legacySettled && (settlementRows.some(row => !row || row.expense.projectId !== project.id) || originalTotal !== settledTotal);
  history.innerHTML = `<summary>${t("originalDetails")} · ${originals.length}</summary><p>${t("originalOnly")}</p>${mismatch ? `<p class="project-pending-note">${t("legacyMismatch")}</p>` : ""}
    ${originals.map(entry => `<div class="legacy-original-row"><span>${escapeHtml(entry.date)} · ${escapeHtml(entry.note || entry.category)}<small>${entry.resolution ? t({ posted: "resolvedPosted", linked: "resolvedLinked", dismissed: "resolvedDismissed" }[entry.resolution.kind]) : ""}</small></span><strong>${money(entry.amount)}</strong>
      ${entry.resolution?.kind === "dismissed" ? `<button type="button" data-action="restore-project-legacy" data-id="${escapeAttr(entry.id)}">${t("restoreLegacy")}</button>` : ""}</div>`).join("")}`;
}
function realProjectBreakdown(project) {
  const colors = ["#ff3b30", "#ff8a1f", "#f5c400", "#34a853", "#0071e3", "#8e8e93"];
  const totals = new Map();
  projectExpenseRows(project).forEach(({ expense }) => totals.set(expense.category, (totals.get(expense.category) || 0) + Math.round(Number(expense.amount) * 100)));
  return [...totals].map(([category, amount], index) => ({ label: category, category, amount: amount / 100,
    fundId: fundByName(category)?.id || "", color: colors[index % colors.length] }));
}
function expenseDraftMonth(date) {
  let key;
  try { key = ProjectLedger.monthForDate(date); } catch { key = editingMonthId || state.currentMonth; }
  return state.months[key] || state.months[previousMonthKey(key)] || currentMonth();
}
function expenseCategoryOptions(date, selected) {
  const funds = expenseDraftMonth(date).funds;
  const missing = selected && !funds.some(fund => fund.name === selected);
  return `${missing ? `<option value="${escapeAttr(selected)}" selected>${escapeHtml(selected)} (${t("unavailableCategory")})</option>` : ""}${funds.map(fund => `<option value="${escapeAttr(fund.name)}" ${selected === fund.name ? "selected" : ""}>${escapeHtml(fund.name)}</option>`).join("")}`;
}
function projectSelectField(selected = "") {
  return `<label class="field">${t("projectOptional")}<select name="projectId"><option value="">${t("noProject")}</option>${state.projects.map(project => `<option value="${escapeAttr(project.id)}" ${project.id === selected ? "selected" : ""}>${escapeHtml(project.name)}${project.status === "settled" ? ` · ${t("settled")}` : ""}</option>`).join("")}</select></label>`;
}
function expenseFields(item, legacy = false) {
  const date = item.date || defaultEntryDateForCurrentMonth();
  return `${legacy ? `<p class="project-dialog-help">${t("legacyExplanation")}</p><button type="button" class="secondary-action" data-action="link-legacy-expense" data-id="${escapeAttr(item.id)}">${t("linkExisting")}</button>` : ""}
    ${field(t("paymentDate"), "date", date, "date")}
    <label class="field">${t("category")}<select name="category">${expenseCategoryOptions(date, item.category)}</select></label>
    ${noteField(t("note"), item.note || "")}${field(t("amount"), "amount", item.amount || "", "number")}
    ${legacy ? "" : projectSelectField(item.projectId)}
    ${!legacy && item.id && item.projectId ? `<button type="button" class="secondary-action" data-action="unlink-project-expense" data-id="${escapeAttr(item.id)}">${t("unlinkProject")}</button>` : ""}`;
}
function updateExpenseDateOptions(event) {
  if (!["expense", "legacyProjectEntry"].includes(dialogMode) || event.target.name !== "date") return;
  const select = els.form.querySelector("[name='category']");
  if (select) select.innerHTML = expenseCategoryOptions(event.target.value, select.value);
}
function renderProjectExpensePicker(legacyEntryId) {
  const project = selectedProject();
  if (!project) return "";
  const rows = ProjectLedger.allExpenses(state).filter(({ expense }) => legacyEntryId || expense.projectId !== project.id)
    .sort((a, b) => b.expense.date.localeCompare(a.expense.date));
  return `<p class="project-dialog-help">${t("selectExpenses")}</p><label class="field">${t("searchProjectExpenses")}<input type="search" data-project-link-search placeholder="${escapeAttr(t("searchProjectExpenses"))}" autocomplete="off"></label>
    <div class="project-expense-picker">${rows.map(({ expense, monthId }) => {
      const owner = projectNameFor(expense.projectId);
      const label = `${expense.date} ${expense.category} ${expense.note || ""} ${owner} ${expense.amount}`;
      return `<label class="project-expense-choice" data-search="${escapeAttr(label.toLowerCase())}"><input type="${legacyEntryId ? "radio" : "checkbox"}" name="${legacyEntryId ? "expenseRef" : `expense:${expense.id}`}" value="${escapeAttr(JSON.stringify({ id: expense.id, monthId }))}"><span><strong>${escapeHtml(expense.note || expense.category)}</strong><small>${escapeHtml(expense.date)} · ${escapeHtml(expense.category)}${owner ? ` · ${escapeHtml(owner)}` : ""}</small></span><strong>${money(expense.amount)}</strong></label>`;
    }).join("") || `<p class="empty">${t("noMatchingRecords")}</p>`}</div>`;
}
function filterProjectExpenseChoices(event) {
  if (!event.target.matches("[data-project-link-search]")) return;
  const query = event.target.value.trim().toLowerCase();
  els.fields.querySelectorAll(".project-expense-choice").forEach(row => { row.hidden = !row.dataset.search.includes(query); });
}
function confirmEarlierExpenseChange(monthIds) {
  return !monthIds.some(id => laterMonthKeys(id).length) || window.confirm(t("financialMonthChange"));
}
function saveRealExpense(data, legacyEntryId = null) {
  const project = legacyEntryId ? selectedProject() : null;
  const legacy = project && pendingProjectEntries(project).find(entry => entry.id === legacyEntryId);
  if (legacyEntryId && !legacy) return;
  const amount = parseMoneyInput(data.amount);
  if (amount === null || amount <= 0) return alert(t("validAmount"));
  let monthId;
  try { monthId = ProjectLedger.monthForDate(data.date); } catch { return alert(t("expenseDateInvalid")); }
  const original = !legacyEntryId && editingId ? ProjectLedger.findExpense(state, editingId, editingMonthId) : null;
  if (!legacyEntryId && editingId && !original) return alert(t("importFailed"));
  const payload = { date: data.date, category: data.category || "", note: String(data.note || "").trim(), amount,
    projectId: project?.id || data.projectId || "" };
  if (payload.projectId && !state.projects.some(item => item.id === payload.projectId)) return alert(t("importFailed"));
  const financial = !original || original.monthId !== monthId || original.expense.date !== payload.date ||
    original.expense.category !== payload.category || moneyCents(original.expense.amount) !== moneyCents(amount);
  if (financial && !expenseDraftMonth(data.date).funds.some(fund => fund.name === payload.category)) return alert(t("missingExpenseCategory"));
  if (legacy && !window.confirm(t("legacyPostConfirm"))) return;
  if (!legacy && financial && !confirmEarlierExpenseChange([monthId, original?.monthId].filter(Boolean))) return;
  if (!state.months[monthId]) {
    const previous = previousMonthKey(monthId);
    if (!window.confirm(t("createMonth", formatMonthLabel(monthId), previous ? formatMonthLabel(previous) : ""))) return;
  }
  saveSyncRecovery(state, legacy ? "before-project-entry-post" : "before-expense-edit");
  if (!state.months[monthId]) createMonthRecord(monthId);
  if (legacy) ProjectLedger.postLegacyExpense(state, { projectId: project.id, entryId: legacy.id,
    id: crypto.randomUUID(), payload, stamp: nowStamp() });
  else ProjectLedger.putExpense(state, { originalId: original?.expense.id, originalMonthId: original?.monthId,
    id: crypto.randomUUID(), payload, stamp: nowStamp() });
  markFinancialDirty();
  saveState();
  closeEntryDialog();
  render();
  showToast(t("recordPosted"));
}
function saveProjectExpenseLinks(data) {
  const project = selectedProject();
  if (!project) return;
  const refs = Object.entries(data).filter(([key]) => key === "expenseRef" || key.startsWith("expense:")).map(([, value]) => JSON.parse(value));
  if (!refs.length) return alert(t("chooseExpense"));
  const legacyId = editingId;
  if (legacyId && !pendingProjectEntries(project).some(entry => entry.id === legacyId)) return;
  const rows = refs.map(ref => ProjectLedger.findExpense(state, ref.id, ref.monthId));
  if (rows.some(row => !row)) return alert(t("importFailed"));
  if (rows.some(row => row.expense.projectId && row.expense.projectId !== project.id) && !window.confirm(t("reassignExpense"))) return;
  if (legacyId && !window.confirm(t("linkLegacyConfirm"))) return;
  saveSyncRecovery(state, "before-project-link");
  if (legacyId) ProjectLedger.resolveEntry(state, project.id, legacyId, refs[0], "linked", nowStamp(), true);
  else ProjectLedger.linkExpenses(state, refs, project.id, nowStamp(), true);
  markFinancialDirty(); saveState(); closeEntryDialog(); render(); showToast(t("expensesLinked"));
}
function unlinkProjectExpense(id) {
  const row = ProjectLedger.findExpense(state, id, editingMonthId);
  if (!row || !window.confirm(t("unlinkProjectConfirm"))) return;
  saveSyncRecovery(state, "before-project-unlink");
  ProjectLedger.linkExpenses(state, [{ id, monthId: row.monthId }], null, nowStamp(), true);
  markFinancialDirty(); saveState(); closeEntryDialog(); render();
}
function dismissProjectLegacy(id) {
  const project = selectedProject();
  if (!project || !pendingProjectEntries(project).some(entry => entry.id === id) || !window.confirm(t("dismissLegacyConfirm"))) return;
  saveSyncRecovery(state, "before-project-legacy-skip");
  ProjectLedger.resolveEntry(state, project.id, id, null, "dismissed", nowStamp());
  markFinancialDirty(); saveState(); closeEntryDialog(); render();
}
function completeOrReopenProject() {
  const project = selectedProject();
  if (!project) return;
  if (pendingProjectEntries(project).length) return alert(t("pendingBeforeComplete"));
  const completed = project.status === "settled";
  if (!window.confirm(t(completed ? "reopenProjectConfirm" : "completeProjectConfirm"))) return;
  project.status = completed ? "active" : "settled";
  project.updatedAt = nowStamp();
  markFinancialDirty(); saveState(); render();
}
