const STORAGE_KEY = "monthly-money-manager-v2";
const LAST_BACKUP_KEY = "monthly-money-manager-last-backup";
const DISMISSED_BACKUP_KEY = "monthly-money-manager-backup-dismissed";
const BACKUP_REMINDER_DAYS = 7;

const initialData = {
  currentMonth: "2026-05",
  months: {
    "2026-05": {
      label: "May 2026",
      incomes: [
        { id: crypto.randomUUID(), name: "收入", amount: 3270.87 },
        { id: crypto.randomUUID(), name: "ptcgp收入", amount: 75 }
      ],
      funds: [
        { id: crypto.randomUUID(), name: "储蓄", start: 9277.24, allocation: 600, target: 10000 },
        { id: crypto.randomUUID(), name: "投资基金", start: 0, allocation: 300, target: 300 },
        { id: crypto.randomUUID(), name: "旅游基金", start: 919.42, allocation: 900, target: 2500 },
        { id: crypto.randomUUID(), name: "服装基金", start: 324.78, allocation: 200, target: 800 },
        { id: crypto.randomUUID(), name: "娱乐基金", start: 297.64, allocation: 200, target: 800 },
        { id: crypto.randomUUID(), name: "额外花费", start: 83.62, allocation: 100, target: 500 },
        { id: crypto.randomUUID(), name: "伙食", start: 0, allocation: 300, target: 300 },
        { id: crypto.randomUUID(), name: "外食", start: 0, allocation: 100, target: 100 },
        { id: crypto.randomUUID(), name: "房租", start: 0, allocation: 405, target: 405 },
        { id: crypto.randomUUID(), name: "通讯", start: 0, allocation: 10, target: 10 },
        { id: crypto.randomUUID(), name: "YouTube Music", start: 0, allocation: 13, target: 13 },
        { id: crypto.randomUUID(), name: "Apple Storage", start: 80, allocation: 0, target: 80 },
        { id: crypto.randomUUID(), name: "剪头发", start: 0, allocation: 25, target: 25 },
        { id: crypto.randomUUID(), name: "健身房", start: 0, allocation: 0, target: 0 }
      ],
      expenses: [
        { id: crypto.randomUUID(), date: "2026-05-01", category: "服装基金", note: "黑色夹克", amount: 44.99 },
        { id: crypto.randomUUID(), date: "2026-05-02", category: "服装基金", note: "香水", amount: 55.41 },
        { id: crypto.randomUUID(), date: "2026-05-03", category: "服装基金", note: "Zalando退货", amount: 5.49 },
        { id: crypto.randomUUID(), date: "2026-05-04", category: "娱乐基金", note: "护肤品", amount: 37.24 },
        { id: crypto.randomUUID(), date: "2026-05-05", category: "娱乐基金", note: "桑拿", amount: 15 },
        { id: crypto.randomUUID(), date: "2026-05-06", category: "娱乐基金", note: "Circle派对", amount: 31.56 },
        { id: crypto.randomUUID(), date: "2026-05-07", category: "娱乐基金", note: "桑拿", amount: 15 },
        { id: crypto.randomUUID(), date: "2026-05-08", category: "投资基金", note: "投资", amount: 300 },
        { id: crypto.randomUUID(), date: "2026-05-08", category: "房租", note: "已支付", amount: 405 },
        { id: crypto.randomUUID(), date: "2026-05-08", category: "通讯", note: "已支付", amount: 10 },
        { id: crypto.randomUUID(), date: "2026-05-08", category: "剪头发", note: "已支付", amount: 25 },
        { id: crypto.randomUUID(), date: "2026-05-09", category: "Apple Storage", note: "订阅", amount: 10 },
        { id: crypto.randomUUID(), date: "2026-05-10", category: "伙食", note: "超市", amount: 12.2 },
        { id: crypto.randomUUID(), date: "2026-05-10", category: "伙食", note: "超市", amount: 5.9 },
        { id: crypto.randomUUID(), date: "2026-05-11", category: "伙食", note: "超市", amount: 14.55 },
        { id: crypto.randomUUID(), date: "2026-05-11", category: "伙食", note: "超市", amount: 10.8 },
        { id: crypto.randomUUID(), date: "2026-05-12", category: "伙食", note: "超市", amount: 5.9 },
        { id: crypto.randomUUID(), date: "2026-05-12", category: "伙食", note: "超市", amount: 5.15 },
        { id: crypto.randomUUID(), date: "2026-05-13", category: "伙食", note: "超市", amount: 19.13 },
        { id: crypto.randomUUID(), date: "2026-05-13", category: "伙食", note: "超市", amount: 3.5 },
        { id: crypto.randomUUID(), date: "2026-05-14", category: "伙食", note: "鸡肉", amount: 25 },
        { id: crypto.randomUUID(), date: "2026-05-14", category: "伙食", note: "超市", amount: 5.9 },
        { id: crypto.randomUUID(), date: "2026-05-15", category: "伙食", note: "超市", amount: 12.3 },
        { id: crypto.randomUUID(), date: "2026-05-15", category: "伙食", note: "超市", amount: 5.9 },
        { id: crypto.randomUUID(), date: "2026-05-16", category: "伙食", note: "超市", amount: 1.59 },
        { id: crypto.randomUUID(), date: "2026-05-16", category: "外食", note: "Circle酒水", amount: 14.4 },
        { id: crypto.randomUUID(), date: "2026-05-16", category: "外食", note: "外食", amount: 37 },
        { id: crypto.randomUUID(), date: "2026-05-16", category: "外食", note: "外食", amount: 11 }
      ],
      debts: [
        { id: crypto.randomUUID(), person: "妈咪", note: "欠我", amount: 454.44, status: "未还" },
        { id: crypto.randomUUID(), person: "阿嵛", note: "Goyard bag", amount: 960, status: "未还" }
      ]
    }
  }
};

