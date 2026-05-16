const STORAGE_KEY = "monthly-money-manager-v2";
const LAST_BACKUP_KEY = "monthly-money-manager-last-backup";
const DISMISSED_BACKUP_KEY = "monthly-money-manager-backup-dismissed";
const BACKUP_REMINDER_DAYS = 7;
const ENGLISH_NAME_MAP = {
  "收入": "Income",
  "ptcgp收入": "PTCGP Income",
  "储蓄": "Savings",
  "投资基金": "Investment Fund",
  "旅游基金": "Travel Fund",
  "服装基金": "Clothing Fund",
  "娱乐基金": "Entertainment Fund",
  "额外花费": "Extra Spending",
  "伙食": "Groceries",
  "外食": "Dining Out",
  "房租": "Rent",
  "通讯": "Phone",
  "剪头发": "Haircut",
  "健身房": "Gym",
  "妈咪": "Mom",
  "阿嵛": "Ayu"
};
const ENGLISH_NOTE_MAP = {
  "黑色夹克": "Black jacket",
  "香水": "Perfume",
  "护肤品": "Skincare",
  "桑拿": "Sauna",
  "Circle派对": "Circle party",
  "投资": "Investment",
  "已支付": "Paid",
  "订阅": "Subscription",
  "超市": "Supermarket",
  "鸡肉": "Chicken",
  "Circle酒水": "Circle drinks",
  "外食": "Dining out",
  "欠我": "Owes me",
  "Zalando退货": "Zalando return"
};
const ENGLISH_STATUS_MAP = {
  "未还": "Unpaid",
  "已还": "Paid"
};

