const STORAGE_KEY = "monthly-money-manager-v2";
const LAST_BACKUP_KEY = "monthly-money-manager-last-backup";
const DISMISSED_BACKUP_KEY = "monthly-money-manager-backup-dismissed";
const BACKUP_REMINDER_DAYS = 7;
const DEFAULT_FUND_SORT = "available-desc";
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
  fundSort: DEFAULT_FUND_SORT,
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
let showingAllocationDetail = false;
let showingExtendedFunds = false;
let detailSwipeStart = null;
let detailExpenseSort = { field: "date", direction: "desc" };
let lockedScrollY = 0;
let monthCalendarYear = Number(state.currentMonth.slice(0, 4));

const els = {
  monthSelect: document.querySelector("#monthSelect"),
  monthSubtitle: document.querySelector("#monthSubtitle"),
  totalIncome: document.querySelector("#totalIncome"),
  allocatedAmount: document.querySelector("#allocatedAmount"),
  unallocatedAmount: document.querySelector("#unallocatedAmount"),
  allocateIncomeBtn: document.querySelector("#allocateIncomeBtn"),
  spentAmount: document.querySelector("#spentAmount"),
  backupReminder: document.querySelector("#backupReminder"),
  backupReminderText: document.querySelector("#backupReminderText"),
  backupNowBtn: document.querySelector("#backupNowBtn"),
  dismissBackupBtn: document.querySelector("#dismissBackupBtn"),
  moneyDashboard: document.querySelector(".money-dashboard"),
  dashboardView: document.querySelector("#dashboardView"),
  incomeStorageCard: document.querySelector("#incomeStorageCard"),
  allocationDetailView: document.querySelector("#allocationDetailView"),
  allocationSummaryText: document.querySelector("#allocationSummaryText"),
  allocationBar: document.querySelector("#allocationBar"),
  allocationLegend: document.querySelector("#allocationLegend"),
  allocationDetailPercent: document.querySelector("#allocationDetailPercent"),
  allocationDetailBar: document.querySelector("#allocationDetailBar"),
  allocationDetailIncome: document.querySelector("#allocationDetailIncome"),
  allocationDetailAllocated: document.querySelector("#allocationDetailAllocated"),
  allocationDetailUnallocated: document.querySelector("#allocationDetailUnallocated"),
  allocationDetailTable: document.querySelector("#allocationDetailTable"),
  recentExpenseList: document.querySelector("#recentExpenseList"),
  toggleFundViewBtn: document.querySelector("#toggleFundViewBtn"),
  detailView: document.querySelector("#detailView"),
  detailFundName: document.querySelector("#detailFundName"),
  detailBalance: document.querySelector("#detailBalance"),
  detailStart: document.querySelector("#detailStart"),
  detailAllocation: document.querySelector("#detailAllocation"),
  detailSpent: document.querySelector("#detailSpent"),
  detailExpenseTable: document.querySelector("#detailExpenseTable"),
  fundSearchInput: document.querySelector("#fundSearchInput"),
  fundSearchResults: document.querySelector("#fundSearchResults"),
  fundSortSelect: document.querySelector("#fundSortSelect"),
  addFundBtn: document.querySelector("#addFundBtn"),
  incomeList: document.querySelector("#incomeList"),
  fundList: document.querySelector("#fundList"),
  expenseTable: document.querySelector("#expenseTable"),
  expenseFilter: document.querySelector("#expenseFilter"),
  dialog: document.querySelector("#entryDialog"),
  monthDialog: document.querySelector("#monthDialog"),
  monthForm: document.querySelector("#monthForm"),
  monthGrid: document.querySelector("#monthGrid"),
  monthCalendarTitle: document.querySelector("#monthCalendarTitle"),
  monthDialogNote: document.querySelector("#monthDialogNote"),
  moreMenuBtn: document.querySelector("#moreMenuBtn"),
  moreMenuPanel: document.querySelector("#moreMenuPanel"),
  dialogTitle: document.querySelector("#dialogTitle"),
  form: document.querySelector("#entryForm"),
  fields: document.querySelector("#formFields")
};