let state = loadState();
let dialogMode = null;
let editingId = null;
let selectedFundId = null;
let isEditingFundOrder = false;

const els = {
  monthSelect: document.querySelector("#monthSelect"),
  monthSubtitle: document.querySelector("#monthSubtitle"),
  totalIncome: document.querySelector("#totalIncome"),
  allocatedAmount: document.querySelector("#allocatedAmount"),
  unallocatedAmount: document.querySelector("#unallocatedAmount"),
  spentAmount: document.querySelector("#spentAmount"),
  debtAmount: document.querySelector("#debtAmount"),
  backupReminder: document.querySelector("#backupReminder"),
  backupReminderText: document.querySelector("#backupReminderText"),
  backupNowBtn: document.querySelector("#backupNowBtn"),
  dismissBackupBtn: document.querySelector("#dismissBackupBtn"),
  dashboardView: document.querySelector("#dashboardView"),
  detailView: document.querySelector("#detailView"),
  detailFundName: document.querySelector("#detailFundName"),
  detailBalance: document.querySelector("#detailBalance"),
  detailStart: document.querySelector("#detailStart"),
  detailAllocation: document.querySelector("#detailAllocation"),
  detailSpent: document.querySelector("#detailSpent"),
  detailExpenseTable: document.querySelector("#detailExpenseTable"),
  fundSearchInput: document.querySelector("#fundSearchInput"),
  fundSearchResults: document.querySelector("#fundSearchResults"),
  editFundOrderBtn: document.querySelector("#editFundOrderBtn"),
  incomeList: document.querySelector("#incomeList"),
  fundList: document.querySelector("#fundList"),
  debtList: document.querySelector("#debtList"),
  expenseTable: document.querySelector("#expenseTable"),
  expenseFilter: document.querySelector("#expenseFilter"),
  dialog: document.querySelector("#entryDialog"),
  monthDialog: document.querySelector("#monthDialog"),
  monthForm: document.querySelector("#monthForm"),
  monthPicker: document.querySelector("#monthPicker"),
  monthDialogNote: document.querySelector("#monthDialogNote"),
  moreMenuBtn: document.querySelector("#moreMenuBtn"),
  moreMenuPanel: document.querySelector("#moreMenuPanel"),
  dialogTitle: document.querySelector("#dialogTitle"),
  form: document.querySelector("#entryForm"),
  fields: document.querySelector("#formFields")
};