const initialData = {
  currentMonth: "2026-05",
  months: {
    "2026-05": {
      label: "May 2026",
      incomes: [
        { id: crypto.randomUUID(), name: "Income", amount: 3270.87 },
        { id: crypto.randomUUID(), name: "PTCGP Income", amount: 75 }
      ],
      funds: [
        { id: crypto.randomUUID(), name: "Savings", start: 9277.24, allocation: 600, target: 10000 },
        { id: crypto.randomUUID(), name: "Investment Fund", start: 0, allocation: 300, target: 300 },
        { id: crypto.randomUUID(), name: "Travel Fund", start: 919.42, allocation: 900, target: 2500 },
        { id: crypto.randomUUID(), name: "Clothing Fund", start: 324.78, allocation: 200, target: 800 },
        { id: crypto.randomUUID(), name: "Entertainment Fund", start: 297.64, allocation: 200, target: 800 },
        { id: crypto.randomUUID(), name: "Extra Spending", start: 83.62, allocation: 100, target: 500 },
        { id: crypto.randomUUID(), name: "Groceries", start: 0, allocation: 300, target: 300 },
        { id: crypto.randomUUID(), name: "Dining Out", start: 0, allocation: 100, target: 100 },
        { id: crypto.randomUUID(), name: "Rent", start: 0, allocation: 405, target: 405 },
        { id: crypto.randomUUID(), name: "Phone", start: 0, allocation: 10, target: 10 },
        { id: crypto.randomUUID(), name: "YouTube Music", start: 0, allocation: 13, target: 13 },
        { id: crypto.randomUUID(), name: "Apple Storage", start: 80, allocation: 0, target: 80 },
        { id: crypto.randomUUID(), name: "Haircut", start: 0, allocation: 25, target: 25 },
        { id: crypto.randomUUID(), name: "Gym", start: 0, allocation: 0, target: 0 }
      ],
      expenses: [
        { id: crypto.randomUUID(), date: "2026-05-01", category: "Clothing Fund", note: "Black jacket", amount: 44.99 },
        { id: crypto.randomUUID(), date: "2026-05-02", category: "Clothing Fund", note: "Perfume", amount: 55.41 },
        { id: crypto.randomUUID(), date: "2026-05-03", category: "Clothing Fund", note: "Zalando return", amount: 5.49 },
        { id: crypto.randomUUID(), date: "2026-05-04", category: "Entertainment Fund", note: "Skincare", amount: 37.24 },
        { id: crypto.randomUUID(), date: "2026-05-05", category: "Entertainment Fund", note: "Sauna", amount: 15 },
        { id: crypto.randomUUID(), date: "2026-05-06", category: "Entertainment Fund", note: "Circle party", amount: 31.56 },
        { id: crypto.randomUUID(), date: "2026-05-07", category: "Entertainment Fund", note: "Sauna", amount: 15 },
        { id: crypto.randomUUID(), date: "2026-05-08", category: "Investment Fund", note: "Investment", amount: 300 },
        { id: crypto.randomUUID(), date: "2026-05-08", category: "Rent", note: "Paid", amount: 405 },
        { id: crypto.randomUUID(), date: "2026-05-08", category: "Phone", note: "Paid", amount: 10 },
        { id: crypto.randomUUID(), date: "2026-05-08", category: "Haircut", note: "Paid", amount: 25 },
        { id: crypto.randomUUID(), date: "2026-05-09", category: "Apple Storage", note: "Subscription", amount: 10 },
        { id: crypto.randomUUID(), date: "2026-05-10", category: "Groceries", note: "Supermarket", amount: 12.2 },
        { id: crypto.randomUUID(), date: "2026-05-10", category: "Groceries", note: "Supermarket", amount: 5.9 },
        { id: crypto.randomUUID(), date: "2026-05-11", category: "Groceries", note: "Supermarket", amount: 14.55 },
        { id: crypto.randomUUID(), date: "2026-05-11", category: "Groceries", note: "Supermarket", amount: 10.8 },
        { id: crypto.randomUUID(), date: "2026-05-12", category: "Groceries", note: "Supermarket", amount: 5.9 },
        { id: crypto.randomUUID(), date: "2026-05-12", category: "Groceries", note: "Supermarket", amount: 5.15 },
        { id: crypto.randomUUID(), date: "2026-05-13", category: "Groceries", note: "Supermarket", amount: 19.13 },
        { id: crypto.randomUUID(), date: "2026-05-13", category: "Groceries", note: "Supermarket", amount: 3.5 },
        { id: crypto.randomUUID(), date: "2026-05-14", category: "Groceries", note: "Chicken", amount: 25 },
        { id: crypto.randomUUID(), date: "2026-05-14", category: "Groceries", note: "Supermarket", amount: 5.9 },
        { id: crypto.randomUUID(), date: "2026-05-15", category: "Groceries", note: "Supermarket", amount: 12.3 },
        { id: crypto.randomUUID(), date: "2026-05-15", category: "Groceries", note: "Supermarket", amount: 5.9 },
        { id: crypto.randomUUID(), date: "2026-05-16", category: "Groceries", note: "Supermarket", amount: 1.59 },
        { id: crypto.randomUUID(), date: "2026-05-16", category: "Dining Out", note: "Circle drinks", amount: 14.4 },
        { id: crypto.randomUUID(), date: "2026-05-16", category: "Dining Out", note: "Dining out", amount: 37 },
        { id: crypto.randomUUID(), date: "2026-05-16", category: "Dining Out", note: "Dining out", amount: 11 }
      ],
      debts: [
        { id: crypto.randomUUID(), person: "Mom", note: "Owes me", amount: 454.44, status: "Unpaid" },
        { id: crypto.randomUUID(), person: "Ayu", note: "Goyard bag", amount: 960, status: "Unpaid" }
      ]
    }
  }
};

let state = loadState();
let dialogMode = null;
let editingId = null;
let selectedFundId = null;
let isEditingFundOrder = false;
let detailSwipeStart = null;
let detailExpenseSort = { field: "date", direction: "desc" };
let draggedFundId = null;