els.monthSelect.addEventListener("click", openMonthDialog);
document.querySelector("#addIncomeBtn").addEventListener("click", () => openDialog("income"));
document.querySelector("#quickIncomeBtn").addEventListener("click", () => openDialog("income"));
document.querySelector("#addFundBtn").addEventListener("click", () => openDialog("fund"));
document.querySelector("#quickExpenseBtn").addEventListener("click", () => openDialog("expense"));
document.querySelector("#viewAllExpensesBtn").addEventListener("click", () => {
  document.querySelector(".all-expenses-panel").hidden = false;
  document.querySelector(".all-expenses-panel").scrollIntoView({ behavior: "smooth", block: "start" });
});
els.toggleFundViewBtn.addEventListener("click", () => {
  showingExtendedFunds = !showingExtendedFunds;
  renderFunds();
});
els.allocateIncomeBtn.addEventListener("click", () => openDialog("allocation"));
document.querySelector("#moveFundsBtn").addEventListener("click", () => openDialog("transfer"));
document.querySelector("#addExpenseBtn").addEventListener("click", () => openDialog("expense"));
document.querySelector("#backToDashboardBtn").addEventListener("click", showDashboard);
document.querySelector("#backToDashboardFromAllocationBtn").addEventListener("click", showDashboard);
document.querySelector("#allocationDetailAddBtn").addEventListener("click", event => {
  event.stopPropagation();
  openDialog("allocation");
});
document.querySelector("#allocationDetailMoveBtn").addEventListener("click", event => {
  event.stopPropagation();
  openDialog("transfer");
});
els.incomeStorageCard.addEventListener("click", showAllocationDetail);
els.incomeStorageCard.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    showAllocationDetail();
  }
});
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
document.querySelector("#cancelDialogBtn").addEventListener("click", closeEntryDialog);
document.querySelector("#cancelMonthBtn").addEventListener("click", () => closeMonthDialog());
document.querySelector("#prevYearBtn").addEventListener("click", () => {
  monthCalendarYear -= 1;
  renderMonthCalendar();
});
document.querySelector("#nextYearBtn").addEventListener("click", () => {
  monthCalendarYear += 1;
  renderMonthCalendar();
});
els.monthCalendarTitle.addEventListener("click", () => {
  monthCalendarYear = Number(formatRealMonthId().slice(0, 4));
  renderMonthCalendar();
});
els.monthGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-month-id]");
  if (!button) return;
  selectCalendarMonth(button.dataset.monthId);
});
els.dialog.addEventListener("close", unlockBackgroundScroll);
els.expenseFilter.addEventListener("change", renderExpenses);
els.fundSortSelect.addEventListener("change", event => {
  state.fundSort = event.target.value;
  saveState();
  renderFunds();
});
els.fundSearchInput.addEventListener("input", () => {
  renderFunds();
  renderFundSearchResults();
});
els.fundSearchInput.addEventListener("focus", renderFundSearchResults);
els.form.addEventListener("submit", saveEntry);
els.form.addEventListener("input", updateAllocationEditor);
els.form.addEventListener("change", updateAllocationEditor);
els.detailView.addEventListener("touchstart", startDetailSwipe, { passive: true });
els.detailView.addEventListener("touchmove", moveDetailSwipe, { passive: false });
els.detailView.addEventListener("touchend", finishDetailSwipe, { passive: true });
els.allocationDetailView.addEventListener("touchstart", startDetailSwipe, { passive: true });
els.allocationDetailView.addEventListener("touchmove", moveDetailSwipe, { passive: false });
els.allocationDetailView.addEventListener("touchend", finishDetailSwipe, { passive: true });

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return normalizeStateLanguage(structuredClone(initialData));

  try {
    const parsed = JSON.parse(saved);
    if (!parsed.months || !parsed.currentMonth) return normalizeStateLanguage(structuredClone(initialData));
    if (!parsed.fundSort) parsed.fundSort = DEFAULT_FUND_SORT;
    return normalizeStateLanguage(parsed);
  } catch {
    return normalizeStateLanguage(structuredClone(initialData));
  }
}