document.querySelector("#newMonthBtn").addEventListener("click", openMonthDialog);
document.querySelector("#addIncomeBtn").addEventListener("click", () => openDialog("income"));
document.querySelector("#addFundBtn").addEventListener("click", () => openDialog("fund"));
els.editFundOrderBtn.addEventListener("click", toggleFundOrderEdit);
document.querySelector("#addDebtBtn").addEventListener("click", () => openDialog("debt"));
document.querySelector("#addExpenseBtn").addEventListener("click", () => openDialog("expense"));
document.querySelector("#backToDashboardBtn").addEventListener("click", showDashboard);
document.querySelector("#detailAddExpenseBtn").addEventListener("click", () => {
  const fund = selectedFund();
  if (fund) openDialog("expense", null, { category: fund.name });
});
document.querySelector("#detailEditFundBtn").addEventListener("click", () => {
  const fund = selectedFund();
  if (fund) openDialog("fund", fund.id);
});
document.querySelector("#exportBtn").addEventListener("click", exportData);
document.querySelector("#importInput").addEventListener("change", importData);
els.backupNowBtn.addEventListener("click", exportData);
els.dismissBackupBtn.addEventListener("click", dismissBackupReminder);
els.moreMenuBtn.addEventListener("click", toggleMoreMenu);
document.querySelector("#cancelDialogBtn").addEventListener("click", () => els.dialog.close());
document.querySelector("#cancelMonthBtn").addEventListener("click", () => closeMonthDialog());
els.monthSelect.addEventListener("change", event => {
  state.currentMonth = event.target.value;
  selectedFundId = null;
  saveState();
  render();
});
els.expenseFilter.addEventListener("change", renderExpenses);
els.fundSearchInput.addEventListener("input", () => {
  renderFunds();
  renderFundSearchResults();
});
els.fundSearchInput.addEventListener("focus", renderFundSearchResults);
els.form.addEventListener("submit", saveEntry);
els.monthForm.addEventListener("submit", createMonth);

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(initialData);

  try {
    const parsed = JSON.parse(saved);
    if (!parsed.months || !parsed.currentMonth) return structuredClone(initialData);
    return parsed;
  } catch {
    return structuredClone(initialData);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function currentMonth() {
  return state.months[state.currentMonth];
}

function selectedFund() {
  return currentMonth().funds.find(fund => fund.id === selectedFundId) || null;
}

function money(value) {
  return Number(value || 0).toLocaleString("zh-CN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function sum(items, key = "amount") {
  return items.reduce((total, item) => total + Number(item[key] || 0), 0);
}

function expenseTotalFor(category) {
  return currentMonth().expenses
    .filter(expense => expense.category === category)
    .reduce((total, expense) => total + Number(expense.amount || 0), 0);
}

function balanceFor(fund) {
  return Number(fund.start || 0) + Number(fund.allocation || 0) - expenseTotalFor(fund.name);
}

function fundHealth(progress) {
  if (progress <= 0) return "empty";
  if (progress < 20) return "danger";
  if (progress < 45) return "warning";
  if (progress < 75) return "okay";
  return "full";
}

function render() {
  const month = currentMonth();
  renderMonthSelect();
  if (selectedFundId && !selectedFund()) selectedFundId = null;

  const totalIncome = sum(month.incomes);
  const allocated = sum(month.funds, "allocation");
  const spent = month.expenses
    .filter(expense => Number(expense.amount) > 0)
    .reduce((total, expense) => total + Number(expense.amount || 0), 0);
  const unpaidDebt = month.debts
    .filter(debt => debt.status !== "已还")
    .reduce((total, debt) => total + Number(debt.amount || 0), 0);

  els.monthSubtitle.textContent = `${month.label}，${month.funds.length} 个基金账户，${month.expenses.length} 条消费`;
  els.totalIncome.textContent = money(totalIncome);
  els.allocatedAmount.textContent = money(allocated);
  els.unallocatedAmount.textContent = money(totalIncome - allocated);
  els.spentAmount.textContent = money(spent);
  els.debtAmount.textContent = money(unpaidDebt);

  renderIncome();
  renderFunds();
  renderFundSearchResults();
  renderDebts();
  renderFilter();
  renderExpenses();
  renderDetail();
  renderBackupReminder();
  els.dashboardView.hidden = Boolean(selectedFundId);
  els.detailView.hidden = !selectedFundId;
}

function renderMonthSelect() {
  const monthKeys = Object.keys(state.months).sort().reverse();
  els.monthSelect.innerHTML = monthKeys
    .map(key => `<option value="${key}" ${key === state.currentMonth ? "selected" : ""}>${state.months[key].label}</option>`)
    .join("");
}

function renderIncome() {
  const month = currentMonth();
  els.incomeList.innerHTML = month.incomes.length
    ? month.incomes.map(income => `
      <article class="entry">
        <div class="row-main">
          <span class="name">${escapeHtml(income.name)}</span>
          <span class="amount">${money(income.amount)}</span>
        </div>
        <div class="mini-actions">
          <button type="button" data-action="edit-income" data-id="${income.id}">编辑</button>
          <button type="button" class="danger" data-action="delete-income" data-id="${income.id}">删除</button>
        </div>
      </article>
    `).join("")
    : `<p class="empty">还没有收入。</p>`;
}

function renderFunds() {
  const month = currentMonth();
  const query = isEditingFundOrder ? "" : els.fundSearchInput.value.trim().toLowerCase();
  const funds = query
    ? month.funds.filter(fund => fund.name.toLowerCase().includes(query))
    : month.funds;

  els.editFundOrderBtn.textContent = isEditingFundOrder ? "完成" : "编辑";
  els.fundSearchInput.disabled = isEditingFundOrder;
  els.fundSearchResults.hidden = true;
  els.fundList.classList.toggle("is-reordering", isEditingFundOrder);
  els.editFundOrderBtn.closest(".fund-tools").classList.toggle("is-reordering", isEditingFundOrder);

  els.fundList.innerHTML = funds.length
    ? funds.map((fund, index) => {
      const spent = expenseTotalFor(fund.name);
      const balance = balanceFor(fund);
      const available = Number(fund.start || 0) + Number(fund.allocation || 0);
      const denominator = Math.max(Number(fund.target || 0), available, balance, 1);
      const progress = Math.max(0, Math.min(100, (balance / denominator) * 100));
      const health = fundHealth(progress);
      const orderControls = isEditingFundOrder
        ? `
          <div class="order-actions" aria-label="调整${escapeAttr(fund.name)}排序">
            <button type="button" data-action="move-fund-up" data-id="${fund.id}" ${index === 0 ? "disabled" : ""}>↑</button>
            <button type="button" data-action="move-fund-down" data-id="${fund.id}" ${index === month.funds.length - 1 ? "disabled" : ""}>↓</button>
          </div>
        `
        : `
          <div class="mini-actions">
            <button type="button" data-action="view-fund" data-id="${fund.id}">查看明细</button>
            <button type="button" data-action="quick-expense" data-id="${fund.id}">记一笔</button>
          </div>
        `;
      return `
        <article class="fund-card health-${health}" ${isEditingFundOrder ? "" : `data-action="view-fund" data-id="${fund.id}"`}>
          <div class="fund-head">
            <span class="name">${escapeHtml(fund.name)}</span>
            <span class="amount">${money(balance)}</span>
          </div>
          <div class="fund-progress" aria-label="${escapeHtml(fund.name)}余额进度 ${Math.round(progress)}%">
            <span style="--progress:${progress}%"></span>
            <small>${Math.round(progress)}%</small>
          </div>
          <div class="fund-foot">
            <span>本月分配 ${money(fund.allocation)}</span>
            <span>已花 ${money(spent)}</span>
          </div>
          ${orderControls}
        </article>
      `;
    }).join("")
    : `<p class="empty">${month.funds.length ? "没有找到这个基金。" : "还没有基金账户。"}</p>`;
}

function renderFundSearchResults() {
  const query = els.fundSearchInput.value.trim().toLowerCase();
  const matches = currentMonth().funds
    .filter(fund => !query || fund.name.toLowerCase().includes(query))
    .slice(0, 8);

  if (!document.activeElement || document.activeElement !== els.fundSearchInput) {
    els.fundSearchResults.hidden = true;
    return;
  }

  els.fundSearchResults.hidden = false;
  els.fundSearchResults.innerHTML = matches.length
    ? matches.map(fund => `
      <button type="button" class="search-result" data-action="select-fund-filter" data-name="${escapeAttr(fund.name)}">
        <span>${escapeHtml(fund.name)}</span>
        <strong>${money(balanceFor(fund))}</strong>
      </button>
    `).join("")
    : `<div class="search-empty">没有找到这个基金</div>`;
}

function renderDetail() {
  const fund = selectedFund();
  if (!fund) {
    els.detailExpenseTable.innerHTML = "";
    return;
  }

  const spent = expenseTotalFor(fund.name);
  const expenses = currentMonth().expenses
    .filter(expense => expense.category === fund.name)
    .sort((a, b) => b.date.localeCompare(a.date));

  els.detailFundName.textContent = fund.name;
  els.detailBalance.textContent = money(balanceFor(fund));
  els.detailStart.textContent = money(fund.start);
  els.detailAllocation.textContent = money(fund.allocation);
  els.detailSpent.textContent = money(spent);
  els.detailExpenseTable.innerHTML = expenses.length
    ? expenses.map(expense => `
      <tr>
        <td>${escapeHtml(expense.date)}</td>
        <td>${escapeHtml(expense.note || "")}</td>
        <td class="number">${money(expense.amount)}</td>
        <td class="action-cell">
          <button type="button" data-action="edit-expense" data-id="${expense.id}">编辑</button>
        </td>
      </tr>
    `).join("")
    : `<tr><td colspan="4" class="empty">这个基金还没有消费。</td></tr>`;
}

function renderDebts() {
  const month = currentMonth();
  els.debtList.innerHTML = month.debts.length
    ? month.debts.map(debt => `
      <article class="entry">
        <div class="row-main">
          <span class="name">${escapeHtml(debt.person)}</span>
          <span class="amount">${money(debt.amount)}</span>
        </div>
        <p class="muted">${escapeHtml(debt.note || "")} · ${escapeHtml(debt.status)}</p>
        <div class="mini-actions">
          <button type="button" data-action="toggle-debt" data-id="${debt.id}">${debt.status === "已还" ? "标为未还" : "标为已还"}</button>
          <button type="button" data-action="edit-debt" data-id="${debt.id}">编辑</button>
          <button type="button" class="danger" data-action="delete-debt" data-id="${debt.id}">删除</button>
        </div>
      </article>
    `).join("")
    : `<p class="empty">还没有欠款记录。</p>`;
}

function renderFilter() {
  const selected = els.expenseFilter.value;
  const options = [`<option value="全部">全部分类</option>`]
    .concat(currentMonth().funds.map(fund => `<option value="${escapeAttr(fund.name)}">${escapeHtml(fund.name)}</option>`));
  els.expenseFilter.innerHTML = options.join("");
  els.expenseFilter.value = [...currentMonth().funds.map(fund => fund.name), "全部"].includes(selected) ? selected : "全部";
}

function renderExpenses() {
  const filter = els.expenseFilter.value;
  const expenses = currentMonth().expenses
    .filter(expense => filter === "全部" || expense.category === filter)
    .sort((a, b) => b.date.localeCompare(a.date));

  els.expenseTable.innerHTML = expenses.length
    ? expenses.map(expense => `
      <tr>
        <td>${escapeHtml(expense.date)}</td>
        <td>${escapeHtml(expense.category)}</td>
        <td>${escapeHtml(expense.note || "")}</td>
        <td class="number">${money(expense.amount)}</td>
        <td class="action-cell">
          <button type="button" data-action="edit-expense" data-id="${expense.id}">编辑</button>
        </td>
      </tr>
    `).join("")
    : `<tr><td colspan="5" class="empty">还没有消费记录。</td></tr>`;
}

document.body.addEventListener("click", event => {
  const button = event.target.closest("[data-action]");
  if (!event.target.closest(".search-field")) {
    els.fundSearchResults.hidden = true;
  }
  if (!event.target.closest(".more-menu")) {
    closeMoreMenu();
  }
  if (!button) return;

  const { action, id } = button.dataset;
  if (action === "view-fund") {
    selectedFundId = id;
    els.fundSearchResults.hidden = true;
    render();
  }
  if (action === "select-fund-filter") {
    els.fundSearchInput.value = button.dataset.name;
    els.fundSearchResults.hidden = true;
    renderFunds();
  }
  if (action === "move-fund-up") moveFund(id, -1);
  if (action === "move-fund-down") moveFund(id, 1);
  if (action === "edit-income") openDialog("income", id);
  if (action === "delete-income") removeItem("incomes", id);
  if (action === "edit-fund") openDialog("fund", id);
  if (action === "delete-fund") removeItem("funds", id);
  if (action === "quick-expense") {
    const fund = currentMonth().funds.find(item => item.id === id);
    openDialog("expense", null, { category: fund?.name || "" });
  }
  if (action === "edit-debt") openDialog("debt", id);
  if (action === "delete-debt") removeItem("debts", id);
  if (action === "toggle-debt") toggleDebt(id);
  if (action === "edit-expense") openDialog("expense", id);
});

function showDashboard() {
  selectedFundId = null;
  render();
}

function toggleFundOrderEdit() {
  isEditingFundOrder = !isEditingFundOrder;
  if (isEditingFundOrder) {
    els.fundSearchInput.value = "";
    els.fundSearchResults.hidden = true;
  }
  renderFunds();
}

function moveFund(id, direction) {
  const funds = currentMonth().funds;
  const index = funds.findIndex(fund => fund.id === id);
  const targetIndex = index + direction;
  if (index < 0 || targetIndex < 0 || targetIndex >= funds.length) return;
  [funds[index], funds[targetIndex]] = [funds[targetIndex], funds[index]];
  saveState();
  renderFunds();
}

function toggleMoreMenu() {
  const willOpen = els.moreMenuPanel.hidden;
  els.moreMenuPanel.hidden = !willOpen;
  els.moreMenuBtn.setAttribute("aria-expanded", String(willOpen));
}

function closeMoreMenu() {
  els.moreMenuPanel.hidden = true;
  els.moreMenuBtn.setAttribute("aria-expanded", "false");
}

function openDialog(mode, id = null, defaults = {}) {
  dialogMode = mode;
  editingId = id;

  const month = currentMonth();
  const source = {
    income: month.incomes,
    fund: month.funds,
    debt: month.debts,
    expense: month.expenses
  }[mode];
  const item = id ? source.find(entry => entry.id === id) : defaults;

  const titles = {
    income: id ? "编辑收入" : "添加收入",
    fund: id ? "编辑基金" : "添加基金",
    debt: id ? "编辑欠款" : "添加欠款",
    expense: id ? "编辑消费" : "添加消费"
  };
  els.dialogTitle.textContent = titles[mode];
  els.fields.innerHTML = fieldTemplates(mode, item || {});
  els.dialog.showModal();
}

function fieldTemplates(mode, item) {
  if (mode === "income") {
    return `
      ${field("名称", "name", item.name || "", "text")}
      ${field("金额", "amount", item.amount || "", "number")}
    `;
  }

  if (mode === "fund") {
    return `
      ${field("名称", "name", item.name || "", "text")}
      ${field("期初余额", "start", item.start || 0, "number")}
      ${field("本月分配", "allocation", item.allocation || 0, "number")}
      ${field("目标金额", "target", item.target || 0, "number")}
    `;
  }

  if (mode === "debt") {
    return `
      ${field("谁欠我", "person", item.person || "", "text")}
      ${field("金额", "amount", item.amount || "", "number")}
      ${field("备注", "note", item.note || "", "text")}
      <label class="field">状态
        <select name="status">
          <option value="未还" ${item.status !== "已还" ? "selected" : ""}>未还</option>
          <option value="已还" ${item.status === "已还" ? "selected" : ""}>已还</option>
        </select>
      </label>
    `;
  }

  const categories = currentMonth().funds
    .map(fund => `<option value="${escapeAttr(fund.name)}" ${item.category === fund.name ? "selected" : ""}>${escapeHtml(fund.name)}</option>`)
    .join("");
  return `
    ${field("日期", "date", item.date || state.currentMonth + "-16", "date")}
    <label class="field">分类
      <select name="category">${categories}</select>
    </label>
    ${field("事项", "note", item.note || "", "text")}
    ${field("金额", "amount", item.amount || "", "number")}
  `;
}

function field(label, name, value, type) {
  const step = type === "number" ? ` step="0.01"` : "";
  return `
    <label class="field">${label}
      <input name="${name}" type="${type}" value="${escapeAttr(value)}"${step} required>
    </label>
  `;
}

function saveEntry(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(els.form).entries());
  const month = currentMonth();
  const targetMap = {
    income: "incomes",
    fund: "funds",
    debt: "debts",
    expense: "expenses"
  };
  const key = targetMap[dialogMode];
  const payload = normalizePayload(dialogMode, data);

  if (editingId) {
    const index = month[key].findIndex(item => item.id === editingId);
    month[key][index] = { ...month[key][index], ...payload };
  } else {
    month[key].push({ id: crypto.randomUUID(), ...payload });
  }

  saveState();
  els.dialog.close();
  render();
}

function normalizePayload(mode, data) {
  if (mode === "income") return { name: data.name.trim(), amount: Number(data.amount) };
  if (mode === "fund") {
    return {
      name: data.name.trim(),
      start: Number(data.start),
      allocation: Number(data.allocation),
      target: Number(data.target)
    };
  }
  if (mode === "debt") {
    return {
      person: data.person.trim(),
      amount: Number(data.amount),
      note: data.note.trim(),
      status: data.status
    };
  }
  return {
    date: data.date,
    category: data.category,
    note: data.note.trim(),
    amount: Number(data.amount)
  };
}

function removeItem(key, id) {
  currentMonth()[key] = currentMonth()[key].filter(item => item.id !== id);
  saveState();
  render();
}

function toggleDebt(id) {
  const debt = currentMonth().debts.find(item => item.id === id);
  debt.status = debt.status === "已还" ? "未还" : "已还";
  saveState();
  render();
}

function openMonthDialog() {
  const monthId = getNextMonthId(state.currentMonth);
  els.monthPicker.value = monthId;
  els.monthDialogNote.textContent = `默认添加 ${formatMonthLabel(monthId)}，会从 ${currentMonth().label} 结转每个基金的余额。`;
  els.monthDialog.hidden = false;
}

function closeMonthDialog() {
  els.monthDialog.hidden = true;
}

function createMonth(event) {
  event.preventDefault();
  const base = currentMonth();
  const monthId = els.monthPicker.value;
  if (!monthId) return;

  if (state.months[monthId]) {
    state.currentMonth = monthId;
    selectedFundId = null;
    saveState();
    closeMonthDialog();
    render();
    return;
  }

  state.months[monthId] = {
    label: formatMonthLabel(monthId),
    incomes: [],
    funds: base.funds.map(fund => ({
      id: crypto.randomUUID(),
      name: fund.name,
      start: balanceFor(fund),
      allocation: 0,
      target: Number(fund.target || 0)
    })),
    expenses: [],
    debts: base.debts
      .filter(debt => debt.status !== "已还")
      .map(debt => ({ ...debt, id: crypto.randomUUID() }))
  };
  state.currentMonth = monthId;
  selectedFundId = null;
  saveState();
  closeMonthDialog();
  render();
}

function getNextMonthId(monthId) {
  const [year, month] = monthId.split("-").map(Number);
  const next = new Date(year, month, 1);
  return `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}`;
}

function formatMonthLabel(monthId) {
  const date = new Date(`${monthId}-01T00:00:00`);
  return date.toLocaleString("en-US", { month: "long", year: "numeric" });
}

function exportData() {
  const backup = {
    ...state,
    backupCreatedAt: new Date().toISOString(),
    app: "Money"
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `money-backup-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
  localStorage.setItem(LAST_BACKUP_KEY, new Date().toISOString());
  localStorage.removeItem(DISMISSED_BACKUP_KEY);
  closeMoreMenu();
  renderBackupReminder();
}

function renderBackupReminder() {
  const lastBackup = localStorage.getItem(LAST_BACKUP_KEY);
  const dismissedAt = localStorage.getItem(DISMISSED_BACKUP_KEY);
  const now = Date.now();
  const reminderMs = BACKUP_REMINDER_DAYS * 24 * 60 * 60 * 1000;
  const dismissedRecently = dismissedAt && now - Date.parse(dismissedAt) < 24 * 60 * 60 * 1000;
  const needsBackup = !lastBackup || now - Date.parse(lastBackup) > reminderMs;

  els.backupReminder.hidden = !needsBackup || dismissedRecently;
  if (!needsBackup || dismissedRecently) return;

  els.backupReminderText.textContent = lastBackup
    ? `上次备份是 ${daysSince(lastBackup)} 天前。把备份文件存到 iCloud Drive 会更安心。`
    : "还没有备份过。建议导出一次，然后存到 iCloud Drive。";
}

function dismissBackupReminder() {
  localStorage.setItem(DISMISSED_BACKUP_KEY, new Date().toISOString());
  renderBackupReminder();
}

function daysSince(dateString) {
  return Math.max(1, Math.floor((Date.now() - Date.parse(dateString)) / (24 * 60 * 60 * 1000)));
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      if (!imported.months || !imported.currentMonth) throw new Error("bad format");
      state = imported;
      saveState();
      closeMoreMenu();
      render();
    } catch {
      alert("导入失败，请选择这个 app 导出的 JSON 文件。");
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("./sw.js").catch(() => {
    // Offline support is optional during local development.
  });
}

render();
registerServiceWorker();