const els = {
  monthSelect: document.querySelector("#monthSelect"),
  monthSubtitle: document.querySelector("#monthSubtitle"),
  totalIncome: document.querySelector("#totalIncome"),
  allocatedAmount: document.querySelector("#allocatedAmount"),
  unallocatedAmount: document.querySelector("#unallocatedAmount"),
  allocateIncomeBtn: document.querySelector("#allocateIncomeBtn"),
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
document.querySelector("#quickExpenseBtn").addEventListener("click", () => openDialog("expense"));
els.allocateIncomeBtn.addEventListener("click", () => openDialog("allocation"));
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
els.fundList.addEventListener("pointerdown", startFundDrag);
document.addEventListener("pointermove", moveFundDrag);
document.addEventListener("pointerup", finishFundDrag);
document.addEventListener("pointercancel", finishFundDrag);
els.detailView.addEventListener("touchstart", startDetailSwipe, { passive: true });
els.detailView.addEventListener("touchend", finishDetailSwipe, { passive: true });

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return normalizeStateLanguage(structuredClone(initialData));

  try {
    const parsed = JSON.parse(saved);
    if (!parsed.months || !parsed.currentMonth) return normalizeStateLanguage(structuredClone(initialData));
    return normalizeStateLanguage(parsed);
  } catch {
    return normalizeStateLanguage(structuredClone(initialData));
  }
}

function normalizeStateLanguage(rawState) {
  Object.values(rawState.months || {}).forEach(month => {
    month.incomes?.forEach(income => {
      income.name = translateName(income.name);
    });
    month.funds?.forEach(fund => {
      fund.name = translateName(fund.name);
    });
    month.expenses?.forEach(expense => {
      expense.category = translateName(expense.category);
      expense.note = translateNote(expense.note);
    });
    month.debts?.forEach(debt => {
      debt.person = translateName(debt.person);
      debt.note = translateNote(debt.note);
      debt.status = translateStatus(debt.status);
    });
  });
  return rawState;
}

function translateName(value) {
  return ENGLISH_NAME_MAP[value] || value;
}

function translateNote(value) {
  return ENGLISH_NOTE_MAP[value] || value;
}