function normalizeStateLanguage(rawState) {
  if (!rawState.fundSort) rawState.fundSort = DEFAULT_FUND_SORT;
  Object.values(rawState.months || {}).forEach(month => {
    month.incomes?.forEach(income => {
      income.name = translateName(income.name);
    });
    month.funds?.forEach(fund => {
      fund.name = translateName(fund.name);
      fund.pinned = Boolean(fund.pinned);
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

function sortedMonthKeys() {
  return Object.keys(state.months).sort();
}

function laterMonthKeys(monthId = state.currentMonth) {
  return sortedMonthKeys().filter(key => key > monthId);
}

function previousMonthKey(monthId) {
  return sortedMonthKeys().filter(key => key < monthId).pop() || null;
}

function hasLaterMonths(monthId = state.currentMonth) {
  return laterMonthKeys(monthId).length > 0;
}

function confirmLaterMonthUpdate() {
  if (!hasLaterMonths()) return true;
  return window.confirm("This change affects later months. Choose OK to update later months, or Cancel to keep everything unchanged.");
}

function cascadeLaterMonthStarts(fromMonthId = state.currentMonth) {
  const keys = sortedMonthKeys();
  let previousKey = fromMonthId;
  keys.filter(key => key > fromMonthId).forEach(key => {
    const previous = state.months[previousKey];
    const month = state.months[key];
    month.funds.forEach(fund => {
      const previousFund = previous.funds.find(item => item.name === fund.name);
      if (previousFund) {
        fund.start = balanceFor(previousFund, previous);
      }
    });
    previousKey = key;
  });
}

function finishBalanceMutation() {
  cascadeLaterMonthStarts();
  saveState();
  els.dialog.close();
  render();
}

function selectedFund() {
  return currentMonth().funds.find(fund => fund.id === selectedFundId) || null;
}

function money(value) {
  const formatted = Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return `€${formatted}`;
}

function formatShortDate(value) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-US", { month: "short", day: "numeric" });
}

function formatRealMonthId() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function sum(items, key = "amount") {
  return items.reduce((total, item) => total + Number(item[key] || 0), 0);
}

function unallocatedFor(month = currentMonth()) {
  return sum(month.incomes) - sum(month.funds, "allocation");
}

function expenseTotalFor(category, month = currentMonth()) {
  return month.expenses
    .filter(expense => expense.category === category)
    .reduce((total, expense) => total + Number(expense.amount || 0), 0);
}

function balanceFor(fund, month = currentMonth()) {
  return Number(fund.start || 0) + Number(fund.allocation || 0) - expenseTotalFor(fund.name, month);
}

function fundHealth(progress) {
  if (progress <= 0) return "empty";
  if (progress < 20) return "danger";
  if (progress < 45) return "warning";
  if (progress < 75) return "okay";
  return "full";
}

function fundUpdatedAt(fund) {
  if (fund.updatedAt) return fund.updatedAt;
  const latestExpense = currentMonth().expenses
    .filter(expense => expense.category === fund.name)
    .map(expense => expense.updatedAt || expense.date || "")
    .sort()
    .pop();
  return latestExpense || "";
}

function sortFundCards(cards) {
  return [...cards].sort(compareFundCards);
}

function compareFundCards(a, b) {
  const sortMode = state.fundSort || DEFAULT_FUND_SORT;
  if (sortMode === "available-asc") {
    return a.balance - b.balance || a.fund.name.localeCompare(b.fund.name);
  }
  if (sortMode === "updated-desc") {
    return b.updatedAt.localeCompare(a.updatedAt) || a.fund.name.localeCompare(b.fund.name);
  }
  if (sortMode === "updated-asc") {
    return a.updatedAt.localeCompare(b.updatedAt) || a.fund.name.localeCompare(b.fund.name);
  }
  return b.balance - a.balance || a.fund.name.localeCompare(b.fund.name);
}

function allocationSegments(limit = 5) {
  const month = currentMonth();
  const totalIncome = sum(month.incomes);
  const unallocated = Math.max(0, unallocatedFor(month));
  const colors = ["#ff3b30", "#ff8a1f", "#f5c400", "#34a853", "#0071e3", "#8e8e93"];
  const allocatedFunds = month.funds
    .filter(fund => Number(fund.allocation || 0) > 0)
    .sort((a, b) => Number(b.allocation || 0) - Number(a.allocation || 0));
  const visibleFunds = allocatedFunds.slice(0, limit);
  const otherFunds = allocatedFunds.slice(limit);
  const segments = visibleFunds.map((fund, index) => ({
    label: fund.name,
    amount: Number(fund.allocation || 0),
    color: colors[index % colors.length]
  }));
  const otherAmount = sum(otherFunds, "allocation");

  if (otherAmount > 0) {
    segments.push({ label: "Other", amount: otherAmount, color: "#a1a1a6" });
  }
  if (unallocated > 0) {
    segments.push({ label: "Unallocated", amount: unallocated, color: "#d1d1d6", muted: true });
  }

  return { totalIncome, allocated: sum(month.funds, "allocation"), unallocated, segments };
}

function render() {
  const month = currentMonth();
  renderMonthSelect();
  if (selectedFundId && !selectedFund()) selectedFundId = null;

  const totalIncome = sum(month.incomes);
  const allocated = sum(month.funds, "allocation");

  els.monthSubtitle.textContent = `${month.label}, ${month.funds.length} fund accounts, ${month.expenses.length} expenses`;
  els.totalIncome.textContent = money(totalIncome);
  els.allocatedAmount.textContent = money(allocated);
  els.unallocatedAmount.textContent = money(unallocatedFor(month));
  els.allocateIncomeBtn.disabled = month.funds.length === 0;

  renderIncome();
  renderIncomeStorage();
  renderAllocationDetail();
  renderRecentExpenses();
  renderFunds();
  renderFundSearchResults();
  renderFilter();
  renderExpenses();
  renderDetail();
  renderDetailSortLabels();
  renderBackupReminder();
  els.moneyDashboard.hidden = Boolean(selectedFundId) || showingAllocationDetail;
  els.dashboardView.hidden = Boolean(selectedFundId) || showingAllocationDetail;
  els.detailView.hidden = !selectedFundId;
  els.allocationDetailView.hidden = !showingAllocationDetail;
}

function renderMonthSelect() {
  els.monthSelect.textContent = currentMonth().label;
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

function renderIncomeStorage() {
  const { totalIncome, allocated, segments } = allocationSegments();
  const percent = totalIncome > 0 ? Math.min(100, Math.max(0, (allocated / totalIncome) * 100)) : 0;

  els.allocationSummaryText.textContent = `${money(allocated)} of ${money(totalIncome)} allocated`;
  els.allocationBar.innerHTML = renderAllocationBarSegments(segments, totalIncome);
  els.allocationLegend.innerHTML = segments.length
    ? segments.slice(0, 6).map(segment => `
      <span class="${segment.muted ? "muted-segment" : ""}">
        <i style="--dot:${segment.color}"></i>
        ${escapeHtml(segment.label)}
      </span>
    `).join("")
    : `<span class="muted-segment">No income yet</span>`;
  els.allocationBar.setAttribute("aria-label", `Income allocation chart, ${Math.round(percent)}% allocated`);
}

function renderAllocationDetail() {
  const month = currentMonth();
  const { totalIncome, allocated, unallocated, segments } = allocationSegments(8);
  const percent = totalIncome > 0 ? Math.min(100, Math.max(0, (allocated / totalIncome) * 100)) : 0;
  const rows = [...month.funds]
    .sort((a, b) => Number(b.allocation || 0) - Number(a.allocation || 0) || a.name.localeCompare(b.name));

  els.allocationDetailPercent.textContent = `${Math.round(percent)}%`;
  els.allocationDetailIncome.textContent = money(totalIncome);
  els.allocationDetailAllocated.textContent = money(allocated);
  els.allocationDetailUnallocated.textContent = money(unallocated);
  els.allocationDetailBar.innerHTML = renderAllocationBarSegments(segments, totalIncome);
  els.allocationDetailTable.innerHTML = rows.length
    ? rows.map(fund => {
      const allocation = Number(fund.allocation || 0);
      const incomeShare = totalIncome > 0 ? (allocation / totalIncome) * 100 : 0;
      return `
        <tr>
          <td data-label="Fund">${escapeHtml(fund.name)}</td>
          <td class="number" data-label="Allocated">${money(allocation)}</td>
          <td class="number" data-label="% Income">${incomeShare.toFixed(1)}%</td>
        </tr>
      `;
    }).join("")
    : `<tr><td colspan="3" class="empty">No funds yet.</td></tr>`;
}

function renderAllocationBarSegments(segments, total) {
  if (total <= 0 || !segments.length) {
    return `<span class="allocation-empty" style="width:100%"></span>`;
  }

  return segments.map(segment => {
    const width = Math.max(0, (segment.amount / total) * 100);
    return `<span title="${escapeAttr(segment.label)} ${money(segment.amount)}" style="--segment:${segment.color}; width:${width}%"></span>`;
  }).join("");
}

function renderRecentExpenses() {
  const expenses = [...currentMonth().expenses]
    .sort((a, b) => {
      const aKey = a.updatedAt || a.date || "";
      const bKey = b.updatedAt || b.date || "";
      return bKey.localeCompare(aKey);
    })
    .slice(0, 5);

  els.recentExpenseList.innerHTML = expenses.length
    ? expenses.map(expense => `
      <div class="recent-expense">
        <span class="recent-date">${formatShortDate(expense.date)}</span>
        <span class="recent-main">
          <strong>${escapeHtml(expense.category)}</strong>
          <small>${escapeHtml(expense.note || "No note")}</small>
        </span>
        <strong class="recent-amount">${money(expense.amount)}</strong>
      </div>
    `).join("")
    : `<p class="empty compact-empty">No recent expenses yet.</p>`;
}

function renderFunds() {
  const month = currentMonth();
  const query = showingExtendedFunds ? els.fundSearchInput.value.trim().toLowerCase() : "";
  const funds = query
    ? month.funds.filter(fund => fund.name.toLowerCase().includes(query))
    : month.funds;
  const fundCards = funds.map(fund => {
    const spent = expenseTotalFor(fund.name);
    const balance = balanceFor(fund);
    const available = Number(fund.start || 0) + Number(fund.allocation || 0);
    const progress = available > 0
      ? Math.max(0, Math.min(100, (balance / available) * 100))
      : 0;
    return {
      fund,
      spent,
      balance,
      progress,
      health: fundHealth(progress),
      updatedAt: fundUpdatedAt(fund),
      isDepleted: balance <= 0
    };
  });
  const pinnedFunds = fundCards.filter(item => item.fund.pinned);
  const availableFunds = sortFundCards(fundCards.filter(item => !item.fund.pinned && !item.isDepleted));
  const depletedFunds = sortFundCards(fundCards.filter(item => !item.fund.pinned && item.isDepleted));
  const previewFunds = [...pinnedFunds, ...availableFunds].slice(0, 5);
  const visiblePinnedFunds = showingExtendedFunds ? pinnedFunds : previewFunds.filter(item => item.fund.pinned);
  const visibleAvailableFunds = showingExtendedFunds
    ? availableFunds
    : previewFunds.filter(item => !item.fund.pinned);

  els.fundSortSelect.value = state.fundSort || DEFAULT_FUND_SORT;
  els.fundSearchResults.hidden = true;
  els.toggleFundViewBtn.textContent = showingExtendedFunds ? "Show Less" : "View All";
  els.addFundBtn.hidden = !showingExtendedFunds;
  document.querySelector(".funds-panel").classList.toggle("is-extended", showingExtendedFunds);

  function renderFundCard({ fund, spent, balance, progress, health, isDepleted }) {
      return `
        <article class="fund-card health-${health} ${isDepleted ? "is-depleted" : ""} ${fund.pinned ? "is-pinned" : ""}" data-id="${fund.id}" data-action="view-fund">
          <div class="fund-head">
            <span class="name">${escapeHtml(fund.name)}</span>
            <button type="button" class="pin-btn" data-action="toggle-fund-pin" data-id="${fund.id}" aria-pressed="${fund.pinned ? "true" : "false"}" aria-label="${fund.pinned ? "Unpin" : "Pin"} ${escapeAttr(fund.name)}">${fund.pinned ? "★" : "☆"}</button>
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
  }

  const pinnedMarkup = visiblePinnedFunds.map(renderFundCard).join("");
  const availableMarkup = visibleAvailableFunds.map(renderFundCard).join("");
  const depletedMarkup = showingExtendedFunds && depletedFunds.length
    ? `
      <div class="fund-group-label">
        <span>Depleted</span>
        <small>${depletedFunds.length}</small>
      </div>
      ${depletedFunds.map(renderFundCard).join("")}
    `
    : "";

  els.fundList.innerHTML = fundCards.length
    ? `${pinnedMarkup}${availableMarkup}${depletedMarkup}`
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
    showingAllocationDetail = false;
    els.fundSearchResults.hidden = true;
    render();
    requestAnimationFrame(scrollPageTop);
  }
  if (action === "view-allocation-detail") {
    showAllocationDetail();
  }
  if (action === "open-allocation") openDialog("allocation");
  if (action === "open-transfer") openDialog("transfer");
  if (action === "apply-quick-allocation") applyQuickAllocationToEditor();
  if (action === "select-fund-filter") {
    els.fundSearchInput.value = button.dataset.name;
    els.fundSearchResults.hidden = true;
    renderFunds();
  }
  if (action === "toggle-fund-pin") toggleFundPin(id);
  if (action === "edit-income") openDialog("income", id);
  if (action === "delete-income") removeItem("incomes", id);
  if (action === "edit-fund") openDialog("fund", id);
  if (action === "delete-fund") removeItem("funds", id);
  if (action === "edit-expense") openDialog("expense", id);
  if (action === "sort-detail-expenses") toggleDetailExpenseSort(button.dataset.field);
});

function toggleFundPin(id) {
  const fund = currentMonth().funds.find(item => item.id === id);
  if (!fund) return;
  fund.pinned = !fund.pinned;
  saveState();
  renderFunds();
}

function showDashboard() {
  resetDetailTransitions();
  selectedFundId = null;
  showingAllocationDetail = false;
  render();
}

function showAllocationDetail() {
  selectedFundId = null;
  showingAllocationDetail = true;
  render();
  requestAnimationFrame(scrollPageTop);
}

function scrollPageTop() {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
}

function startDetailSwipe(event) {
  if ((!selectedFundId && !showingAllocationDetail) || event.touches.length !== 1) return;
  const touch = event.touches[0];
  detailSwipeStart = {
    x: touch.clientX,
    y: touch.clientY,
    time: Date.now(),
    element: event.currentTarget,
    startedNearLeftEdge: touch.clientX < 54,
    lockingHorizontal: false
  };
}

function moveDetailSwipe(event) {
  if (!detailSwipeStart || event.touches.length !== 1 || !detailSwipeStart.startedNearLeftEdge) return;
  const touch = event.touches[0];
  const deltaX = touch.clientX - detailSwipeStart.x;
  const deltaY = touch.clientY - detailSwipeStart.y;
  const mostlyHorizontal = deltaX > 12 && deltaX > Math.abs(deltaY) * 1.15;

  if (mostlyHorizontal) {
    detailSwipeStart.lockingHorizontal = true;
    event.preventDefault();
  }
}

function finishDetailSwipe(event) {
  if (!detailSwipeStart || (!selectedFundId && !showingAllocationDetail) || event.changedTouches.length !== 1) {
    detailSwipeStart = null;
    return;
  }

  const touch = event.changedTouches[0];
  const deltaX = touch.clientX - detailSwipeStart.x;
  const deltaY = touch.clientY - detailSwipeStart.y;
  const elapsed = Date.now() - detailSwipeStart.time;
  const surface = detailSwipeStart.element;
  const startedNearLeftEdge = detailSwipeStart.startedNearLeftEdge;
  const isRightSwipe = deltaX > 46;
  const mostlyHorizontal = Math.abs(deltaY) < 72 && deltaX > Math.abs(deltaY) * 1.1;
  const reasonablyQuick = elapsed < 900;

  detailSwipeStart = null;

  if (startedNearLeftEdge && isRightSwipe && mostlyHorizontal && reasonablyQuick) {
    animateBackToDashboard(surface);
  }
}

function animateBackToDashboard(surface) {
  surface.classList.add("is-leaving");
  window.setTimeout(showDashboard, 170);
}

function resetDetailTransitions() {
  els.detailView.classList.remove("is-leaving");
  els.allocationDetailView.classList.remove("is-leaving");
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

function lockBackgroundScroll() {
  if (document.body.classList.contains("modal-open")) return;
  lockedScrollY = window.scrollY || document.documentElement.scrollTop || 0;
  document.body.style.top = `-${lockedScrollY}px`;
  document.body.classList.add("modal-open");
}

function unlockBackgroundScroll() {
  if (!document.body.classList.contains("modal-open")) return;
  document.body.classList.remove("modal-open");
  document.body.style.top = "";
  window.scrollTo(0, lockedScrollY);
}

function closeEntryDialog() {
  els.dialog.close();
}

function openDialog(mode, id = null, defaults = {}) {
  dialogMode = mode;
  editingId = id;

  const month = currentMonth();
  const source = {
    income: month.incomes,
    fund: month.funds,
    expense: month.expenses,
    allocation: month.funds,
    transfer: month.funds
  }[mode];
  const item = id ? source.find(entry => entry.id === id) : defaults;

  const titles = {
    income: id ? "Edit Income" : "Add Income",
    fund: id ? "Edit Fund" : "Add Fund",
    expense: id ? "Edit Expense" : "Add Expense",
    allocation: "Allocate Income",
    transfer: "Move Between Funds"
  };
  els.dialogTitle.textContent = titles[mode];
  els.dialog.dataset.mode = mode;
  els.fields.innerHTML = fieldTemplates(mode, item || {});
  if (!els.dialog.open) {
    lockBackgroundScroll();
    els.dialog.showModal();
  }
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

  if (mode === "allocation") {
    return renderAllocationEditor();
  }

  if (mode === "transfer") {
    const funds = currentMonth().funds
      .map(fund => `<option value="${fund.id}">${escapeHtml(fund.name)} · ${money(balanceFor(fund))}</option>`)
      .join("");
    return `
      <label class="field">From
        <select name="fromFundId">${funds}</select>
      </label>
      <label class="field">To
        <select name="toFundId">${funds}</select>
      </label>
      ${field("Amount", "amount", "", "number")}
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

function renderAllocationEditor() {
  const totalIncome = sum(currentMonth().incomes);
  const funds = currentMonth().funds;
  return `
    <section class="quick-allocation-card">
      <h3>Quick Add</h3>
      <div class="quick-allocation-grid">
        <label class="field compact">Fund
          <select name="quickFundId">
            ${funds.map(fund => `<option value="${fund.id}">${escapeHtml(fund.name)}</option>`).join("")}
          </select>
        </label>
        <label class="field compact">Amount
          <input name="quickAmount" type="text" inputmode="decimal" autocomplete="off" data-money-input>
        </label>
        <button type="button" data-action="apply-quick-allocation">Add</button>
      </div>
    </section>

    <section class="allocation-editor-summary" data-total-income="${totalIncome}">
      <article>
        <span>Total Income</span>
        <strong>${money(totalIncome)}</strong>
      </article>
      <article>
        <span>Allocated</span>
        <strong id="allocationEditorAllocated">${money(sum(funds, "allocation"))}</strong>
      </article>
      <article>
        <span>Unallocated</span>
        <strong id="allocationEditorUnallocated">${money(unallocatedFor())}</strong>
      </article>
    </section>

    <div class="allocation-editor-table-wrap">
      <table class="allocation-editor-table">
        <thead>
          <tr>
            <th>Fund</th>
            <th>Allocated</th>
            <th>% Income</th>
          </tr>
        </thead>
        <tbody>
          ${funds.map(fund => {
            const allocation = Number(fund.allocation || 0);
            const percent = totalIncome > 0 ? (allocation / totalIncome) * 100 : 0;
            return `
              <tr>
                <td>${escapeHtml(fund.name)}</td>
                <td>
                  <input name="allocation:${fund.id}" data-allocation-input data-fund-id="${fund.id}" value="${escapeAttr(allocation.toFixed(2))}" type="text" inputmode="decimal" autocomplete="off">
                </td>
                <td>
                  <input name="percent:${fund.id}" data-percent-input data-fund-id="${fund.id}" value="${escapeAttr(percent.toFixed(1))}" type="text" inputmode="decimal" autocomplete="off">
                </td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
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
    saveAllocationEditor(data);
    return;
  }

  if (dialogMode === "transfer") {
    transferAllocation(data);
    return;
  }

  const targetMap = {
    income: "incomes",
    fund: "funds",
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

  let affectsLaterMonthStarts = dialogMode === "expense";
  if (dialogMode === "fund" && editingId) {
    const previous = month[key].find(item => item.id === editingId);
    affectsLaterMonthStarts = previous && (
      Number(previous.start || 0) !== Number(payload.start || 0) ||
      Number(previous.allocation || 0) !== Number(payload.allocation || 0)
    );
  }

  if (affectsLaterMonthStarts && !confirmLaterMonthUpdate()) return;

  if (editingId) {
    const index = month[key].findIndex(item => item.id === editingId);
    const previous = month[key][index];
    month[key][index] = { ...month[key][index], ...payload };
    if (dialogMode === "expense") {
      markFundUpdatedByName(previous.category);
      markFundUpdatedByName(payload.category);
      month[key][index].updatedAt = nowStamp();
    }
    if (dialogMode === "fund" && (
      Number(previous.start || 0) !== Number(payload.start || 0) ||
      Number(previous.allocation || 0) !== Number(payload.allocation || 0)
    )) {
      month[key][index].updatedAt = nowStamp();
    }
  } else {
    const created = { id: crypto.randomUUID(), ...payload };
    if (dialogMode === "expense") {
      created.updatedAt = nowStamp();
      markFundUpdatedByName(payload.category);
    }
    if (dialogMode === "fund") {
      created.updatedAt = nowStamp();
    }
    month[key].push(created);
  }

  if (affectsLaterMonthStarts) {
    cascadeLaterMonthStarts();
  }
  saveState();
  els.dialog.close();
  render();
}

function updateAllocationEditor(event) {
  if (dialogMode !== "allocation") return;
  const target = event.target;
  const totalIncome = sum(currentMonth().incomes);

  if (target?.matches("[data-allocation-input]")) {
    const amount = parseMoneyInput(target.value);
    const percentInput = els.form.querySelector(`[data-percent-input][data-fund-id="${target.dataset.fundId}"]`);
    if (amount !== null && percentInput) {
      percentInput.value = totalIncome > 0 ? ((amount / totalIncome) * 100).toFixed(1) : "0.0";
    }
  }

  if (target?.matches("[data-percent-input]")) {
    const percent = parseMoneyInput(target.value);
    const amountInput = els.form.querySelector(`[data-allocation-input][data-fund-id="${target.dataset.fundId}"]`);
    if (percent !== null && amountInput) {
      amountInput.value = totalIncome > 0 ? ((totalIncome * percent) / 100).toFixed(2) : "0.00";
    }
  }

  refreshAllocationEditorSummary();
}

function applyQuickAllocationToEditor() {
  if (dialogMode !== "allocation") return;
  const data = Object.fromEntries(new FormData(els.form).entries());
  const amount = parseMoneyInput(data.quickAmount);
  const input = els.form.querySelector(`[data-allocation-input][data-fund-id="${data.quickFundId}"]`);

  if (!input || amount === null || amount <= 0) {
    alert("Enter a valid quick add amount.");
    return;
  }

  const current = parseMoneyInput(input.value) || 0;
  input.value = (current + amount).toFixed(2);
  updateAllocationEditor({ target: input });
  els.form.elements.quickAmount.value = "";
}

function refreshAllocationEditorSummary() {
  const totalIncome = sum(currentMonth().incomes);
  const allocated = allocationEditorTotal();
  const unallocated = totalIncome - allocated;
  const allocatedEl = els.form.querySelector("#allocationEditorAllocated");
  const unallocatedEl = els.form.querySelector("#allocationEditorUnallocated");

  if (allocatedEl) allocatedEl.textContent = money(allocated);
  if (unallocatedEl) {
    unallocatedEl.textContent = money(unallocated);
    unallocatedEl.classList.toggle("is-negative", unallocated < 0);
  }
}

function allocationEditorTotal() {
  return [...els.form.querySelectorAll("[data-allocation-input]")]
    .reduce((total, input) => total + (parseMoneyInput(input.value) || 0), 0);
}

function saveAllocationEditor() {
  const updates = [];

  for (const fund of currentMonth().funds) {
    const input = els.form.querySelector(`[data-allocation-input][data-fund-id="${fund.id}"]`);
    const amount = parseMoneyInput(input?.value);
    if (amount === null || amount < 0) {
      alert("Please enter valid allocation amounts.");
      return;
    }
    updates.push({ fund, amount });
  }

  const totalIncome = sum(currentMonth().incomes);
  const totalAllocated = updates.reduce((total, item) => total + item.amount, 0);
  if (totalAllocated > totalIncome) {
    alert(`Allocated amount is ${money(totalAllocated - totalIncome)} over your total income.`);
    return;
  }

  const changed = updates.some(item => Number(item.fund.allocation || 0) !== item.amount);
  if (changed && !confirmLaterMonthUpdate()) return;

  updates.forEach(item => {
    if (Number(item.fund.allocation || 0) !== item.amount) {
      item.fund.allocation = item.amount;
      item.fund.updatedAt = nowStamp();
    }
  });
  finishBalanceMutation();
}

function transferAllocation(data) {
  const amount = parseMoneyInput(data.amount);
  const month = currentMonth();
  const fromFund = month.funds.find(item => item.id === data.fromFundId);
  const toFund = month.funds.find(item => item.id === data.toFundId);

  if (!fromFund || !toFund || fromFund.id === toFund.id || amount === null || amount <= 0) {
    alert("Choose two different funds and enter a valid amount.");
    return;
  }

  const fromAvailable = balanceFor(fromFund);
  if (amount > fromAvailable) {
    alert(`You can move up to ${money(fromAvailable)} from ${fromFund.name}.`);
    return;
  }

  if (!confirmLaterMonthUpdate()) return;

  const allocationMove = Math.min(Number(fromFund.allocation || 0), amount);
  const startMove = amount - allocationMove;
  fromFund.allocation = Number(fromFund.allocation || 0) - allocationMove;
  toFund.allocation = Number(toFund.allocation || 0) + allocationMove;
  fromFund.start = Number(fromFund.start || 0) - startMove;
  toFund.start = Number(toFund.start || 0) + startMove;
  fromFund.updatedAt = nowStamp();
  toFund.updatedAt = nowStamp();
  finishBalanceMutation();
}

function markFundUpdatedByName(name) {
  const fund = currentMonth().funds.find(item => item.name === name);
  if (fund) fund.updatedAt = nowStamp();
}

function nowStamp() {
  return new Date().toISOString();
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
  const removed = currentMonth()[key].find(item => item.id === id);
  const affectsLaterMonthStarts = Boolean((key === "expenses" || key === "funds") && removed);
  if (affectsLaterMonthStarts && !confirmLaterMonthUpdate()) return;

  currentMonth()[key] = currentMonth()[key].filter(item => item.id !== id);
  if (key === "expenses" && removed) {
    markFundUpdatedByName(removed.category);
  }
  if (affectsLaterMonthStarts) {
    cascadeLaterMonthStarts();
  }
  saveState();
  render();
}

function openMonthDialog() {
  monthCalendarYear = Number(state.currentMonth.slice(0, 4));
  renderMonthCalendar();
  lockBackgroundScroll();
  els.monthDialog.hidden = false;
}

function closeMonthDialog() {
  els.monthDialog.hidden = true;
  unlockBackgroundScroll();
}

function renderMonthCalendar() {
  const realMonthId = formatRealMonthId();
  const monthNames = Array.from({ length: 12 }, (_, index) =>
    new Date(monthCalendarYear, index, 1).toLocaleString("en-US", { month: "short" })
  );

  els.monthCalendarTitle.textContent = String(monthCalendarYear);
  els.monthDialogNote.textContent = "Grey months have not been created yet. The small line marks the real current month.";
  els.monthGrid.innerHTML = monthNames.map((name, index) => {
    const monthId = `${monthCalendarYear}-${String(index + 1).padStart(2, "0")}`;
    const exists = Boolean(state.months[monthId]);
    const selected = monthId === state.currentMonth;
    const isCurrentRealMonth = monthId === realMonthId;
    return `
      <button type="button" class="month-cell ${exists ? "exists" : "is-empty"} ${selected ? "selected" : ""} ${isCurrentRealMonth ? "is-real-current" : ""}" data-month-id="${monthId}" aria-label="${exists ? "Open" : "Create"} ${formatMonthLabel(monthId)}">
        <span>${name}</span>
      </button>
    `;
  }).join("");
}

function selectCalendarMonth(monthId) {
  if (state.months[monthId]) {
    switchMonth(monthId);
    closeMonthDialog();
    return;
  }

  const previousKey = previousMonthKey(monthId);
  const message = previousKey
    ? `Create ${formatMonthLabel(monthId)}? Starting balances will roll over from ${state.months[previousKey].label}.`
    : `Create ${formatMonthLabel(monthId)}? No previous month exists, so balances will start from 0.`;

  if (!window.confirm(message)) return;
  createMonthRecord(monthId);
  switchMonth(monthId);
  closeMonthDialog();
}

function switchMonth(monthId) {
  state.currentMonth = monthId;
  selectedFundId = null;
  showingAllocationDetail = false;
  showingExtendedFunds = false;
  saveState();
  render();
}

function createMonthRecord(monthId) {
  const baseKey = previousMonthKey(monthId) || state.currentMonth;
  const base = state.months[baseKey];
  const previousKey = previousMonthKey(monthId);
  state.months[monthId] = {
    label: formatMonthLabel(monthId),
    incomes: [],
    funds: base.funds.map(fund => ({
      id: crypto.randomUUID(),
      name: fund.name,
      start: previousKey ? balanceFor(fund, state.months[previousKey]) : 0,
      allocation: 0,
      target: Number(fund.target || 0),
      pinned: Boolean(fund.pinned),
      updatedAt: fund.updatedAt || ""
    })),
    expenses: [],
    debts: []
  };
  cascadeLaterMonthStarts(monthId);
  saveState();
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