function translateStatus(value) {
  return ENGLISH_STATUS_MAP[value] || value;
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
  return Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function sum(items, key = "amount") {
  return items.reduce((total, item) => total + Number(item[key] || 0), 0);
}

function unallocatedFor(month = currentMonth()) {
  return sum(month.incomes) - sum(month.funds, "allocation");
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
    .filter(debt => debt.status !== "Paid")
    .reduce((total, debt) => total + Number(debt.amount || 0), 0);

  els.monthSubtitle.textContent = `${month.label}, ${month.funds.length} fund accounts, ${month.expenses.length} expenses`;
  els.totalIncome.textContent = money(totalIncome);
  els.allocatedAmount.textContent = money(allocated);
  els.unallocatedAmount.textContent = money(unallocatedFor(month));
  els.allocateIncomeBtn.disabled = unallocatedFor(month) <= 0;
  els.spentAmount.textContent = money(spent);
  els.debtAmount.textContent = money(unpaidDebt);

  renderIncome();
  renderFunds();
  renderFundSearchResults();
  renderDebts();
  renderFilter();
  renderExpenses();
  renderDetail();
  renderDetailSortLabels();
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
          <button type="button" data-action="edit-income" data-id="${income.id}">Edit</button>
          <button type="button" class="danger" data-action="delete-income" data-id="${income.id}">Delete</button>
        </div>
      </article>
    `).join("")
    : `<p class="empty">No income yet.</p>`;
}

function renderFunds() {
  const month = currentMonth();
  const query = isEditingFundOrder ? "" : els.fundSearchInput.value.trim().toLowerCase();
  const funds = query
    ? month.funds.filter(fund => fund.name.toLowerCase().includes(query))
    : month.funds;

  els.editFundOrderBtn.textContent = isEditingFundOrder ? "Done" : "Edit";
  els.fundSearchInput.disabled = isEditingFundOrder;
  els.fundSearchResults.hidden = true;
  els.fundList.classList.toggle("is-reordering", isEditingFundOrder);
  els.editFundOrderBtn.closest(".fund-tools").classList.toggle("is-reordering", isEditingFundOrder);

  els.fundList.innerHTML = funds.length
    ? funds.map((fund, index) => {
      const spent = expenseTotalFor(fund.name);
      const balance = balanceFor(fund);
      const available = Number(fund.start || 0) + Number(fund.allocation || 0);
      const progress = available > 0
        ? Math.max(0, Math.min(100, (balance / available) * 100))
        : 0;
      const health = fundHealth(progress);
      return `
        <article class="fund-card health-${health} ${draggedFundId === fund.id ? "is-dragging" : ""}" data-id="${fund.id}" ${isEditingFundOrder ? `aria-label="Drag to reorder ${escapeAttr(fund.name)}"` : `data-action="view-fund"`}>
          <div class="fund-head">
            <span class="name">${escapeHtml(fund.name)}</span>
            <span class="amount">${money(balance)}</span>
          </div>
          <div class="fund-progress" aria-label="${escapeHtml(fund.name)} balance progress ${Math.round(progress)}%">
            <span style="--progress:${progress}%"></span>
            <small>${Math.round(progress)}%</small>
          </div>
          <div class="fund-foot">
            <span>Allocated ${money(fund.allocation)}</span>
            <span>Spent ${money(spent)}</span>
          </div>
        </article>
      `;
    }).join("")
    : `<p class="empty">${month.funds.length ? "No matching fund found." : "No fund accounts yet."}</p>`;
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
    : `<div class="search-empty">No matching fund found</div>`;
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
    .sort(compareDetailExpenses);

  els.detailFundName.textContent = fund.name;
  els.detailBalance.textContent = money(balanceFor(fund));
  els.detailStart.textContent = money(fund.start);
  els.detailAllocation.textContent = money(fund.allocation);
  els.detailSpent.textContent = money(spent);
  els.detailExpenseTable.innerHTML = expenses.length
    ? expenses.map(expense => `
      <tr>
        <td>${escapeHtml(expense.date)}</td>
        <td>${escapeHtml(expense.note || "-")}</td>
        <td class="number">${money(expense.amount)}</td>
        <td class="action-cell">
          <button type="button" data-action="edit-expense" data-id="${expense.id}">Edit</button>
        </td>
      </tr>
    `).join("")
    : `<tr><td colspan="4" class="empty">No expenses in this fund yet.</td></tr>`;
}

function compareDetailExpenses(a, b) {
  const direction = detailExpenseSort.direction === "asc" ? 1 : -1;
  if (detailExpenseSort.field === "amount") {
    const amountDiff = a.amount - b.amount;
    if (amountDiff !== 0) return amountDiff * direction;
    return b.date.localeCompare(a.date);
  }
  const dateDiff = a.date.localeCompare(b.date);
  if (dateDiff !== 0) return dateDiff * direction;
  return 0;
}

function toggleDetailExpenseSort(field) {
  if (detailExpenseSort.field === field) {
    detailExpenseSort.direction = detailExpenseSort.direction === "asc" ? "desc" : "asc";
  } else {
    detailExpenseSort = { field, direction: field === "date" ? "desc" : "asc" };
  }
  renderDetail();
  renderDetailSortLabels();
}

function renderDetailSortLabels() {
  document.querySelectorAll("[data-action='sort-detail-expenses']").forEach(button => {
    const active = button.dataset.field === detailExpenseSort.field;
    button.classList.toggle("active", active);
    button.dataset.direction = active ? detailExpenseSort.direction : "";
    const arrow = active ? (detailExpenseSort.direction === "asc" ? "↑" : "↓") : "";
    button.querySelector(".sort-arrow").textContent = arrow;
  });
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
          <button type="button" data-action="toggle-debt" data-id="${debt.id}">${debt.status === "Paid" ? "Mark Unpaid" : "Mark Paid"}</button>
          <button type="button" data-action="edit-debt" data-id="${debt.id}">Edit</button>
          <button type="button" class="danger" data-action="delete-debt" data-id="${debt.id}">Delete</button>
        </div>
      </article>
    `).join("")
    : `<p class="empty">No money owed yet.</p>`;
}

function renderFilter() {
  const selected = els.expenseFilter.value;
  const options = [`<option value="All">All Categories</option>`]
    .concat(currentMonth().funds.map(fund => `<option value="${escapeAttr(fund.name)}">${escapeHtml(fund.name)}</option>`));
  els.expenseFilter.innerHTML = options.join("");
  els.expenseFilter.value = [...currentMonth().funds.map(fund => fund.name), "All"].includes(selected) ? selected : "All";
}

function renderExpenses() {
  const filter = els.expenseFilter.value;
  const expenses = currentMonth().expenses
    .filter(expense => filter === "All" || expense.category === filter)
    .sort((a, b) => b.date.localeCompare(a.date));

  els.expenseTable.innerHTML = expenses.length
    ? expenses.map(expense => `
      <tr>
        <td>${escapeHtml(expense.date)}</td>
        <td>${escapeHtml(expense.category)}</td>
        <td>${escapeHtml(expense.note || "")}</td>
        <td class="number">${money(expense.amount)}</td>
        <td class="action-cell">
          <button type="button" data-action="edit-expense" data-id="${expense.id}">Edit</button>
        </td>
      </tr>
    `).join("")
    : `<tr><td colspan="5" class="empty">No expense records yet.</td></tr>`;
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
    requestAnimationFrame(scrollPageTop);
  }
  if (action === "select-fund-filter") {
    els.fundSearchInput.value = button.dataset.name;
    els.fundSearchResults.hidden = true;
    renderFunds();
  }
  if (action === "edit-income") openDialog("income", id);
  if (action === "delete-income") removeItem("incomes", id);
  if (action === "edit-fund") openDialog("fund", id);
  if (action === "delete-fund") removeItem("funds", id);
  if (action === "edit-debt") openDialog("debt", id);
  if (action === "delete-debt") removeItem("debts", id);
  if (action === "toggle-debt") toggleDebt(id);
  if (action === "edit-expense") openDialog("expense", id);
  if (action === "sort-detail-expenses") toggleDetailExpenseSort(button.dataset.field);
});

function showDashboard() {
  selectedFundId = null;
  render();
}

function scrollPageTop() {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
}

function startDetailSwipe(event) {
  if (!selectedFundId || event.touches.length !== 1) return;
  const touch = event.touches[0];
  detailSwipeStart = {
    x: touch.clientX,
    y: touch.clientY,
    time: Date.now()
  };
}

function finishDetailSwipe(event) {
  if (!detailSwipeStart || !selectedFundId || event.changedTouches.length !== 1) {
    detailSwipeStart = null;
    return;
  }

  const touch = event.changedTouches[0];
  const deltaX = touch.clientX - detailSwipeStart.x;
  const deltaY = touch.clientY - detailSwipeStart.y;
  const elapsed = Date.now() - detailSwipeStart.time;
  const startedNearLeftEdge = detailSwipeStart.x < 72;
  const isRightSwipe = deltaX > 88;
  const mostlyHorizontal = Math.abs(deltaY) < 64 && deltaX > Math.abs(deltaY) * 1.35;
  const reasonablyQuick = elapsed < 900;

  detailSwipeStart = null;

  if (startedNearLeftEdge && isRightSwipe && mostlyHorizontal && reasonablyQuick) {
    showDashboard();
  }
}

function toggleFundOrderEdit() {
  isEditingFundOrder = !isEditingFundOrder;
  draggedFundId = null;
  if (isEditingFundOrder) {
    els.fundSearchInput.value = "";
    els.fundSearchResults.hidden = true;
  }
  renderFunds();
}

function startFundDrag(event) {
  if (!isEditingFundOrder || event.button !== 0) return;
  const card = event.target.closest(".fund-card[data-id]");
  if (!card) return;
  draggedFundId = card.dataset.id;
  document.body.classList.add("is-fund-dragging");
  event.preventDefault();
  renderFunds();
}

function moveFundDrag(event) {
  if (!draggedFundId) return;
  event.preventDefault();

  const target = document.elementFromPoint(event.clientX, event.clientY)?.closest(".fund-card[data-id]");
  if (!target || target.dataset.id === draggedFundId || !els.fundList.contains(target)) return;

  const funds = currentMonth().funds;
  const fromIndex = funds.findIndex(fund => fund.id === draggedFundId);
  const toIndex = funds.findIndex(fund => fund.id === target.dataset.id);
  if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return;

  const [moved] = funds.splice(fromIndex, 1);
  funds.splice(toIndex, 0, moved);
  renderFunds();
}

function finishFundDrag() {
  if (!draggedFundId) return;
  draggedFundId = null;
  document.body.classList.remove("is-fund-dragging");
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
    expense: month.expenses,
    allocation: month.funds
  }[mode];
  const item = id ? source.find(entry => entry.id === id) : defaults;

  const titles = {
    income: id ? "Edit Income" : "Add Income",
    fund: id ? "Edit Fund" : "Add Fund",
    debt: id ? "Edit Money Owed" : "Add Money Owed",
    expense: id ? "Edit Expense" : "Add Expense",
    allocation: "Allocate Income"
  };
  els.dialogTitle.textContent = titles[mode];
  els.fields.innerHTML = fieldTemplates(mode, item || {});
  els.dialog.showModal();
}

function fieldTemplates(mode, item) {
  if (mode === "income") {
    return `
      ${field("Name", "name", item.name || "", "text")}
      ${field("Amount", "amount", item.amount || "", "number")}
    `;
  }

  if (mode === "fund") {
    return `
      ${field("Name", "name", item.name || "", "text")}
      ${field("Starting Balance", "start", item.start || 0, "number")}
      ${field("Monthly Allocation", "allocation", item.allocation || 0, "number")}
      ${field("Target Amount", "target", item.target || 0, "number")}
    `;
  }

  if (mode === "debt") {
    return `
      ${field("Person", "person", item.person || "", "text")}
      ${field("Amount", "amount", item.amount || "", "number")}
      ${field("Note", "note", item.note || "", "text")}
      <label class="field">Status
        <select name="status">
          <option value="Unpaid" ${item.status !== "Paid" ? "selected" : ""}>Unpaid</option>
          <option value="Paid" ${item.status === "Paid" ? "selected" : ""}>Paid</option>
        </select>
      </label>
    `;
  }

  if (mode === "allocation") {
    const funds = currentMonth().funds
      .map(fund => `<option value="${fund.id}">${escapeHtml(fund.name)}</option>`)
      .join("");
    return `
      <label class="field">Fund
        <select name="fundId">${funds}</select>
      </label>
      ${field("Amount", "amount", Math.max(0, unallocatedFor()).toFixed(2), "number")}
    `;
  }

  const categories = currentMonth().funds
    .map(fund => `<option value="${escapeAttr(fund.name)}" ${item.category === fund.name ? "selected" : ""}>${escapeHtml(fund.name)}</option>`)
    .join("");
  return `
    ${field("Date", "date", item.date || state.currentMonth + "-16", "date")}
    <label class="field">Category
      <select name="category">${categories}</select>
    </label>
    ${field("Note", "note", item.note || "", "text")}
    ${field("Amount", "amount", item.amount || "", "number")}
  `;
}

function field(label, name, value, type) {
  if (type === "number") {
    return `
      <label class="field">${label}
        <input name="${name}" type="text" inputmode="decimal" autocomplete="off" value="${escapeAttr(value)}" data-money-input required>
      </label>
    `;
  }

  return `
    <label class="field">${label}
      <input name="${name}" type="${type}" value="${escapeAttr(value)}" required>
    </label>
  `;
}

function saveEntry(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(els.form).entries());
  const month = currentMonth();

  if (dialogMode === "allocation") {
    allocateIncome(data);
    return;
  }

  const targetMap = {
    income: "incomes",
    fund: "funds",
    debt: "debts",
    expense: "expenses"
  };
  const key = targetMap[dialogMode];
  let payload;
  try {
    payload = normalizePayload(dialogMode, data);
  } catch {
    alert("Please enter a valid amount.");
    return;
  }

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

function allocateIncome(data) {
  const amount = parseMoneyInput(data.amount);
  const fund = currentMonth().funds.find(item => item.id === data.fundId);
  const available = unallocatedFor();

  if (!fund || amount === null || amount <= 0) {
    alert("Enter a valid amount to allocate.");
    return;
  }

  if (amount > available) {
    alert(`You only have ${money(available)} unallocated.`);
    return;
  }

  fund.allocation = Number(fund.allocation || 0) + amount;
  saveState();
  els.dialog.close();
  render();
}

function normalizePayload(mode, data) {
  if (mode === "income") {
    const amount = requireMoney(data.amount);
    return { name: data.name.trim(), amount };
  }
  if (mode === "fund") {
    return {
      name: data.name.trim(),
      start: requireMoney(data.start),
      allocation: requireMoney(data.allocation),
      target: requireMoney(data.target)
    };
  }
  if (mode === "debt") {
    return {
      person: data.person.trim(),
      amount: requireMoney(data.amount),
      note: data.note.trim(),
      status: data.status
    };
  }
  return {
    date: data.date,
    category: data.category,
    note: data.note.trim(),
    amount: requireMoney(data.amount)
  };
}

function requireMoney(value) {
  const parsed = parseMoneyInput(value);
  if (parsed === null) {
    throw new Error("invalid-money");
  }
  return parsed;
}

function parseMoneyInput(value) {
  let input = String(value || "").trim();
  if (!input) return null;

  input = input
    .replace(/\s/g, "")
    .replace(/['’]/g, "");

  if (!/^\d+(?:[.,]\d+)*$/.test(input)) return null;

  const lastDot = input.lastIndexOf(".");
  const lastComma = input.lastIndexOf(",");
  const decimalSeparator = chooseDecimalSeparator(input, lastDot, lastComma);
  let normalized = input;

  if (decimalSeparator) {
    const thousandsSeparator = decimalSeparator === "." ? "," : ".";
    normalized = normalized.replaceAll(thousandsSeparator, "");
    const decimalIndex = normalized.lastIndexOf(decimalSeparator);
    normalized = normalized.slice(0, decimalIndex).replaceAll(decimalSeparator, "") + "." + normalized.slice(decimalIndex + 1);
  } else {
    normalized = normalized.replaceAll(".", "").replaceAll(",", "");
  }

  if (!/^\d+(?:\.\d+)?$/.test(normalized)) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function chooseDecimalSeparator(input, lastDot, lastComma) {
  if (lastDot >= 0 && lastComma >= 0) {
    return lastDot > lastComma ? "." : ",";
  }

  const separator = lastDot >= 0 ? "." : lastComma >= 0 ? "," : "";
  if (!separator) return "";

  const parts = input.split(separator);
  if (parts.length === 2) {
    return parts[1].length === 3 && parts[0].length <= 3 ? "" : separator;
  }

  const finalGroup = parts.at(-1);
  return finalGroup.length <= 2 ? separator : "";
}

function removeItem(key, id) {
  currentMonth()[key] = currentMonth()[key].filter(item => item.id !== id);
  saveState();
  render();
}

function toggleDebt(id) {
  const debt = currentMonth().debts.find(item => item.id === id);
  debt.status = debt.status === "Paid" ? "Unpaid" : "Paid";
  saveState();
  render();
}

function openMonthDialog() {
  const monthId = getNextMonthId(state.currentMonth);
  els.monthPicker.value = monthId;
  els.monthDialogNote.textContent = `Default: add ${formatMonthLabel(monthId)}. Balances will roll over from ${currentMonth().label}.`;
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
      .filter(debt => debt.status !== "Paid")
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
    ? `Last backup was ${daysSince(lastBackup)} days ago. Save a backup file to iCloud Drive for peace of mind.`
    : "No backup yet. Export one and save it to iCloud Drive.";
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
      state = normalizeStateLanguage(imported);
      saveState();
      closeMoreMenu();
      render();
    } catch {
      alert("Import failed. Please choose a JSON file exported by this app.");
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
