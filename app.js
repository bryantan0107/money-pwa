const STORAGE_KEY = "monthly-money-manager-v2";
const LAST_BACKUP_KEY = "monthly-money-manager-last-backup";
const DISMISSED_BACKUP_KEY = "monthly-money-manager-backup-dismissed";
const BACKUP_REMINDER_DAYS = 7;
const DEFAULT_FUND_SORT = "available-desc";
const MANUAL_FUND_SORT = "manual";
const DEFAULT_LANGUAGE = "en";
const DATA_VERSION = 2;
const CATEGORY_LIFECYCLE_REPAIR_VERSION = 1;
const APP_VERSION = "2026.06.01.3";
const CATEGORY_ROLES = ["fixed", "spending", "savings"];
const BILLING_CYCLES = ["monthly", "yearly", "other"];
const FIXED_ROLE_SEEDS = new Set(["rent", "phone", "youtube music", "apple storage", "gym"]);
const SAVINGS_ROLE_SEEDS = new Set(["savings", "investment fund", "emergency fund"]);
const SUBSCRIPTION_SEEDS = new Set(["youtube music", "apple storage", "phone", "gym"]);
const I18N = {
  en: {
    appSubtitle: (month, funds, expenses) => `${month}, ${funds} categories, ${expenses} expenses`,
    backupTitle: "Backup recommended",
    backupDefault: "Save a backup file to iCloud Drive so you can restore it on another phone.",
    backupNow: "Back Up",
    later: "Later",
    totalIncome: "Total Income",
    allocated: "Allocated",
    unallocated: "Unallocated",
    add: "Add",
    move: "Move",
    allocate: "Allocate",
    incomeStorage: "Income Storage",
    allocationSummary: (allocated, total) => `${allocated} of ${total} allocated`,
    allocationDetailSummary: (allocated, total, percent) => `${allocated} / ${total} allocated (${percent}% allocated)`,
    allocationChartLabel: percent => `Money structure chart, ${percent}% allocated`,
    moneyStructure: "Money Structure",
    fixed: "Fixed",
    spending: "Spending",
    savings: "Savings",
    overview: "Overview",
    structureLine: (amount, percent) => `${amount} · ${percent}%`,
    subscriptionInline: (amount, count) => `Subscriptions ${amount} · ${count}`,
    savedToast: "Saved",
    categoryRole: "Role",
    categorySettings: "Category Settings",
    editCategorySettings: "Edit Category Settings",
    subscription: "Subscription",
    isSubscription: "Subscription",
    billingCycle: "Billing Cycle",
    monthly: "Monthly",
    yearly: "Yearly",
    billingOther: "Other",
    expectedAmount: "Expected Amount",
    dueDay: "Due Day",
    noDueDay: "No due day",
    fixedCostRatio: "Fixed cost ratio",
    savingsRate: "Savings rate",
    leftAfterFixed: "Left after fixed",
    subscriptionMonthlyTotal: "Subscriptions / month",
    subscriptionAnnualCost: "Subscriptions / year",
    subscriptionCount: count => `${count} subscription${count === 1 ? "" : "s"}`,
    fixedMoveReminder: "Fixed categories can still move money out. Check that the monthly commitment stays covered.",
    noIncome: "No income yet",
    other: "Other",
    viewAll: "View All",
    availableBalance: "Available Balance",
    totalAvailable: "Total Available",
    spendable: "Spendable",
    fixedReserved: "Fixed Reserved",
    saved: "Saved",
    reserved: "Reserved",
    allocatedThisMonth: "Allocated this month",
    all: "All",
    spendingFunds: "Spending Funds",
    noSpendingCategories: "No spending categories yet.",
    noFixedCategories: "No fixed categories yet.",
    noSavingsCategories: "No savings categories yet.",
    log: "Add",
    searchFunds: "Search categories",
    sort: "Sort",
    addFund: "Add category",
    mostAvailable: "Most available",
    leastAvailable: "Least available",
    recentlyUpdated: "Recently updated",
    oldestUpdated: "Oldest updated",
    manualOrder: "Manual order",
    records: "Records",
    projects: "Projects",
    project: "Project",
    addProject: "Add Project",
    editProject: "Edit Project",
    addProjectEntry: "Add",
    editProjectEntry: "Edit Project Entry",
    projectType: "Type",
    defaultFund: "Default Category",
    startDate: "Start Date",
    endDate: "End Date",
    active: "Active",
    settled: "Settled",
    status: "Status",
    totalSpent: "Total Spent",
    fundBreakdown: "Category Breakdown",
    entries: "Entries",
    settle: "Settle",
    reopen: "Reopen",
    activeProjects: "Active",
    settledProjects: "Settled",
    started: "Started",
    noProjects: "No projects yet.",
    noProjectEntries: "No entries yet.",
    projectSettledNote: "This project has been settled into official expense records.",
    settleProjectConfirm: (name, count) => `Settle ${name}? This will create ${count} official expense record${count === 1 ? "" : "s"} grouped by category.`,
    reopenProjectConfirm: name => `Reopen ${name}? This will delete the official expense records created by settlement and restore the project to active.`,
    settledProjectDeleteDisabled: "Reopen this project before deleting it.",
    travel: "Travel",
    event: "Event",
    shopping: "Shopping",
    moving: "Moving",
    searchRecords: "Search records",
    allRecords: "All Records",
    type: "Type",
    expenseFunds: "Expense Categories",
    income: "Income",
    expenses: "Expenses",
    expense: "Expense",
    allocation: "Allocation",
    moveIn: "Move In",
    moveOut: "Move Out",
    projectSettlement: "Project Settlement",
    startingBalanceRecord: "Starting Balance",
    settings: "Settings",
    backup: "Backup",
    backupText: "Save a JSON backup file to iCloud Drive.",
    backupStatus: "Backup Status",
    backupStatusClean: "All financial changes are backed up.",
    backupStatusDirty: "Financial changes need a new backup.",
    lastBackup: "Last backup",
    neverBackedUp: "Never backed up",
    restore: "Restore",
    restoreText: "Import a backup file from this app.",
    currency: "Currency",
    currencyText: "Euro is the current currency.",
    language: "Language",
    languageText: "Choose the app display language.",
    updates: "Updates",
    updatesText: "Check whether a newer app version is available.",
    checkUpdates: "Check for updates",
    checkingUpdates: "Checking for updates…",
    upToDate: "You’re up to date.",
    updateAvailable: "New version available",
    updateNow: "Update now",
    appVersion: "App version",
    appVersionText: "Current installed version.",
    hideAmounts: "Hide amounts",
    showAmounts: "Show amounts",
    home: "Home",
    balanceDetail: "Balance Detail",
    incomeAllocationDetail: "Income Allocation Detail",
    fundAllocation: "Category Allocation",
    available: "Available",
    startingBalance: "Starting Balance",
    monthlyAllocation: "Monthly Allocation",
    spentInFund: "Spent in This Fund",
    editFund: "Edit Category",
    logExpense: "Add",
    date: "Date",
    category: "Category",
    note: "Note",
    amount: "Amount",
    fund: "Category",
    percentIncome: "% Income",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    name: "Name",
    targetAmount: "Target Amount",
    from: "From",
    to: "To",
    before: "Before",
    after: "After",
    unallocatedAfter: "Unallocated after",
    quickAdd: "Quick Add",
    filter: "Filter",
    noFunds: "No categories yet.",
    noMatchingRecords: "No matching records.",
    noExpensesInFund: "No records in this category yet.",
    noMatchingFund: "No matching category found.",
    noFundAccounts: "No categories yet.",
    depleted: "Depleted",
    spent: "Spent",
    pin: "Pin",
    unpin: "Unpin",
    editRecord: (category, amount) => `Edit ${category} record ${amount}`,
    addIncome: "Add Income",
    editIncome: "Edit Income",
    addFundDialog: "Add Category",
    editFundDialog: "Edit Category",
    addExpense: "Add Expense",
    editExpense: "Edit Expense",
    deleteExpense: "Delete",
    deleteExpenseConfirm: "Delete this expense? Balances will update immediately.",
    deleteSettledProjectExpenseConfirm: "This expense was created by a project settlement. Delete it anyway? It will be removed from that settlement link.",
    allocateIncome: "Allocate Income",
    deleteCategoryConfirm: name => `Delete ${name} from this month onward? The category card will be removed from this month and later months, but historical records before this month will stay unchanged.`,
    deleteCategoryWithActivityConfirm: name => `Delete ${name} from this month onward? This category has current or future activity. The category card will be removed from this month and later months, but historical Records and earlier months will not be cleared.`,
    deleteProject: "Delete",
    deleteProjectConfirm: name => `Delete ${name}? This removes the project and its entries.`,
    deleteSettledProjectConfirm: name => `Delete ${name}? This also removes the expense records created when this project was settled.`,
    moveFunds: "Move Between Categories",
    allocationChanged: "Allocation changed",
    toCategoryNote: category => `To ${category}`,
    fromCategoryNote: category => `From ${category}`,
    greyMonths: "Grey months have not been created yet. The small line marks the real current month.",
    openMonthCalendar: "Open month calendar",
    previousYear: "Previous year",
    nextYear: "Next year",
    createMonth: (month, previous) => previous
      ? `Create ${month}? Starting balances will roll over from ${previous}.`
      : `Create ${month}? No previous month exists, so balances will start from 0.`,
    laterMonthChange: "This change affects later months. Choose OK to update later months, or Cancel to keep everything unchanged.",
    laterMonthsUpdated: "Later months updated",
    overAllocated: amount => `Allocated amount is ${amount} over your total income.`,
    moveLimit: (amount, fund) => `You can move up to ${amount} from ${fund}.`,
    backupRecent: days => `Last backup was ${days} days ago. Save a backup file to iCloud Drive for peace of mind.`,
    backupNever: "No backup yet. Export one and save it to iCloud Drive.",
    validAmount: "Please enter a valid amount.",
    validQuickAllocate: "Enter an amount within your unallocated income.",
    validQuickAdd: "Enter a valid quick add amount.",
    validAllocations: "Please enter valid allocation amounts.",
    validTransfer: "Choose two different categories and enter a valid amount.",
    validDueDay: "Due day must be 1-31 or empty.",
    importFailed: "Import failed. Please choose a JSON file exported by this app."
  },
  zh: {
    appSubtitle: (month, funds, expenses) => `${month}，${funds} 个分类，${expenses} 条消费`,
    backupTitle: "建议备份一次",
    backupDefault: "导出备份文件并保存到 iCloud Drive，之后可在另一台手机恢复。",
    backupNow: "备份",
    later: "稍后",
    totalIncome: "总收入",
    allocated: "已分配",
    unallocated: "未分配",
    add: "添加",
    move: "移动",
    allocate: "分配",
    incomeStorage: "收入分配",
    allocationSummary: (allocated, total) => `${allocated} / ${total} 已分配`,
    allocationDetailSummary: (allocated, total, percent) => `${allocated} / ${total} 已分配（已分配 ${percent}%）`,
    allocationChartLabel: percent => `资金结构图，已分配 ${percent}%`,
    moneyStructure: "资金结构",
    fixed: "固定",
    spending: "消费",
    savings: "储蓄投资",
    overview: "总览",
    structureLine: (amount, percent) => `${amount} · ${percent}%`,
    subscriptionInline: (amount, count) => `其中订阅 ${amount} · ${count} 个`,
    savedToast: "已保存",
    categoryRole: "角色",
    categorySettings: "分类设置",
    editCategorySettings: "编辑分类设置",
    subscription: "订阅",
    isSubscription: "订阅",
    billingCycle: "扣款周期",
    monthly: "每月",
    yearly: "每年",
    billingOther: "其他",
    expectedAmount: "预计金额",
    dueDay: "扣款日",
    noDueDay: "无扣款日",
    fixedCostRatio: "固定开销占比",
    savingsRate: "储蓄率",
    leftAfterFixed: "扣除固定后剩余",
    subscriptionMonthlyTotal: "每月订阅",
    subscriptionAnnualCost: "年度订阅",
    subscriptionCount: count => `${count} 个订阅`,
    fixedMoveReminder: "固定分类仍然可以移出金额。记得确认固定开销仍然够用。",
    noIncome: "还没有收入",
    other: "其他",
    viewAll: "查看全部",
    availableBalance: "可用余额",
    totalAvailable: "总可用",
    spendable: "可消费",
    fixedReserved: "固定预留",
    saved: "已储蓄",
    reserved: "预留",
    allocatedThisMonth: "本月分配",
    all: "全部",
    spendingFunds: "消费资金",
    noSpendingCategories: "还没有消费分类。",
    noFixedCategories: "还没有固定分类。",
    noSavingsCategories: "还没有储蓄分类。",
    log: "添加",
    searchFunds: "搜索分类",
    sort: "排序",
    addFund: "添加分类",
    mostAvailable: "可用最多",
    leastAvailable: "可用最少",
    recentlyUpdated: "最近更新",
    oldestUpdated: "最早更新",
    manualOrder: "手动排序",
    records: "记录",
    projects: "项目",
    project: "项目",
    addProject: "添加项目",
    editProject: "编辑项目",
    addProjectEntry: "添加",
    editProjectEntry: "编辑项目明细",
    projectType: "类型",
    defaultFund: "默认分类",
    startDate: "开始日期",
    endDate: "结束日期",
    active: "进行中",
    settled: "已结算",
    status: "状态",
    totalSpent: "总花费",
    fundBreakdown: "分类分布",
    entries: "明细",
    settle: "结算",
    reopen: "重新打开",
    activeProjects: "进行中",
    settledProjects: "已结算",
    started: "开始",
    noProjects: "还没有项目。",
    noProjectEntries: "还没有项目明细。",
    projectSettledNote: "这个项目已经结算为正式支出记录。",
    settleProjectConfirm: (name, count) => `结算 ${name}？会按分类生成 ${count} 条正式支出记录。`,
    reopenProjectConfirm: name => `重新打开 ${name}？这会删除结算时生成的正式支出记录，并把项目恢复为进行中。`,
    settledProjectDeleteDisabled: "请先重新打开这个项目，再删除。",
    travel: "旅行",
    event: "活动",
    shopping: "购物",
    moving: "搬家",
    searchRecords: "搜索记录",
    allRecords: "全部记录",
    type: "类型",
    expenseFunds: "支出分类",
    income: "收入",
    expenses: "支出",
    expense: "支出",
    allocation: "分配",
    moveIn: "转入",
    moveOut: "转出",
    projectSettlement: "项目结算",
    startingBalanceRecord: "起始余额",
    settings: "设置",
    backup: "备份",
    backupText: "导出 JSON 备份文件到 iCloud Drive。",
    backupStatus: "备份状态",
    backupStatusClean: "财务修改已经备份。",
    backupStatusDirty: "有财务修改需要重新备份。",
    lastBackup: "最近备份",
    neverBackedUp: "还没有备份",
    restore: "恢复",
    restoreText: "从这个 app 导入备份文件。",
    currency: "货币",
    currencyText: "当前货币是欧元。",
    language: "语言",
    languageText: "选择 app 显示语言。",
    updates: "更新",
    updatesText: "检查是否有新版 app 可用。",
    checkUpdates: "检查更新",
    checkingUpdates: "正在检查更新…",
    upToDate: "已经是最新版本。",
    updateAvailable: "有新版本可用",
    updateNow: "立即更新",
    appVersion: "应用版本",
    appVersionText: "当前安装版本。",
    hideAmounts: "隐藏金额",
    showAmounts: "显示金额",
    home: "首页",
    balanceDetail: "余额明细",
    incomeAllocationDetail: "收入分配明细",
    fundAllocation: "分类分配",
    available: "可用",
    startingBalance: "起始余额",
    monthlyAllocation: "本月分配",
    spentInFund: "本分类已花",
    editFund: "编辑分类",
    logExpense: "添加",
    date: "日期",
    category: "分类",
    note: "备注",
    amount: "金额",
    fund: "分类",
    percentIncome: "% 收入",
    cancel: "取消",
    save: "保存",
    delete: "删除",
    edit: "编辑",
    name: "名称",
    targetAmount: "目标金额",
    from: "从",
    to: "到",
    before: "分配前",
    after: "分配后",
    unallocatedAfter: "分配后未分配",
    quickAdd: "快速添加",
    filter: "筛选",
    noFunds: "还没有分类。",
    noMatchingRecords: "没有匹配记录。",
    noExpensesInFund: "这个分类还没有记录。",
    noMatchingFund: "没有匹配分类。",
    noFundAccounts: "还没有分类。",
    depleted: "已用完",
    spent: "已花",
    pin: "置顶",
    unpin: "取消置顶",
    editRecord: (category, amount) => `编辑 ${category} 记录 ${amount}`,
    addIncome: "添加收入",
    editIncome: "编辑收入",
    addFundDialog: "添加分类",
    editFundDialog: "编辑分类",
    addExpense: "添加支出",
    editExpense: "编辑支出",
    deleteExpense: "删除",
    deleteExpenseConfirm: "删除这笔支出？余额会立即更新。",
    deleteSettledProjectExpenseConfirm: "这笔支出来自项目结算。仍然删除吗？它会从该项目结算记录中移除。",
    allocateIncome: "分配收入",
    deleteCategoryConfirm: name => `从本月开始删除 ${name}？这个分类卡片会从本月和后续月份移除，但本月之前的历史记录会保留。`,
    deleteCategoryWithActivityConfirm: name => `从本月开始删除 ${name}？这个分类在当前或后续月份有记录。分类卡片会从本月和后续月份移除，但历史记录和之前月份不会被清空。`,
    deleteProject: "删除",
    deleteProjectConfirm: name => `删除 ${name}？这会删除项目和里面的明细。`,
    deleteSettledProjectConfirm: name => `删除 ${name}？这也会删除项目结算时生成的正式支出记录。`,
    moveFunds: "分类间移动",
    allocationChanged: "分配调整",
    toCategoryNote: category => `到 ${category}`,
    fromCategoryNote: category => `从 ${category}`,
    greyMonths: "灰色月份还没有创建。细线标记现实中的当前月份。",
    openMonthCalendar: "打开月份日历",
    previousYear: "上一年",
    nextYear: "下一年",
    createMonth: (month, previous) => previous
      ? `创建 ${month}？起始余额会从 ${previous} 延续。`
      : `创建 ${month}？没有上一个月份，所以余额会从 0 开始。`,
    laterMonthChange: "这个修改会影响后续月份。点确认会更新后续月份，点取消则不修改。",
    laterMonthsUpdated: "已更新后续月份",
    overAllocated: amount => `分配金额超过总收入 ${amount}。`,
    moveLimit: (amount, fund) => `最多可以从 ${fund} 移动 ${amount}。`,
    backupRecent: days => `上次备份是 ${days} 天前。建议导出备份并保存到 iCloud Drive。`,
    backupNever: "还没有备份。建议导出一次并保存到 iCloud Drive。",
    validAmount: "请输入有效金额。",
    validQuickAllocate: "请输入不超过未分配收入的金额。",
    validQuickAdd: "请输入有效的快速添加金额。",
    validAllocations: "请输入有效的分配金额。",
    validTransfer: "请选择两个不同的分类并输入有效金额。",
    validDueDay: "扣款日必须是 1-31，或留空。",
    importFailed: "导入失败。请选择这个 app 导出的 JSON 备份文件。"
  }
};
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

function normalizedCategoryName(name) {
  return String(name || "").trim().toLowerCase();
}

function roleSeedFor(name) {
  const key = normalizedCategoryName(name);
  if (FIXED_ROLE_SEEDS.has(key)) return "fixed";
  if (SAVINGS_ROLE_SEEDS.has(key)) return "savings";
  return "spending";
}

function isSeededSubscription(name) {
  return SUBSCRIPTION_SEEDS.has(normalizedCategoryName(name));
}

function normalizeCategoryRole(role) {
  return CATEGORY_ROLES.includes(role) ? role : "spending";
}

function normalizeBillingCycle(cycle) {
  return BILLING_CYCLES.includes(cycle) ? cycle : "monthly";
}

function seedExpectedAmount(fund) {
  const allocation = Number(fund.allocation || 0);
  const target = Number(fund.target || 0);
  if (allocation > 0) return allocation;
  if (target > 0) return target;
  return 0;
}

function normalizeCategoryMetadata(fund) {
  const shouldSeedRole = !fund.role;
  fund.role = shouldSeedRole ? roleSeedFor(fund.name) : normalizeCategoryRole(fund.role);
  const shouldSeedSubscription = fund.isSubscription === undefined && isSeededSubscription(fund.name);
  fund.isSubscription = shouldSeedSubscription ? true : Boolean(fund.isSubscription);
  fund.billingCycle = normalizeBillingCycle(fund.billingCycle);
  const expectedAmount = Number(fund.expectedAmount);
  fund.expectedAmount = Number.isFinite(expectedAmount) ? Math.max(0, expectedAmount) : 0;
  if (shouldSeedSubscription && fund.expectedAmount === 0) {
    fund.expectedAmount = seedExpectedAmount(fund);
  }
  const dueDay = fund.dueDay === null || fund.dueDay === "" || fund.dueDay === undefined ? null : Number(fund.dueDay);
  fund.dueDay = Number.isInteger(dueDay) && dueDay >= 1 && dueDay <= 31 ? dueDay : null;
}

const initialData = {
  currentMonth: "2026-05",
  dataVersion: DATA_VERSION,
  categoryLifecycleRepairVersion: CATEGORY_LIFECYCLE_REPAIR_VERSION,
  languageNormalized: true,
  language: DEFAULT_LANGUAGE,
  privacyMode: false,
  fundSort: DEFAULT_FUND_SORT,
  fundOrder: [],
  backupDirty: false,
  lastBackupAt: null,
  projects: [],
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
      categoryEvents: [],
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
let selectedProjectId = null;
let showingAllocationDetail = false;
let activeTab = "home";
let detailReturnTab = "home";
const tabScrollPositions = { home: 0, records: 0, projects: 0, settings: 0 };
let recordFilterValue = "All";
let detailSwipeStart = null;
let detailExpenseSort = { field: "date", direction: "desc" };
let lockedScrollY = 0;
let monthCalendarYear = Number(state.currentMonth.slice(0, 4));
let toastTimer = null;
let updateRegistration = null;
let refreshingForUpdate = false;
let draggedFundName = null;
let touchFundDrag = null;
let suppressFundClick = false;
let availableRoleFilter = "spending";
let allocationRowEdit = null;

const els = {
  monthSelect: document.querySelector("#monthSelect"),
  privacyToggleBtn: document.querySelector("#privacyToggleBtn"),
  backupReminder: document.querySelector("#backupReminder"),
  updateBanner: document.querySelector("#updateBanner"),
  updateBannerTitle: document.querySelector("#updateBannerTitle"),
  updateNowBtn: document.querySelector("#updateNowBtn"),
  backupReminderText: document.querySelector("#backupReminderText"),
  backupNowBtn: document.querySelector("#backupNowBtn"),
  dismissBackupBtn: document.querySelector("#dismissBackupBtn"),
  dashboardView: document.querySelector("#dashboardView"),
  recordsView: document.querySelector("#recordsView"),
  projectsView: document.querySelector("#projectsView"),
  settingsView: document.querySelector("#settingsView"),
  bottomNav: document.querySelector("#bottomNav"),
  incomeStorageCard: document.querySelector("#incomeStorageCard"),
  allocationDetailView: document.querySelector("#allocationDetailView"),
  allocationSummaryText: document.querySelector("#allocationSummaryText"),
  storageTotalIncome: document.querySelector("#storageTotalIncome"),
  storageAllocatedAmount: document.querySelector("#storageAllocatedAmount"),
  storageUnallocatedAmount: document.querySelector("#storageUnallocatedAmount"),
  allocationDetailAddIncomeBtn: document.querySelector("#allocationDetailAddIncomeBtn"),
  allocationDetailIncome: document.querySelector("#allocationDetailIncome"),
  allocationDetailAllocated: document.querySelector("#allocationDetailAllocated"),
  allocationDetailUnallocated: document.querySelector("#allocationDetailUnallocated"),
  allocationInsights: document.querySelector("#allocationInsights"),
  allocationDetailQuickAllocateBtn: document.querySelector("#allocationDetailQuickAllocateBtn"),
  allocationDetailTable: document.querySelector("#allocationDetailTable"),
  detailView: document.querySelector("#detailView"),
  detailFundName: document.querySelector("#detailFundName"),
  detailBalance: document.querySelector("#detailBalance"),
  detailStart: document.querySelector("#detailStart"),
  detailAllocation: document.querySelector("#detailAllocation"),
  detailSpent: document.querySelector("#detailSpent"),
  detailRoleBtn: document.querySelector("#detailRoleBtn"),
  detailRoleLabel: document.querySelector("#detailRoleLabel"),
  detailRoleValue: document.querySelector("#detailRoleValue"),
  detailSubscriptionMeta: document.querySelector("#detailSubscriptionMeta"),
  detailExpenseTable: document.querySelector("#detailExpenseTable"),
  detailMoveBtn: document.querySelector("#detailMoveBtn"),
  fundSearchInput: document.querySelector("#fundSearchInput"),
  fundSearchResults: document.querySelector("#fundSearchResults"),
  availableSummarySpendable: document.querySelector("#availableSummarySpendable"),
  availableSummaryFixed: document.querySelector("#availableSummaryFixed"),
  availableSummarySavings: document.querySelector("#availableSummarySavings"),
  availableSubscriptionNote: document.querySelector("#availableSubscriptionNote"),
  fundRoleFilter: document.querySelector("#fundRoleFilter"),
  fundSortSelect: document.querySelector("#fundSortSelect"),
  addFundBtn: document.querySelector("#addFundBtn"),
  quickMoveBtn: document.querySelector("#quickMoveBtn"),
  fundList: document.querySelector("#fundList"),
  recordTable: document.querySelector("#recordTable"),
  recordSearchInput: document.querySelector("#recordSearchInput"),
  recordFilterBtn: document.querySelector("#recordFilterBtn"),
  recordFilterPanel: document.querySelector("#recordFilterPanel"),
  addRecordBtn: document.querySelector("#addRecordBtn"),
  addRecordMenu: document.querySelector("#addRecordMenu"),
  addRecordIncomeBtn: document.querySelector("#addRecordIncomeBtn"),
  addRecordExpenseBtn: document.querySelector("#addRecordExpenseBtn"),
  addProjectBtn: document.querySelector("#addProjectBtn"),
  projectsList: document.querySelector("#projectsList"),
  projectDetailView: document.querySelector("#projectDetailView"),
  projectDetailName: document.querySelector("#projectDetailName"),
  projectDetailStatus: document.querySelector("#projectDetailStatus"),
  projectDetailTotal: document.querySelector("#projectDetailTotal"),
  projectDetailDefaultFund: document.querySelector("#projectDetailDefaultFund"),
  projectDetailDates: document.querySelector("#projectDetailDates"),
  projectDetailMetaBtn: document.querySelector("#projectDetailMetaBtn"),
  projectBreakdownBar: document.querySelector("#projectBreakdownBar"),
  projectBreakdownList: document.querySelector("#projectBreakdownList"),
  projectEntriesList: document.querySelector("#projectEntriesList"),
  addProjectEntryBtn: document.querySelector("#addProjectEntryBtn"),
  deleteProjectBtn: document.querySelector("#deleteProjectBtn"),
  settleProjectBtn: document.querySelector("#settleProjectBtn"),
  dialog: document.querySelector("#entryDialog"),
  monthDialog: document.querySelector("#monthDialog"),
  monthForm: document.querySelector("#monthForm"),
  monthGrid: document.querySelector("#monthGrid"),
  monthCalendarTitle: document.querySelector("#monthCalendarTitle"),
  languageSelect: document.querySelector("#languageSelect"),
  checkUpdatesBtn: document.querySelector("#checkUpdatesBtn"),
  settingsBackupBtn: document.querySelector("#settingsBackupBtn"),
  settingsImportInput: document.querySelector("#settingsImportInput"),
  backupStatusTitle: document.querySelector("#backupStatusTitle"),
  backupStatusText: document.querySelector("#backupStatusText"),
  backupStatusValue: document.querySelector("#backupStatusValue"),
  dialogTitle: document.querySelector("#dialogTitle"),
  form: document.querySelector("#entryForm"),
  deleteDialogBtn: document.querySelector("#deleteDialogBtn"),
  fields: document.querySelector("#formFields")
};

els.monthSelect.addEventListener("click", openMonthDialog);
els.privacyToggleBtn.addEventListener("click", () => {
  state.privacyMode = !state.privacyMode;
  saveState();
  render();
});
document.querySelector("#addFundBtn").addEventListener("click", () => openDialog("fund"));
document.querySelector("#quickExpenseBtn").addEventListener("click", () => openDialog("expense"));
els.quickMoveBtn.addEventListener("click", () => openDialog("transfer"));
els.allocationDetailAddIncomeBtn.addEventListener("click", event => {
  event.stopPropagation();
  openDialog("income");
});
els.allocationDetailQuickAllocateBtn.addEventListener("click", () => openDialog("quickAllocate"));
els.addRecordBtn.addEventListener("click", toggleAddRecordMenu);
els.addRecordIncomeBtn.addEventListener("click", () => {
  closeAddRecordMenu();
  openDialog("income");
});
els.addRecordExpenseBtn.addEventListener("click", () => {
  closeAddRecordMenu();
  openDialog("expense");
});
els.addProjectBtn.addEventListener("click", () => openDialog("project"));
document.querySelector("#backToDashboardBtn").addEventListener("click", showDashboard);
document.querySelector("#backToDashboardFromAllocationBtn").addEventListener("click", showDashboard);
document.querySelector("#backToProjectsBtn").addEventListener("click", showDashboard);
els.allocationDetailTable.addEventListener("click", event => {
  const trigger = event.target.closest("[data-action='edit-inline-allocation']");
  if (!trigger) return;
  const nextFundId = trigger.closest("[data-fund-id]")?.dataset.fundId;
  if (!nextFundId) return;
  if (allocationRowEdit?.fundId === nextFundId) {
    const input = els.allocationDetailTable.querySelector(`[data-detail-allocation-input][data-fund-id="${nextFundId}"]`);
    input?.focus({ preventScroll: true });
    input?.select();
    return;
  }
  if (allocationRowEdit) {
    const currentInput = els.allocationDetailTable.querySelector(`[data-detail-allocation-input][data-fund-id="${allocationRowEdit.fundId}"]`);
    commitAllocationRowEdit(currentInput);
    if (allocationRowEdit) return;
  }
  startAllocationRowEdit(nextFundId);
});
els.allocationDetailTable.addEventListener("input", updateInlineAllocationDetail);
els.allocationDetailTable.addEventListener("focusout", event => {
  if (!event.target.matches("[data-detail-allocation-input]")) return;
  const blurredFundId = event.target.dataset.fundId;
  window.setTimeout(() => {
    if (allocationRowEdit?.fundId === blurredFundId && !els.allocationDetailTable.contains(document.activeElement)) {
      commitAllocationRowEdit(event.target);
    }
  }, 0);
});
els.allocationDetailTable.addEventListener("keydown", event => {
  if (event.key === "Enter" && event.target.matches("[data-detail-allocation-input]")) {
    event.preventDefault();
    commitAllocationRowEdit(event.target);
  }
  if (event.key === "Escape" && event.target.matches("[data-detail-allocation-input]")) {
    event.preventDefault();
    cancelAllocationRowEdit();
  }
  if ((event.key === "Enter" || event.key === " ") && !event.target.matches("[data-detail-allocation-input]")) {
    const row = event.target.closest("[data-action='edit-inline-allocation'][data-fund-id]");
    if (!row) return;
    event.preventDefault();
    startAllocationRowEdit(row.dataset.fundId);
  }
});
els.incomeStorageCard.addEventListener("click", () => showAllocationDetail(false));
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
els.detailRoleBtn.addEventListener("click", () => {
  const fund = selectedFund();
  if (fund) openDialog("categoryRole", fund.id);
});
els.detailMoveBtn.addEventListener("click", () => openDialog("transfer"));
els.detailFundName.addEventListener("click", () => {
  const fund = selectedFund();
  if (fund) openDialog("fund", fund.id);
});
els.addProjectEntryBtn.addEventListener("click", () => {
  const project = selectedProject();
  if (project && project.status !== "settled") openDialog("projectEntry", null, { fundId: project.defaultFundId });
});
els.projectDetailName.addEventListener("click", () => {
  const project = selectedProject();
  if (project) openDialog("project", project.id);
});
els.projectDetailMetaBtn.addEventListener("click", () => {
  const project = selectedProject();
  if (project) openDialog("project", project.id);
});
els.deleteProjectBtn.addEventListener("click", deleteSelectedProject);
els.settleProjectBtn.addEventListener("click", settleOrReopenProject);
els.updateNowBtn.addEventListener("click", activateWaitingServiceWorker);
els.checkUpdatesBtn.addEventListener("click", checkForUpdates);
els.languageSelect.addEventListener("change", event => {
  state.language = event.target.value;
  saveState();
  render();
});
els.settingsBackupBtn.addEventListener("click", exportData);
els.settingsImportInput.addEventListener("change", importData);
els.backupNowBtn.addEventListener("click", exportData);
els.dismissBackupBtn.addEventListener("click", dismissBackupReminder);
document.querySelector("#cancelDialogBtn").addEventListener("click", closeEntryDialog);
els.deleteDialogBtn.addEventListener("click", deleteCurrentDialogItem);
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
els.recordSearchInput.addEventListener("input", renderRecords);
els.recordFilterBtn.addEventListener("click", toggleRecordFilterMenu);
els.bottomNav.addEventListener("click", event => {
  const button = event.target.closest("[data-tab]");
  if (!button) return;
  event.stopPropagation();
  showTab(button.dataset.tab);
});
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
els.fundRoleFilter.addEventListener("click", event => {
  const button = event.target.closest("[data-role-filter]");
  if (!button) return;
  availableRoleFilter = button.dataset.roleFilter;
  renderFunds();
  renderFundSearchResults();
});
els.fundList.addEventListener("dragstart", startFundDrag);
els.fundList.addEventListener("dragover", moveFundDrag);
els.fundList.addEventListener("drop", dropFundDrag);
els.fundList.addEventListener("dragend", endFundDrag);
els.fundList.addEventListener("pointerdown", startTouchFundDrag);
els.fundList.addEventListener("pointermove", moveTouchFundDrag);
els.fundList.addEventListener("pointerup", finishTouchFundDrag);
els.fundList.addEventListener("pointercancel", cancelTouchFundDrag);
els.form.addEventListener("submit", saveEntry);
els.form.addEventListener("input", updateAllocationEditor);
els.form.addEventListener("change", updateAllocationEditor);
els.form.addEventListener("input", updateQuickAllocatePreview);
els.form.addEventListener("change", updateQuickAllocatePreview);
els.form.addEventListener("input", updateNoteAutocomplete);
els.form.addEventListener("click", applyNoteSuggestion);
els.form.addEventListener("keydown", event => {
  if (event.key === "Escape") hideNoteSuggestions();
});
els.detailView.addEventListener("touchstart", startDetailSwipe, { passive: true });
els.detailView.addEventListener("touchmove", moveDetailSwipe, { passive: false });
els.detailView.addEventListener("touchend", finishDetailSwipe, { passive: true });
els.allocationDetailView.addEventListener("touchstart", startDetailSwipe, { passive: true });
els.allocationDetailView.addEventListener("touchmove", moveDetailSwipe, { passive: false });
els.allocationDetailView.addEventListener("touchend", finishDetailSwipe, { passive: true });
els.projectDetailView.addEventListener("touchstart", startDetailSwipe, { passive: true });
els.projectDetailView.addEventListener("touchmove", moveDetailSwipe, { passive: false });
els.projectDetailView.addEventListener("touchend", finishDetailSwipe, { passive: true });
window.addEventListener("resize", () => {
  if (!els.recordFilterPanel.hidden) positionRecordFilterPanel();
});
window.addEventListener("scroll", () => {
  if (!els.recordFilterPanel.hidden) positionRecordFilterPanel();
}, { passive: true });

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return normalizeStateLanguage(structuredClone(initialData));

  try {
    const parsed = JSON.parse(saved);
    if (!parsed.months || !parsed.currentMonth) return normalizeStateLanguage(structuredClone(initialData));
    if (!parsed.fundSort) parsed.fundSort = DEFAULT_FUND_SORT;
    if (!Array.isArray(parsed.fundOrder)) parsed.fundOrder = [];
    if (!parsed.language) parsed.language = DEFAULT_LANGUAGE;
    if (!Array.isArray(parsed.projects)) parsed.projects = [];
    parsed.privacyMode = Boolean(parsed.privacyMode);
    const normalized = normalizeStateLanguage(parsed);
    if (normalized.languageNormalized && normalized.dataVersion === DATA_VERSION) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    }
    return normalized;
  } catch {
    return normalizeStateLanguage(structuredClone(initialData));
  }
}

function normalizeStateLanguage(rawState) {
  const shouldTranslateLegacyNames = rawState.languageNormalized !== true;
  if (!rawState.fundSort) rawState.fundSort = DEFAULT_FUND_SORT;
  if (!Array.isArray(rawState.fundOrder)) rawState.fundOrder = [];
  if (!rawState.language) rawState.language = DEFAULT_LANGUAGE;
  rawState.backupDirty = Boolean(rawState.backupDirty);
  rawState.lastBackupAt = rawState.lastBackupAt || localStorage.getItem(LAST_BACKUP_KEY) || null;
  if (!Array.isArray(rawState.projects)) rawState.projects = [];
  rawState.dataVersion = DATA_VERSION;
  rawState.languageNormalized = true;
  rawState.privacyMode = Boolean(rawState.privacyMode);
  rawState.projects.forEach(project => {
    project.name = shouldTranslateLegacyNames ? translateName(project.name || "") : (project.name || "");
    project.type = project.type || "other";
    project.status = project.status === "settled" ? "settled" : "active";
    project.monthId = project.monthId || rawState.currentMonth;
    project.startMonth = normalizeProjectStartMonth(project, rawState.currentMonth);
    project.createdAt = project.createdAt || fallbackTimestamp(project.startDate || `${project.monthId || rawState.currentMonth}-01`);
    project.updatedAt = project.updatedAt || project.createdAt;
    project.entries = Array.isArray(project.entries) ? project.entries : [];
    project.settlementExpenseIds = Array.isArray(project.settlementExpenseIds) ? project.settlementExpenseIds : [];
    project.defaultCategory = shouldTranslateLegacyNames ? translateName(project.defaultCategory || "") : (project.defaultCategory || "");
    if (!project.defaultCategory && project.defaultFundId) {
      const projectMonth = rawState.months?.[project.monthId] || rawState.months?.[project.startMonth];
      const defaultName = projectMonth?.funds?.find(fund => fund.id === project.defaultFundId)?.name || "";
      project.defaultCategory = shouldTranslateLegacyNames ? translateName(defaultName) : defaultName;
    }
    project.entries.forEach(entry => {
      entry.category = translateNote(entry.category || "");
      entry.note = translateNote(entry.note || "");
      entry.createdAt = entry.createdAt || fallbackTimestamp(entry.date || project.startDate || `${project.monthId || rawState.currentMonth}-01`);
      entry.updatedAt = entry.updatedAt || entry.createdAt;
    });
  });
  Object.entries(rawState.months || {}).forEach(([monthId, month]) => {
    month.categoryEvents = Array.isArray(month.categoryEvents) ? month.categoryEvents : [];
    month.incomes?.forEach(income => {
      income.name = shouldTranslateLegacyNames ? translateName(income.name) : income.name;
      income.date = income.date || `${monthId}-01`;
      income.createdAt = income.createdAt || fallbackTimestamp(income.date);
      income.updatedAt = income.updatedAt || income.createdAt;
    });
    month.funds?.forEach(fund => {
      fund.name = shouldTranslateLegacyNames ? translateName(fund.name) : fund.name;
      fund.pinned = Boolean(fund.pinned);
      fund.createdAt = fund.createdAt || fallbackTimestamp(`${monthId}-01`);
      fund.updatedAt = fund.updatedAt || "";
      normalizeCategoryMetadata(fund);
    });
    month.expenses?.forEach(expense => {
      expense.category = shouldTranslateLegacyNames ? translateName(expense.category) : expense.category;
      expense.note = translateNote(expense.note);
      expense.createdAt = expense.createdAt || fallbackTimestamp(expense.date);
      expense.updatedAt = expense.updatedAt || expense.createdAt;
    });
    month.categoryEvents.forEach(event => {
      event.id = event.id || crypto.randomUUID();
      event.date = event.date || `${monthId}-01`;
      event.type = event.type || "adjustment";
      event.category = shouldTranslateLegacyNames ? translateName(event.category || "") : (event.category || "");
      event.fromCategory = shouldTranslateLegacyNames ? translateName(event.fromCategory || "") : (event.fromCategory || "");
      event.toCategory = shouldTranslateLegacyNames ? translateName(event.toCategory || "") : (event.toCategory || "");
      event.note = translateNote(event.note || "");
      event.amount = Number.isFinite(Number(event.amount)) ? Number(event.amount) : 0;
      event.createdAt = event.createdAt || fallbackTimestamp(event.date);
      event.updatedAt = event.updatedAt || event.createdAt;
    });
    month.debts?.forEach(debt => {
      debt.person = shouldTranslateLegacyNames ? translateName(debt.person) : debt.person;
      debt.note = translateNote(debt.note);
      debt.status = translateStatus(debt.status);
    });
  });
  repairCategoryLifecycleGaps(rawState);
  return rawState;
}

function normalizeProjectStartMonth(project, fallbackMonth) {
  const candidate = project.startMonth || project.monthId || (project.startDate || "").slice(0, 7) || fallbackMonth;
  return /^\d{4}-\d{2}$/.test(candidate) ? candidate : fallbackMonth;
}

function repairCategoryLifecycleGaps(rawState) {
  if (rawState.categoryLifecycleRepairVersion >= CATEGORY_LIFECYCLE_REPAIR_VERSION) return;

  const keys = Object.keys(rawState.months || {}).sort();
  let changed = false;

  keys.forEach((monthId, index) => {
    if (index === 0) return;
    const previous = rawState.months[keys[index - 1]];
    const month = rawState.months[monthId];
    if (!previous?.funds || !month?.funds) return;

    previous.funds.forEach(previousFund => {
      const existing = month.funds.find(fund => fund.name === previousFund.name);
      if (existing) {
        existing.start = balanceForMonthFund(previousFund, previous);
        return;
      }

      month.funds.push({
        id: crypto.randomUUID(),
        name: previousFund.name,
        start: balanceForMonthFund(previousFund, previous),
        allocation: 0,
        target: Number(previousFund.target || 0),
        pinned: Boolean(previousFund.pinned),
        role: normalizeCategoryRole(previousFund.role),
        isSubscription: Boolean(previousFund.isSubscription),
        billingCycle: normalizeBillingCycle(previousFund.billingCycle),
        expectedAmount: Number(previousFund.expectedAmount || 0),
        dueDay: previousFund.dueDay ?? null,
        createdAt: fallbackTimestamp(`${monthId}-01`),
        updatedAt: ""
      });
      changed = true;
    });
  });

  rawState.categoryLifecycleRepairVersion = CATEGORY_LIFECYCLE_REPAIR_VERSION;
  if (changed) rawState.backupDirty = true;
}

function balanceForMonthFund(fund, month) {
  return Number(fund.start || 0) + Number(fund.allocation || 0) - expenseTotalForMonthCategory(fund.name, month);
}

function expenseTotalForMonthCategory(category, month) {
  return (month.expenses || [])
    .filter(expense => expense.category === category)
    .reduce((total, expense) => total + Number(expense.amount || 0), 0);
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

function markFinancialDirty() {
  state.backupDirty = true;
}

function t(key, ...args) {
  const dictionary = I18N[state.language] || I18N.en;
  const value = dictionary[key] ?? I18N.en[key] ?? key;
  return typeof value === "function" ? value(...args) : value;
}

function currentLanguage() {
  return state.language === "zh" ? "zh" : "en";
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
  return window.confirm(t("laterMonthChange"));
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

function syncCreatedCategoryToLaterMonths(createdFund) {
  let previousKey = state.currentMonth;
  laterMonthKeys().forEach(monthId => {
    const previous = state.months[previousKey];
    const month = state.months[monthId];
    let fund = month.funds.find(item => item.name === createdFund.name);

    if (!fund) {
      fund = {
        id: crypto.randomUUID(),
        name: createdFund.name,
        start: 0,
        allocation: 0,
        target: 0,
        pinned: false,
        role: normalizeCategoryRole(createdFund.role),
        isSubscription: Boolean(createdFund.isSubscription),
        billingCycle: normalizeBillingCycle(createdFund.billingCycle),
        expectedAmount: Number(createdFund.expectedAmount || 0),
        dueDay: createdFund.dueDay ?? null,
        createdAt: fallbackTimestamp(`${monthId}-01`),
        updatedAt: createdFund.updatedAt || nowStamp()
      };
      month.funds.push(fund);
    }

    const previousFund = previous.funds.find(item => item.name === createdFund.name);
    fund.start = previousFund ? balanceFor(previousFund, previous) : 0;
    previousKey = monthId;
  });
}

function cascadeLaterMonthStartsQuietly(fromMonthId = state.currentMonth) {
  const hadLaterMonths = hasLaterMonths(fromMonthId);
  cascadeLaterMonthStarts(fromMonthId);
  if (hadLaterMonths) showToast(t("laterMonthsUpdated"));
}

function finishBalanceMutation() {
  cascadeLaterMonthStartsQuietly();
  markFinancialDirty();
  saveState();
  els.dialog.close();
  render();
}

function showToast(message) {
  let toast = document.querySelector("#appToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "appToast";
    toast.className = "app-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

function selectedFund() {
  return currentMonth().funds.find(fund => fund.id === selectedFundId) || null;
}

function selectedProject() {
  const project = state.projects.find(item => item.id === selectedProjectId);
  return project && isProjectVisibleInMonth(project, state.currentMonth) ? project : null;
}

function projectStartMonth(project) {
  return normalizeProjectStartMonth(project, state.currentMonth);
}

function isProjectVisibleInMonth(project, monthId) {
  return Boolean(project) && monthId >= projectStartMonth(project);
}

function visibleProjectsForMonth(monthId = state.currentMonth) {
  return state.projects
    .filter(project => isProjectVisibleInMonth(project, monthId))
    .sort(sortProjects);
}

function sortProjects(a, b) {
  return (b.updatedAt || b.startDate || "").localeCompare(a.updatedAt || a.startDate || "");
}

function money(value) {
  if (state.privacyMode) return "••••";
  const formatted = normalizeMoney(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return `€${formatted}`;
}

function signedMoney(value) {
  const amount = normalizeMoney(value);
  if (state.privacyMode) return "••••";
  return amount < 0 ? `-${money(Math.abs(amount))}` : money(amount);
}

function moneyCents(value) {
  return Math.round(Number(value || 0) * 100);
}

function centsToMoney(cents) {
  return cents / 100;
}

function normalizeMoney(value) {
  return centsToMoney(moneyCents(value));
}

function formatShortDate(value) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString(currentLanguage() === "zh" ? "zh-CN" : "en-US", { month: "short", day: "numeric" });
}

function formatRealMonthId() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function localDateId(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function defaultEntryDateForCurrentMonth() {
  const realMonth = formatRealMonthId();
  if (realMonth === state.currentMonth) {
    return localDateId();
  }
  return `${state.currentMonth}-01`;
}

function sum(items, key = "amount") {
  return items.reduce((total, item) => total + Number(item[key] || 0), 0);
}

function unallocatedFor(month = currentMonth()) {
  return normalizeMoney(sum(month.incomes) - sum(month.funds, "allocation"));
}

function expenseTotalFor(category, month = currentMonth()) {
  return month.expenses
    .filter(expense => expense.category === category)
    .reduce((total, expense) => total + Number(expense.amount || 0), 0);
}

function balanceFor(fund, month = currentMonth()) {
  return Number(fund.start || 0) + Number(fund.allocation || 0) - expenseTotalFor(fund.name, month);
}

function addCategoryEvent({ date = defaultEntryDateForCurrentMonth(), type, category, amount, note = "", fromCategory = "", toCategory = "" }) {
  const numericAmount = Number(amount || 0);
  if (!category || !type || numericAmount === 0) return;

  const month = currentMonth();
  month.categoryEvents = Array.isArray(month.categoryEvents) ? month.categoryEvents : [];
  const stamp = nowStamp();
  month.categoryEvents.push({
    id: crypto.randomUUID(),
    date,
    type,
    category,
    fromCategory,
    toCategory,
    note,
    amount: numericAmount,
    createdAt: stamp,
    updatedAt: stamp
  });
}

function categoryEventTypeLabel(type) {
  const labels = {
    "starting-balance": t("startingBalanceRecord"),
    "allocation-adjustment": t("allocation"),
    "move-in": t("moveIn"),
    "move-out": t("moveOut"),
    expense: t("expense"),
    "project-settlement": t("projectSettlement")
  };
  return labels[type] || t("records");
}

function categoryRoleLabel(role) {
  return t(normalizeCategoryRole(role));
}

function billingCycleLabel(cycle) {
  const normalized = normalizeBillingCycle(cycle);
  if (normalized === "monthly") return t("monthly");
  if (normalized === "yearly") return t("yearly");
  return t("billingOther");
}

function subscriptionMetaText(fund) {
  if (!fund?.isSubscription) return "";
  const parts = [billingCycleLabel(fund.billingCycle)];
  const amount = Number(fund.expectedAmount || 0);
  if (amount > 0) parts.push(money(amount));
  if (fund.dueDay) parts.push(`${t("dueDay")} ${fund.dueDay}`);
  return parts.join(" · ");
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
  if (sortMode === MANUAL_FUND_SORT) {
    return manualFundRank(a.fund.name) - manualFundRank(b.fund.name) || a.fund.name.localeCompare(b.fund.name);
  }
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

function manualFundRank(name) {
  const index = (state.fundOrder || []).indexOf(name);
  return index >= 0 ? index : Number.MAX_SAFE_INTEGER;
}

function addCategoryToManualOrder(name) {
  if (!name) return;
  const order = Array.isArray(state.fundOrder) ? state.fundOrder : [];
  if (!order.includes(name)) order.push(name);
  state.fundOrder = order;
}

function renameCategoryInManualOrder(previousName, nextName) {
  if (!previousName || !nextName || previousName === nextName) return;
  const nextOrder = [];
  (state.fundOrder || []).forEach(name => {
    const resolvedName = name === previousName ? nextName : name;
    if (!nextOrder.includes(resolvedName)) nextOrder.push(resolvedName);
  });
  if (!nextOrder.includes(nextName)) nextOrder.push(nextName);
  state.fundOrder = nextOrder;
}

function removeCategoryFromManualOrder(name) {
  if (!name) return;
  state.fundOrder = (state.fundOrder || []).filter(item => item !== name);
}

function ensureFundOrderIncludesCurrentCategories() {
  const existing = new Set(currentMonth().funds.map(fund => fund.name));
  const ordered = (state.fundOrder || []).filter(name => existing.has(name));
  currentMonth().funds.forEach(fund => {
    if (!ordered.includes(fund.name)) ordered.push(fund.name);
  });
  state.fundOrder = ordered;
}

function allocationSegments(limit = 5) {
  return moneyStructureSegments(currentMonth());
}

function moneyStructureSegments(month = currentMonth()) {
  const totalIncome = sum(month.incomes);
  const unallocated = Math.max(0, unallocatedFor(month));
  const totals = {
    fixed: roleAllocationTotal(month, "fixed"),
    spending: roleAllocationTotal(month, "spending"),
    savings: roleAllocationTotal(month, "savings")
  };
  const segmentConfig = [
    { role: "fixed", label: t("fixed"), color: "#ff3b30" },
    { role: "spending", label: t("spending"), color: "#ff8a1f" },
    { role: "savings", label: t("savings"), color: "#34a853" }
  ];
  const segments = segmentConfig
    .filter(segment => totals[segment.role] > 0)
    .map(segment => ({ label: segment.label, amount: totals[segment.role], color: segment.color }));

  if (unallocated > 0) {
    segments.push({ label: t("unallocated"), amount: unallocated, color: "#d1d1d6", muted: true });
  }

  return { totalIncome, allocated: sum(month.funds, "allocation"), unallocated, segments };
}

function roleAllocationTotal(month, role) {
  return month.funds
    .filter(fund => normalizeCategoryRole(fund.role) === role)
    .reduce((total, fund) => total + Number(fund.allocation || 0), 0);
}

function subscriptionInsights(month = currentMonth()) {
  const subscriptions = month.funds.filter(fund => Boolean(fund.isSubscription));
  return subscriptions.reduce((result, fund) => {
    const amount = Number(fund.expectedAmount || 0);
    const cycle = normalizeBillingCycle(fund.billingCycle);
    if (cycle === "monthly") {
      result.monthly += amount;
      result.annual += amount * 12;
    }
    if (cycle === "yearly") {
      result.monthly += amount / 12;
      result.annual += amount;
    }
    result.count += 1;
    return result;
  }, { monthly: 0, annual: 0, count: 0 });
}

function availableBalanceSummary(month = currentMonth()) {
  return month.funds.reduce((summary, fund) => {
    const role = normalizeCategoryRole(fund.role);
    const balance = balanceFor(fund, month);
    summary.total += balance;
    if (role === "fixed") summary.fixed += balance;
    if (role === "spending") summary.spending += balance;
    if (role === "savings") summary.savings += balance;
    return summary;
  }, { total: 0, spending: 0, fixed: 0, savings: 0 });
}

function render() {
  const month = currentMonth();
  renderStaticLanguage();
  renderMonthSelect();
  if (selectedFundId && !selectedFund()) selectedFundId = null;
  if (selectedProjectId && !selectedProject()) selectedProjectId = null;

  renderIncomeStorage();
  renderAllocationDetail();
  renderFunds();
  renderFundSearchResults();
  renderRecordFilter();
  renderRecords();
  renderProjects();
  renderProjectDetail();
  renderDetail();
  renderDetailSortLabels();
  renderBackupReminder();
  renderBackupStatus();
  const inDetail = Boolean(selectedFundId) || showingAllocationDetail || Boolean(selectedProjectId);
  els.dashboardView.hidden = inDetail || activeTab !== "home";
  els.recordsView.hidden = inDetail || activeTab !== "records";
  els.projectsView.hidden = inDetail || activeTab !== "projects";
  els.settingsView.hidden = inDetail || activeTab !== "settings";
  els.detailView.hidden = !selectedFundId;
  els.allocationDetailView.hidden = !showingAllocationDetail;
  els.projectDetailView.hidden = !selectedProjectId;
  els.bottomNav.hidden = false;
  updateBottomNav();
}

function renderMonthSelect() {
  els.monthSelect.textContent = formatMonthLabel(state.currentMonth);
}

function renderStaticLanguage() {
  document.documentElement.lang = currentLanguage() === "zh" ? "zh-Hans" : "en";
  els.languageSelect.value = currentLanguage();
  els.privacyToggleBtn.classList.toggle("is-private", state.privacyMode);
  els.privacyToggleBtn.textContent = state.privacyMode ? "◉" : "◎";
  els.privacyToggleBtn.setAttribute("aria-pressed", String(Boolean(state.privacyMode)));
  els.privacyToggleBtn.setAttribute("aria-label", state.privacyMode ? t("showAmounts") : t("hideAmounts"));
  els.privacyToggleBtn.title = state.privacyMode ? t("showAmounts") : t("hideAmounts");
  els.monthSelect.setAttribute("aria-label", t("openMonthCalendar"));
  els.backupNowBtn.textContent = t("backupNow");
  els.dismissBackupBtn.textContent = t("later");
  document.querySelector("#backupReminder strong").textContent = t("backupTitle");
  document.querySelector("#incomeStorageCard h2").textContent = t("incomeStorage");
  document.querySelector("#incomeStorageCard .metric.income span").textContent = t("totalIncome");
  document.querySelector("#incomeStorageCard .metric.allocated span").textContent = t("allocated");
  document.querySelector("#incomeStorageCard .metric.left span").textContent = t("unallocated");
  document.querySelector(".fund-title-row h2").textContent = t("availableBalance");
  els.fundRoleFilter.setAttribute("aria-label", t("categoryRole"));
  const roleFilterLabels = {
    all: t("overview"),
    spending: t("spending"),
    fixed: t("fixed"),
    savings: t("savings")
  };
  els.fundRoleFilter.querySelectorAll("[data-role-filter]").forEach(button => {
    const label = button.querySelector("span");
    if (label) label.textContent = roleFilterLabels[button.dataset.roleFilter] || button.dataset.roleFilter;
  });
  document.querySelector("#quickMoveBtn").textContent = t("move");
  document.querySelector("#quickExpenseBtn").textContent = t("log");
  els.fundSearchInput.placeholder = t("searchFunds");
  document.querySelector(".search-field").setAttribute("aria-label", t("searchFunds"));
  document.querySelector(".sort-label").textContent = t("sort");
  document.querySelector(".sort-display").textContent = t("sort");
  document.querySelector("#fundSortSelect").setAttribute("aria-label", t("sort"));
  const sortOptions = els.fundSortSelect.options;
  if (sortOptions.length >= 4) {
    sortOptions[0].textContent = t("mostAvailable");
    sortOptions[1].textContent = t("leastAvailable");
    sortOptions[2].textContent = t("recentlyUpdated");
    sortOptions[3].textContent = t("oldestUpdated");
    if (sortOptions[4]) sortOptions[4].textContent = t("manualOrder");
  }
  els.addFundBtn.setAttribute("aria-label", t("addFund"));
  document.querySelector("#recordsView h2").textContent = t("records");
  els.recordSearchInput.placeholder = t("searchRecords");
  els.recordFilterBtn.textContent = t("filter");
  els.recordFilterBtn.setAttribute("aria-label", t("filter"));
  els.addRecordBtn.textContent = t("add");
  els.addRecordIncomeBtn.textContent = t("income");
  els.addRecordExpenseBtn.textContent = t("expenses");
  document.querySelector(".records-table th:nth-child(1)").textContent = t("date");
  document.querySelector(".records-table th:nth-child(2)").textContent = t("category");
  document.querySelector(".records-table th:nth-child(3)").textContent = t("note");
  document.querySelector(".records-table th:nth-child(4)").textContent = t("amount");
  document.querySelector("#projectsView h2").textContent = t("projects");
  els.addProjectBtn.textContent = t("add");
  document.querySelector("#settingsView h2").textContent = t("settings");
  document.querySelector("#settingsBackupBtn").textContent = t("backupNow");
  document.querySelector(".restore-action").childNodes[0].textContent = t("restore");
  document.querySelector("#backupSettingTitle").textContent = t("backup");
  document.querySelector("#backupSettingText").textContent = t("backupText");
  els.backupStatusTitle.textContent = t("backupStatus");
  document.querySelector(".settings-item:nth-child(3) strong").textContent = t("restore");
  document.querySelector(".settings-item:nth-child(3) p").textContent = t("restoreText");
  document.querySelector(".settings-item:nth-child(4) strong").textContent = t("currency");
  document.querySelector(".settings-item:nth-child(4) p").textContent = t("currencyText");
  document.querySelector("#languageSettingTitle").textContent = t("language");
  document.querySelector("#languageSettingText").textContent = t("languageText");
  document.querySelector("#updatesSettingTitle").textContent = t("updates");
  document.querySelector("#updatesSettingText").textContent = t("updatesText");
  els.checkUpdatesBtn.textContent = t("checkUpdates");
  document.querySelector("#appVersionTitle").textContent = t("appVersion");
  document.querySelector("#appVersionText").textContent = t("appVersionText");
  document.querySelector("#appVersionValue").textContent = APP_VERSION;
  els.updateBannerTitle.textContent = t("updateAvailable");
  els.updateNowBtn.textContent = t("updateNow");
  document.querySelector(".bottom-nav [data-tab='home'] small").textContent = t("home");
  document.querySelector(".bottom-nav [data-tab='records'] small").textContent = t("records");
  document.querySelector(".bottom-nav [data-tab='projects'] small").textContent = t("projects");
  document.querySelector(".bottom-nav [data-tab='settings'] small").textContent = t("settings");
  document.querySelector("#backToDashboardFromAllocationBtn").textContent = `← ${t("home")}`;
  document.querySelector("#backToDashboardBtn").textContent = `← ${t("home")}`;
  document.querySelector("#backToProjectsBtn").textContent = `← ${t("projects")}`;
  document.querySelector("#allocationDetailView .eyebrow").textContent = t("incomeAllocationDetail");
  document.querySelector("#allocationDetailView h2").textContent = t("incomeStorage");
  document.querySelector("#allocationDetailAddIncomeBtn").textContent = t("add");
  document.querySelector("#allocationDetailView .detail-stats .metric.income span").textContent = t("totalIncome");
  document.querySelector("#allocationDetailView .detail-stats .metric.allocated span").textContent = t("allocated");
  document.querySelector("#allocationDetailView .detail-stats .metric.left span").textContent = t("unallocated");
  document.querySelector("#allocationDetailView .expense-panel h2").textContent = t("fundAllocation");
  els.allocationDetailQuickAllocateBtn.textContent = t("allocate");
  els.allocationDetailTable.setAttribute("aria-label", t("fundAllocation"));
  document.querySelector("#detailView .eyebrow").textContent = t("balanceDetail");
  document.querySelector("#detailView .detail-balance span").textContent = t("available");
  document.querySelector("#detailView .detail-stats .metric:nth-child(1) span").textContent = t("startingBalance");
  document.querySelector("#detailView .detail-stats .metric:nth-child(2) span").textContent = t("monthlyAllocation");
  document.querySelector("#detailView .detail-stats .metric:nth-child(3) span").textContent = t("spentInFund");
  document.querySelector("#detailView .expense-panel h2").textContent = t("records");
  document.querySelector("#detailMoveBtn").textContent = t("move");
  document.querySelector("#detailAddExpenseBtn").textContent = t("logExpense");
  document.querySelector("[data-field='date'] span:first-child").textContent = t("date");
  document.querySelector(".detail-expense-table th:nth-child(2)").textContent = t("type");
  document.querySelector(".detail-expense-table th:nth-child(3)").textContent = t("note");
  document.querySelector("[data-field='amount'] span:first-child").textContent = t("amount");
  document.querySelector("#cancelDialogBtn").textContent = t("cancel");
  document.querySelector("#entryForm menu button[type='submit']").textContent = t("save");
  els.deleteDialogBtn.textContent = t("deleteExpense");
  document.querySelector("#prevYearBtn").setAttribute("aria-label", t("previousYear"));
  document.querySelector("#nextYearBtn").setAttribute("aria-label", t("nextYear"));
  document.querySelector(".project-breakdown-panel h2").textContent = t("fundBreakdown");
  document.querySelector(".project-entries-panel h2").textContent = t("entries");
  els.deleteProjectBtn.textContent = t("deleteProject");
  els.addProjectEntryBtn.textContent = t("add");
  document.querySelector(".project-entries-table th:nth-child(1)").textContent = t("date");
  document.querySelector(".project-entries-table th:nth-child(2)").textContent = t("category");
  document.querySelector(".project-entries-table th:nth-child(3)").textContent = t("note");
  document.querySelector(".project-entries-table th:nth-child(4)").textContent = t("amount");
}

function renderIncomeStorage() {
  const { totalIncome, allocated, unallocated } = allocationSegments();

  els.allocationSummaryText.textContent = t("allocationSummary", money(allocated), money(totalIncome));
  els.storageTotalIncome.textContent = money(totalIncome);
  els.storageAllocatedAmount.textContent = money(allocated);
  els.storageUnallocatedAmount.textContent = money(unallocated);
}

function renderAllocationDetail() {
  const month = currentMonth();
  const { totalIncome, allocated, unallocated } = allocationSegments(8);
  if (allocationRowEdit && !month.funds.some(fund => fund.id === allocationRowEdit.fundId)) {
    allocationRowEdit = null;
  }

  els.allocationDetailIncome.textContent = money(totalIncome);
  els.allocationDetailAllocated.textContent = money(allocated);
  els.allocationDetailUnallocated.textContent = money(unallocated);
  els.allocationInsights.innerHTML = renderMoneyStructure(month);
  els.allocationDetailTable.classList.toggle("is-editing", Boolean(allocationRowEdit));
  els.allocationDetailTable.innerHTML = renderAllocationGroups(month);
}

function percentOfIncome(amount, totalIncome) {
  return totalIncome > 0 ? (amount / totalIncome) * 100 : 0;
}

function renderMoneyStructure(month = currentMonth(), previewFunds = month.funds) {
  const totalIncome = sum(month.incomes);
  const allocated = sum(previewFunds, "allocation");
  const unallocated = normalizeMoney(totalIncome - allocated);
  const subscription = subscriptionInsights(month);
  const structure = [
    { key: "fixed", label: t("fixed"), amount: roleAllocationTotal({ ...month, funds: previewFunds }, "fixed") },
    { key: "spending", label: t("spending"), amount: roleAllocationTotal({ ...month, funds: previewFunds }, "spending") },
    { key: "savings", label: t("savings"), amount: roleAllocationTotal({ ...month, funds: previewFunds }, "savings") },
    { key: "unallocated", label: t("unallocated"), amount: unallocated }
  ];

  return `
    <section class="money-structure-card" aria-label="${escapeAttr(t("moneyStructure"))}">
      <div class="money-structure-title">${t("moneyStructure")}</div>
      <div class="money-structure-grid">
        ${structure.map(item => {
      const percent = percentOfIncome(item.amount, totalIncome);
      const subscriptionLine = item.key === "fixed" && subscription.count > 0
        ? `<small>${t("subscriptionInline", money(subscription.monthly), subscription.count)}</small>`
        : "";
      return `
            <article class="structure-cell structure-${item.key}">
          <span>${item.label}</span>
              <strong class="${item.amount < 0 ? "is-negative" : ""}">${money(item.amount)}</strong>
              <em>${percent.toFixed(1)}%</em>
          ${subscriptionLine}
        </article>
      `;
    }).join("")}
      </div>
    </section>
  `;
}

function renderAllocationGroups(month = currentMonth()) {
  const totalIncome = sum(month.incomes);
  const roles = ["fixed", "spending", "savings"];
  const subscription = subscriptionInsights(month);
  const groups = roles.map(role => {
    const funds = month.funds
      .filter(fund => normalizeCategoryRole(fund.role) === role)
      .sort((a, b) => Number(b.allocation || 0) - Number(a.allocation || 0) || a.name.localeCompare(b.name));
    const total = funds.reduce((sumValue, fund) => sumValue + Number(fund.allocation || 0), 0);
    return { role, funds, total };
  }).filter(group => group.funds.length);

  if (!groups.length) return `<p class="empty">${t("noFunds")}</p>`;

  return groups.map(group => `
    <section class="allocation-role-card allocation-role-${group.role}" aria-label="${escapeAttr(categoryRoleLabel(group.role))}">
      <header class="allocation-role-header">
        <div>
          <strong>${categoryRoleLabel(group.role)}</strong>
          ${group.role === "fixed" && subscription.count > 0 ? `<small>${t("subscriptionInline", money(subscription.monthly), subscription.count)}</small>` : ""}
        </div>
        <span>${t("structureLine", money(group.total), percentOfIncome(group.total, totalIncome).toFixed(1))}</span>
      </header>
      <div class="allocation-role-rows">
    ${group.funds.map(fund => renderAllocationRow(fund, totalIncome)).join("")}
      </div>
    </section>
  `).join("");
}

function renderAllocationRow(fund, totalIncome) {
  const allocation = Number(fund.allocation || 0);
  const incomeShare = percentOfIncome(allocation, totalIncome);
  const afterBalance = balanceFor({ ...fund, allocation });
  const editing = allocationRowEdit?.fundId === fund.id;
  if (editing) {
    return `
      <article class="allocation-mobile-row allocation-category-row is-row-editing" data-fund-id="${fund.id}">
          <div class="allocation-row-main">
            <button class="allocation-name-button" type="button" data-action="edit-inline-allocation">${escapeHtml(fund.name)}</button>
            <div class="allocation-row-inputs">
              <input name="detail-allocation:${fund.id}" data-detail-allocation-input data-fund-id="${fund.id}" value="${escapeAttr(allocation.toFixed(2))}" type="text" inputmode="decimal" autocomplete="off" aria-label="${escapeAttr(t("allocated"))} ${escapeAttr(fund.name)}">
              <button class="allocation-derived-percent" type="button" data-action="edit-inline-allocation" data-fund-id="${fund.id}">${incomeShare.toFixed(1)}%</button>
            </div>
          </div>
          <div class="allocation-row-meta">
            <span>${t("startingBalance")} ${money(fund.start)} ·</span>
            <span data-after-balance>${t("available")} ${money(afterBalance)}</span>
          </div>
      </article>
    `;
  }
  return `
    <article class="allocation-mobile-row allocation-category-row clickable-row" data-fund-id="${fund.id}" data-action="edit-inline-allocation" tabindex="0" aria-label="${escapeAttr(`${fund.name} ${money(allocation)} ${incomeShare.toFixed(1)}%`)}">
        <div class="allocation-row-main">
          <button class="allocation-name-button" type="button" data-action="edit-inline-allocation">${escapeHtml(fund.name)}</button>
          <button class="editable-number allocation-inline-value" type="button" data-action="edit-inline-allocation">
            <span>${money(allocation)}</span>
            <small>${incomeShare.toFixed(1)}%</small>
          </button>
        </div>
        <div class="allocation-row-meta">
          <span>${t("startingBalance")} ${money(fund.start)} ·</span>
          <span>${t("available")} ${money(afterBalance)}</span>
        </div>
    </article>
  `;
}

function renderAllocationBarSegments(segments, total) {
  if (total <= 0 || !segments.length) {
    return `<span class="allocation-empty" style="width:100%"></span>`;
  }

  return segments.map(segment => {
    const width = Math.max(0, (segment.amount / total) * 100);
    return `<span title="${escapeAttr(segment.label)} ${money(segment.amount)}" style="--segment:${segment.color}; --width:${width}%"></span>`;
  }).join("");
}

function updateInlineAllocationDetail(event) {
  if (!allocationRowEdit) return;
  const target = event.target;
  if (!target?.matches("[data-detail-allocation-input]")) return;
  refreshInlineAllocationSummary();
}

function refreshInlineAllocationSummary() {
  if (!allocationRowEdit) return;
  const totalIncome = sum(currentMonth().incomes);
  const previewFunds = currentMonth().funds.map(fund => {
    const input = fund.id === allocationRowEdit.fundId
      ? els.allocationDetailTable.querySelector(`[data-detail-allocation-input][data-fund-id="${fund.id}"]`)
      : null;
    const allocation = input ? (parseMoneyInput(input.value) ?? Number(fund.allocation || 0)) : Number(fund.allocation || 0);
    return { ...fund, allocation };
  });
  const allocated = sum(previewFunds, "allocation");
  const unallocated = normalizeMoney(totalIncome - allocated);
  els.allocationDetailAllocated.textContent = money(allocated);
  els.allocationDetailUnallocated.textContent = money(unallocated);
  els.allocationInsights.innerHTML = renderMoneyStructure(currentMonth(), previewFunds);
  previewFunds.forEach(fund => {
    const row = els.allocationDetailTable.querySelector(`[data-fund-id="${fund.id}"]`);
    const percent = row?.querySelector(".allocation-derived-percent");
    const after = row?.querySelector("[data-after-balance]");
    if (percent) percent.textContent = `${percentOfIncome(Number(fund.allocation || 0), totalIncome).toFixed(1)}%`;
    if (after) after.textContent = `${t("available")} ${money(balanceFor(fund))}`;
  });
}

function startAllocationRowEdit(fundId) {
  if (!fundId) return;
  const fund = currentMonth().funds.find(item => item.id === fundId);
  if (!fund) return;
  allocationRowEdit = {
    fundId,
    originalAmount: Number(fund.allocation || 0)
  };
  renderAllocationDetail();
  requestAnimationFrame(() => {
    const input = els.allocationDetailTable.querySelector(`[data-detail-allocation-input][data-fund-id="${fundId}"]`);
    input?.focus({ preventScroll: true });
    input?.select();
  });
}

function cancelAllocationRowEdit() {
  allocationRowEdit = null;
  renderAllocationDetail();
}

function commitAllocationRowEdit(input) {
  if (!allocationRowEdit || !input) return;
  if (input.dataset.fundId !== allocationRowEdit.fundId) return;
  const fund = currentMonth().funds.find(item => item.id === allocationRowEdit.fundId);
  if (!fund) {
    allocationRowEdit = null;
    renderAllocationDetail();
    return;
  }

  const amount = parseMoneyInput(input.value);
  if (amount === null || amount < 0) {
    showToast(t("validAllocations"));
    allocationRowEdit = null;
    renderAllocationDetail();
    return;
  }

  const totalIncome = sum(currentMonth().incomes);
  const totalAllocated = currentMonth().funds.reduce((total, item) => {
    return total + (item.id === fund.id ? amount : Number(item.allocation || 0));
  }, 0);
  const overAllocatedCents = moneyCents(totalAllocated) - moneyCents(totalIncome);
  if (overAllocatedCents > 0) {
    showToast(t("overAllocated", money(centsToMoney(overAllocatedCents))));
    input.focus({ preventScroll: true });
    input.select();
    refreshInlineAllocationSummary();
    return;
  }

  const previousAllocation = Number(fund.allocation || 0);
  if (moneyCents(previousAllocation) !== moneyCents(amount)) {
    fund.allocation = normalizeMoney(amount);
    fund.updatedAt = nowStamp();
    addCategoryEvent({
      type: "allocation-adjustment",
      category: fund.name,
      amount: amount - previousAllocation,
      note: t("allocationChanged")
    });
    cascadeLaterMonthStartsQuietly();
    markFinancialDirty();
    saveState();
    showToast(t("savedToast"));
  }
  allocationRowEdit = null;
  render();
}

function renderFunds() {
  const month = currentMonth();
  ensureFundOrderIncludesCurrentCategories();
  const summary = availableBalanceSummary(month);
  const subscriptions = subscriptionInsights(month);
  els.availableSummarySpendable.textContent = money(summary.spending);
  els.availableSummaryFixed.textContent = money(summary.fixed);
  els.availableSummarySavings.textContent = money(summary.savings);
  els.availableSummarySpendable.classList.toggle("is-negative", summary.spending < 0);
  els.availableSummaryFixed.classList.toggle("is-negative", summary.fixed < 0);
  els.availableSummarySavings.classList.toggle("is-negative", summary.savings < 0);
  if (els.availableSubscriptionNote) {
    els.availableSubscriptionNote.hidden = subscriptions.monthly <= 0;
    els.availableSubscriptionNote.textContent = subscriptions.monthly > 0
      ? `${t("subscriptionMonthlyTotal")}: ${money(subscriptions.monthly)}`
      : "";
  }
  els.fundRoleFilter.querySelectorAll("[data-role-filter]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.roleFilter === availableRoleFilter));
  });

  const query = els.fundSearchInput.value.trim().toLowerCase();
  const roleFilteredFunds = availableRoleFilter === "all"
    ? month.funds
    : month.funds.filter(fund => normalizeCategoryRole(fund.role) === availableRoleFilter);
  const funds = query
    ? roleFilteredFunds.filter(fund => fund.name.toLowerCase().includes(query))
    : roleFilteredFunds;
  const allCards = funds.map(fund => {
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
      role: normalizeCategoryRole(fund.role),
      health: fundHealth(progress),
      updatedAt: fundUpdatedAt(fund),
      isDepleted: balance <= 0
    };
  });
  els.fundSortSelect.value = state.fundSort || DEFAULT_FUND_SORT;
  els.fundSearchResults.hidden = true;

  function renderFundCard({ fund, spent, balance, progress, health, isDepleted, role }) {
    const secondaryText = role === "fixed" && fund.isSubscription
      ? subscriptionMetaText(fund)
      : `${t("spent")} ${money(spent)}`;
    const footLeft = role === "fixed"
      ? `${t("reserved")} ${money(balance)}`
      : role === "savings"
        ? `${t("saved")} ${money(balance)}`
        : `${t("available")} ${money(balance)}`;
    const footRight = role === "savings"
      ? `${t("allocatedThisMonth")} ${money(fund.allocation)}`
      : secondaryText;
    return `
      <article class="fund-card health-${health} role-${role} ${isDepleted ? "is-depleted" : ""} ${fund.pinned ? "is-pinned" : ""}" data-id="${fund.id}" data-fund-name="${escapeAttr(fund.name)}" data-action="view-fund" draggable="true">
        <div class="fund-head">
          <span class="name">${escapeHtml(fund.name)}</span>
          <button type="button" class="pin-btn" data-action="toggle-fund-pin" data-id="${fund.id}" aria-pressed="${fund.pinned ? "true" : "false"}" aria-label="${fund.pinned ? t("unpin") : t("pin")} ${escapeAttr(fund.name)}">${fund.pinned ? "★" : "☆"}</button>
          <span class="amount ${balance < 0 ? "is-negative" : ""}">${money(balance)}</span>
        </div>
        <div class="fund-progress" aria-label="${escapeHtml(fund.name)} balance progress ${Math.round(progress)}%">
          <span style="--progress:${progress}%"></span>
          <small>${Math.round(progress)}%</small>
        </div>
        <div class="fund-foot">
          <span>${escapeHtml(footLeft)}</span>
          <span>${escapeHtml(footRight)}</span>
        </div>
      </article>
    `;
  }

  function roleGroupLabel(role) {
    if (role === "spending") return t("spendingFunds");
    if (role === "fixed") return t("fixedReserved");
    return t("savings");
  }

  function emptyRoleMessage(role) {
    if (role === "fixed") return t("noFixedCategories");
    if (role === "savings") return t("noSavingsCategories");
    return t("noSpendingCategories");
  }

  function renderSortedCardGroup(cards, showEmpty = false, role = availableRoleFilter) {
    const pinnedCards = sortFundCards(cards.filter(item => item.fund.pinned));
    const availableCards = sortFundCards(cards.filter(item => !item.fund.pinned && !item.isDepleted));
    const depletedCards = sortFundCards(cards.filter(item => !item.fund.pinned && item.isDepleted));
    const markup = [
      pinnedCards.map(renderFundCard).join(""),
      availableCards.map(renderFundCard).join(""),
      depletedCards.length
        ? `
          <div class="fund-group-label fund-subgroup-label">
            <span>${t("depleted")}</span>
            <small>${depletedCards.length}</small>
          </div>
          ${depletedCards.map(renderFundCard).join("")}
        `
        : ""
    ].join("");
    if (markup.trim()) return markup;
    return showEmpty ? `<p class="empty">${emptyRoleMessage(role)}</p>` : "";
  }

  function renderRoleGroup(role) {
    const roleCards = allCards.filter(item => item.role === role);
    if (!roleCards.length) return "";
    return `
      <div class="fund-group-label role-group-label">
        <span>${roleGroupLabel(role)}</span>
        <small>${roleCards.length}</small>
      </div>
      ${renderSortedCardGroup(roleCards, false, role)}
    `;
  }

  const listMarkup = availableRoleFilter === "all"
    ? ["spending", "fixed", "savings"].map(renderRoleGroup).join("")
    : renderSortedCardGroup(allCards, true, availableRoleFilter);

  els.fundList.innerHTML = listMarkup.trim()
    ? listMarkup
    : `<p class="empty">${month.funds.length ? t("noMatchingFund") : t("noFundAccounts")}</p>`;
}

function renderFundSearchResults() {
  const query = els.fundSearchInput.value.trim().toLowerCase();
  const sourceFunds = availableRoleFilter === "all"
    ? currentMonth().funds
    : currentMonth().funds.filter(fund => normalizeCategoryRole(fund.role) === availableRoleFilter);
  const matches = sourceFunds
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
    : `<div class="search-empty">${t("noMatchingFund")}</div>`;
}

function startFundDrag(event) {
  const card = event.target.closest(".fund-card");
  if (!card) return;
  draggedFundName = card.dataset.fundName;
  card.classList.add("is-dragging");
  els.fundList.classList.add("is-reordering");
  document.body.classList.add("is-fund-dragging");
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", draggedFundName);
}

function moveFundDrag(event) {
  if (!draggedFundName) return;
  const target = event.target.closest(".fund-card");
  if (!target || target.dataset.fundName === draggedFundName) return;
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

function dropFundDrag(event) {
  const target = event.target.closest(".fund-card");
  if (!target || !draggedFundName || target.dataset.fundName === draggedFundName) return;
  event.preventDefault();
  reorderFundWithinDisplayGroup(draggedFundName, target.dataset.fundName);
}

function endFundDrag() {
  draggedFundName = null;
  els.fundList.classList.remove("is-reordering");
  document.body.classList.remove("is-fund-dragging");
  els.fundList.querySelectorAll(".is-dragging").forEach(card => card.classList.remove("is-dragging"));
}

function reorderFundWithinDisplayGroup(sourceName, targetName) {
  const sourceFund = currentMonth().funds.find(fund => fund.name === sourceName);
  const targetFund = currentMonth().funds.find(fund => fund.name === targetName);
  if (!sourceFund || !targetFund || fundDisplayGroup(sourceFund) !== fundDisplayGroup(targetFund)) return;

  ensureFundOrderIncludesCurrentCategories();
  const order = [...state.fundOrder];
  const sourceIndex = order.indexOf(sourceName);
  const targetIndex = order.indexOf(targetName);
  if (sourceIndex < 0 || targetIndex < 0) return;

  order.splice(sourceIndex, 1);
  order.splice(targetIndex, 0, sourceName);
  state.fundOrder = order;
  state.fundSort = MANUAL_FUND_SORT;
  saveState();
  renderFunds();
}

function startTouchFundDrag(event) {
  if (event.pointerType === "mouse") return;
  const card = event.target.closest(".fund-card");
  if (!card || event.target.closest("button")) return;
  touchFundDrag = {
    sourceName: card.dataset.fundName,
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    active: false
  };
  card.setPointerCapture?.(event.pointerId);
}

function moveTouchFundDrag(event) {
  if (!touchFundDrag || event.pointerId !== touchFundDrag.pointerId) return;
  const distance = Math.hypot(event.clientX - touchFundDrag.startX, event.clientY - touchFundDrag.startY);
  if (!touchFundDrag.active && distance < 12) return;

  touchFundDrag.active = true;
  draggedFundName = touchFundDrag.sourceName;
  els.fundList.classList.add("is-reordering");
  document.body.classList.add("is-fund-dragging");
  const sourceCard = els.fundList.querySelector(`[data-fund-name="${cssEscape(touchFundDrag.sourceName)}"]`);
  sourceCard?.classList.add("is-dragging");
  event.preventDefault();
}

function finishTouchFundDrag(event) {
  if (!touchFundDrag || event.pointerId !== touchFundDrag.pointerId) return;
  if (touchFundDrag.active) {
    suppressFundClick = true;
    window.setTimeout(() => {
      suppressFundClick = false;
    }, 120);
    const target = document.elementFromPoint(event.clientX, event.clientY)?.closest(".fund-card");
    if (target && target.dataset.fundName !== touchFundDrag.sourceName) {
      reorderFundWithinDisplayGroup(touchFundDrag.sourceName, target.dataset.fundName);
    }
    event.preventDefault();
  }
  cancelTouchFundDrag();
}

function cancelTouchFundDrag() {
  touchFundDrag = null;
  endFundDrag();
}

function cssEscape(value) {
  return window.CSS?.escape ? CSS.escape(value) : String(value).replace(/"/g, '\\"');
}

function fundDisplayGroup(fund) {
  const role = normalizeCategoryRole(fund.role);
  if (fund.pinned) return `${role}:pinned`;
  return `${role}:${balanceFor(fund) <= 0 ? "depleted" : "available"}`;
}

function renderDetail() {
  const fund = selectedFund();
  if (!fund) {
    els.detailExpenseTable.innerHTML = "";
    return;
  }

  const spent = expenseTotalFor(fund.name);
  const records = categoryRecordsFor(fund).sort(compareDetailRecords);

  els.detailFundName.textContent = fund.name;
  els.detailBalance.textContent = money(balanceFor(fund));
  els.detailStart.textContent = money(fund.start);
  els.detailAllocation.textContent = money(fund.allocation);
  els.detailSpent.textContent = money(spent);
  els.detailRoleLabel.textContent = t("categoryRole");
  els.detailRoleValue.textContent = categoryRoleLabel(fund.role);
  els.detailSubscriptionMeta.textContent = subscriptionMetaText(fund);
  els.detailSubscriptionMeta.hidden = !fund.isSubscription;
  els.detailExpenseTable.innerHTML = records.length
    ? records.map(record => `
      <tr class="${record.editable ? "clickable-row" : ""}" ${record.editable ? `data-action="edit-expense" data-id="${record.id}" tabindex="0" aria-label="${escapeAttr(t("editRecord", fund.name, money(Math.abs(record.amount))))}"` : ""}>
        <td>${escapeHtml(record.date)}</td>
        <td>${escapeHtml(categoryEventTypeLabel(record.type))}</td>
        <td>${escapeHtml(record.note || "-")}</td>
        <td class="number ${record.amount < 0 ? "is-negative" : "is-positive"}">${signedMoney(record.amount)}</td>
      </tr>
    `).join("")
    : `<tr><td colspan="4" class="empty">${t("noExpensesInFund")}</td></tr>`;
}

function categoryRecordsFor(fund) {
  const month = currentMonth();
  const records = [];

  if (Number(fund.start || 0) !== 0) {
    records.push({
      id: `start:${fund.id}`,
      date: `${state.currentMonth}-01`,
      type: "starting-balance",
      note: "",
      amount: Number(fund.start || 0),
      createdAt: fallbackTimestamp(`${state.currentMonth}-01`),
      editable: false
    });
  }

  (month.categoryEvents || [])
    .filter(event => event.category === fund.name)
    .forEach(event => {
      records.push({
        ...event,
        amount: Number(event.amount || 0),
        editable: false
      });
    });

  month.expenses
    .filter(expense => expense.category === fund.name)
    .forEach(expense => {
      records.push({
        id: expense.id,
        date: expense.date,
        type: expense.projectId ? "project-settlement" : "expense",
        note: expense.note || "",
        amount: -Number(expense.amount || 0),
        createdAt: expense.createdAt || fallbackTimestamp(expense.date),
        updatedAt: expense.updatedAt || expense.createdAt || fallbackTimestamp(expense.date),
        editable: true
      });
    });

  return records;
}

function compareDetailRecords(a, b) {
  const direction = detailExpenseSort.direction === "asc" ? 1 : -1;
  if (detailExpenseSort.field === "amount") {
    const amountDiff = a.amount - b.amount;
    if (amountDiff !== 0) return amountDiff * direction;
    return compareRecordTime(a, b);
  }
  const dateDiff = a.date.localeCompare(b.date);
  if (dateDiff !== 0) return dateDiff * direction;
  return recordTimeKey(a).localeCompare(recordTimeKey(b)) * direction;
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

function renderRecordFilter() {
  const validValues = ["All", "Income", "Expenses", ...currentMonth().funds.map(fund => `category:${fund.name}`)];
  if (!validValues.includes(recordFilterValue)) recordFilterValue = "All";

  els.recordFilterBtn.textContent = t("filter");
  els.recordFilterBtn.title = recordFilterLabel(recordFilterValue);
  els.recordFilterPanel.innerHTML = [
    renderRecordFilterGroup("", [
      { value: "All", label: t("allRecords") }
    ]),
    renderRecordFilterGroup(t("type"), [
      { value: "Income", label: t("income") },
      { value: "Expenses", label: t("expenses") }
    ]),
    renderRecordFilterGroup(t("expenseFunds"), currentMonth().funds.map(fund => ({
      value: `category:${fund.name}`,
      label: fund.name
    })))
  ].join("");
  els.recordFilterBtn.setAttribute("aria-expanded", String(!els.recordFilterPanel.hidden));
}

function renderRecords() {
  const filter = recordFilterValue || "All";
  const query = els.recordSearchInput.value.trim().toLowerCase();
  const records = unifiedRecords()
    .filter(record => recordMatchesFilter(record, filter))
    .filter(record => recordMatchesSearch(record, query))
    .sort(compareRecords);

  els.recordTable.innerHTML = records.length
    ? records.map(record => `
      <tr class="clickable-row ${record.kind === "income" ? "income-row" : "expense-row"}" data-action="edit-record" data-kind="${record.kind}" data-id="${record.id}" tabindex="0" aria-label="${escapeAttr(t("editRecord", record.category, money(record.amount)))}">
        <td>${escapeHtml(record.date)}</td>
        <td>${escapeHtml(record.category)}</td>
        <td>${escapeHtml(record.note || "")}</td>
        <td class="number">${record.kind === "income" ? "+" : "-"}${money(record.amount)}</td>
      </tr>
    `).join("")
    : `<tr><td colspan="4" class="empty">${t("noMatchingRecords")}</td></tr>`;
}

function renderRecordFilterGroup(label, items) {
  if (!items.length) return "";
  return `
    <div class="record-filter-group">
      ${label ? `<span>${escapeHtml(label)}</span>` : ""}
      ${items.map(item => `
        <button type="button" class="${item.value === recordFilterValue ? "active" : ""}" data-action="set-record-filter" data-filter="${escapeAttr(item.value)}">
          ${escapeHtml(item.label)}
        </button>
      `).join("")}
    </div>
  `;
}

function recordFilterLabel(value) {
  if (value === "Income") return t("income");
  if (value === "Expenses") return t("expenses");
  if (value.startsWith("category:")) return value.slice(9);
  return t("allRecords");
}

function toggleRecordFilterMenu() {
  const isHidden = els.recordFilterPanel.hidden;
  if (isHidden) {
    positionRecordFilterPanel();
    els.recordFilterPanel.hidden = false;
    els.recordFilterBtn.setAttribute("aria-expanded", "true");
    return;
  }
  closeRecordFilterMenu();
}

function closeRecordFilterMenu() {
  els.recordFilterPanel.hidden = true;
  els.recordFilterBtn.setAttribute("aria-expanded", "false");
}

function positionRecordFilterPanel() {
  const rect = els.recordFilterBtn.getBoundingClientRect();
  const margin = 14;
  const width = Math.min(280, window.innerWidth - margin * 2);
  const left = Math.min(Math.max(margin, rect.left), window.innerWidth - width - margin);
  const bottomReserve = 140;
  const maxHeight = Math.max(180, window.innerHeight - rect.bottom - bottomReserve);
  els.recordFilterPanel.style.width = `${width}px`;
  els.recordFilterPanel.style.left = `${left}px`;
  els.recordFilterPanel.style.top = `${rect.bottom + 8}px`;
  els.recordFilterPanel.style.maxHeight = `${maxHeight}px`;
}

function unifiedRecords() {
  const month = currentMonth();
  return [
    ...month.incomes.map(income => ({
      id: income.id,
      kind: "income",
      date: income.date || `${state.currentMonth}-01`,
      category: t("income"),
      note: income.name,
      amount: Number(income.amount || 0),
      createdAt: income.createdAt,
      updatedAt: income.updatedAt
    })),
    ...month.expenses.map(expense => ({
      id: expense.id,
      kind: "expense",
      date: expense.date,
      category: expense.category,
      note: expense.note || "",
      amount: Number(expense.amount || 0),
      createdAt: expense.createdAt,
      updatedAt: expense.updatedAt
    }))
  ];
}

function compareRecords(a, b) {
  const dateDiff = b.date.localeCompare(a.date);
  if (dateDiff !== 0) return dateDiff;
  if (a.kind !== b.kind) return a.kind === "expense" ? -1 : 1;
  const timeDiff = compareRecordTime(a, b);
  if (timeDiff !== 0) return timeDiff;
  return b.amount - a.amount;
}

function compareExpensesByLedgerOrder(a, b) {
  const dateDiff = b.date.localeCompare(a.date);
  if (dateDiff !== 0) return dateDiff;
  const timeDiff = compareRecordTime(a, b);
  if (timeDiff !== 0) return timeDiff;
  const amountDiff = Number(b.amount || 0) - Number(a.amount || 0);
  if (amountDiff !== 0) return amountDiff;
  return `${a.category || ""}${a.note || ""}`.localeCompare(`${b.category || ""}${b.note || ""}`);
}

function compareRecordTime(a, b) {
  return recordTimeKey(b).localeCompare(recordTimeKey(a));
}

function recordTimeKey(record) {
  return record.createdAt || record.updatedAt || fallbackTimestamp(record.date);
}

function recordMatchesFilter(record, filter) {
  if (filter === "Income") return record.kind === "income";
  if (filter === "Expenses") return record.kind === "expense";
  if (filter.startsWith("category:")) return record.category === filter.slice(9);
  return true;
}

function recordMatchesSearch(record, query) {
  if (!query) return true;
  const haystack = [
    record.date,
    formatShortDate(record.date),
    record.kind,
    record.category,
    record.note,
    String(record.amount),
    money(record.amount)
  ].join(" ").toLowerCase();
  return haystack.includes(query);
}

function renderProjects() {
  const projects = visibleProjectsForMonth();
  const activeProjects = projects.filter(project => project.status !== "settled");
  const settledProjects = projects.filter(project => project.status === "settled");
  const sections = [
    { title: t("activeProjects"), items: activeProjects },
    { title: t("settledProjects"), items: settledProjects }
  ].filter(section => section.items.length);

  els.projectsList.innerHTML = sections.length
    ? sections.map(section => `
      <section class="project-group">
        <h3>${escapeHtml(section.title)}</h3>
        ${section.items.map(renderProjectCard).join("")}
      </section>
    `).join("")
    : `<p class="empty">${t("noProjects")}</p>`;
}

function renderProjectCard(project) {
  const total = projectTotal(project);
  const breakdown = projectBreakdown(project);
  const defaultFund = projectDefaultCategoryName(project);
  return `
    <article class="project-card ${project.status === "settled" ? "is-settled" : ""}" data-action="view-project" data-id="${project.id}">
      <div class="project-card-head">
        <div>
          <h3>${escapeHtml(project.name)}</h3>
        </div>
        <strong>${money(total)}</strong>
      </div>
      <div class="project-card-meta">
        <span>${escapeHtml(projectDateRange(project))}</span>
        <span>${escapeHtml(defaultFund || "-")}</span>
        <span>${escapeHtml(t("started"))} ${escapeHtml(formatMonthLabel(projectStartMonth(project)))}</span>
        <span>${project.status === "settled" ? t("settled") : t("active")}</span>
      </div>
      <div class="mini-breakdown">${renderAllocationBarSegments(breakdown, total)}</div>
    </article>
  `;
}

function renderProjectDetail() {
  const project = selectedProject();
  if (!project) return;

  const total = projectTotal(project);
  const breakdown = projectBreakdown(project);
  const isSettled = project.status === "settled";
  const entries = [...project.entries].sort((a, b) => b.date.localeCompare(a.date) || b.amount - a.amount);

  els.projectDetailName.textContent = project.name;
  els.projectDetailStatus.classList.toggle("is-active", !isSettled);
  els.projectDetailStatus.classList.toggle("is-settled", isSettled);
  els.projectDetailStatus.innerHTML = `<i></i><span>${isSettled ? t("settled") : t("active")}</span>`;
  els.projectDetailTotal.textContent = money(total);
  els.projectDetailDefaultFund.textContent = projectDefaultCategoryName(project) || "-";
  els.projectDetailDates.textContent = projectDateRange(project);
  els.projectDetailName.title = t("editProject");
  els.projectDetailMetaBtn.title = t("editProject");
  els.projectBreakdownBar.innerHTML = renderAllocationBarSegments(breakdown, total);
  els.projectBreakdownList.innerHTML = breakdown.length
    ? breakdown.map(item => `
      <div class="project-breakdown-row">
        <span><i style="--dot:${item.color}"></i>${escapeHtml(item.label)}</span>
        <strong>${money(item.amount)}</strong>
      </div>
    `).join("")
    : `<p class="empty compact-empty">${t("noProjectEntries")}</p>`;
  els.addProjectEntryBtn.hidden = isSettled;
  els.deleteProjectBtn.hidden = isSettled;
  els.deleteProjectBtn.disabled = isSettled;
  els.deleteProjectBtn.title = isSettled ? t("settledProjectDeleteDisabled") : t("deleteProject");
  els.settleProjectBtn.textContent = isSettled ? t("reopen") : t("settle");
  els.settleProjectBtn.disabled = !isSettled && total <= 0;
  els.settleProjectBtn.classList.toggle("primary-action", !isSettled);
  els.settleProjectBtn.classList.toggle("secondary-action", isSettled);

  els.projectEntriesList.innerHTML = entries.length
    ? entries.map(entry => {
      const categoryName = projectEntryCategoryName(entry, project) || t("other");
      return `
      <tr ${isSettled ? "" : `class="clickable-row" data-action="edit-project-entry" data-id="${entry.id}" data-kind="projectEntry" tabindex="0" aria-label="${escapeAttr(t("editRecord", categoryName, money(entry.amount)))}"`}>
        <td>${escapeHtml(formatShortDate(entry.date))}</td>
        <td>${escapeHtml(categoryName)}</td>
        <td>${escapeHtml(entry.note || "-")}</td>
        <td class="number">${money(entry.amount)}</td>
      </tr>
    `;
    }).join("")
    : `<tr><td colspan="4" class="empty">${isSettled ? t("projectSettledNote") : t("noProjectEntries")}</td></tr>`;
}

function projectTotal(project) {
  return project.entries.reduce((total, entry) => total + Number(entry.amount || 0), 0);
}

function projectBreakdown(project) {
  const colors = ["#ff3b30", "#ff8a1f", "#f5c400", "#34a853", "#0071e3", "#8e8e93"];
  const totals = new Map();
  project.entries.forEach(entry => {
    const key = projectEntryCategoryName(entry, project) || t("other");
    totals.set(key, (totals.get(key) || 0) + Number(entry.amount || 0));
  });
  return [...totals.entries()]
    .filter(([, amount]) => amount > 0)
    .map(([category, amount], index) => ({
      label: category,
      amount,
      category,
      fundId: currentMonth().funds.find(fund => fund.name === category)?.id || "",
      color: colors[index % colors.length]
    }));
}

function fundById(id, month = currentMonth()) {
  return month.funds.find(fund => fund.id === id) || null;
}

function fundByName(name, month = currentMonth()) {
  return month.funds.find(fund => fund.name === name) || null;
}

function fundNameById(id, month = currentMonth()) {
  return fundById(id, month)?.name || "";
}

function projectDefaultCategoryName(project, month = currentMonth()) {
  if (!project) return "";
  return fundNameById(project.defaultFundId, month) || project.defaultCategory || "";
}

function projectDefaultFundInCurrentMonth(project) {
  if (!project) return null;
  return fundById(project.defaultFundId) || fundByName(project.defaultCategory);
}

function projectEntryCategoryName(entry, project, month = currentMonth()) {
  if (!entry) return projectDefaultCategoryName(project, month);
  return fundNameById(entry.fundId, month) || entry.category || projectDefaultCategoryName(project, month);
}

function projectEntryFundInCurrentMonth(entry, project) {
  const categoryName = projectEntryCategoryName(entry, project);
  return fundById(entry?.fundId) || fundByName(categoryName) || projectDefaultFundInCurrentMonth(project);
}

function projectTypeLabel(type) {
  const labels = {
    travel: t("travel"),
    event: t("event"),
    shopping: t("shopping"),
    moving: t("moving"),
    other: t("other")
  };
  return labels[type] || labels.other;
}

function projectDateRange(project) {
  if (project.startDate && project.endDate && project.startDate !== project.endDate) {
    return `${formatShortDate(project.startDate)} - ${formatShortDate(project.endDate)}`;
  }
  return formatShortDate(project.startDate || project.endDate || "");
}

document.body.addEventListener("click", event => {
  const button = event.target.closest("[data-action]");
  if (!event.target.closest(".search-field")) {
    els.fundSearchResults.hidden = true;
  }
  if (!event.target.closest(".record-add-menu")) {
    closeAddRecordMenu();
  }
  if (!event.target.closest(".record-filter-menu")) {
    closeRecordFilterMenu();
  }
  if (!els.monthDialog.hidden && !event.target.closest("#monthForm") && !event.target.closest("#monthSelect")) {
    closeMonthDialog();
  }
  if (!button) return;

  const { action, id } = button.dataset;
  if (action === "switch-tab") showTab(button.dataset.tab);
  if (action === "set-record-filter") {
    recordFilterValue = button.dataset.filter || "All";
    closeRecordFilterMenu();
    renderRecordFilter();
    renderRecords();
  }
  if (action === "view-fund") {
    if (suppressFundClick) return;
    enterDetailFromCurrentTab();
    selectedFundId = id;
    showingAllocationDetail = false;
    allocationRowEdit = null;
    els.fundSearchResults.hidden = true;
    render();
    requestAnimationFrame(scrollPageTop);
  }
  if (action === "view-allocation-detail") {
    showAllocationDetail(false);
  }
  if (action === "view-project") {
    enterDetailFromCurrentTab();
    selectedProjectId = id;
    selectedFundId = null;
    showingAllocationDetail = false;
    render();
    requestAnimationFrame(scrollPageTop);
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
  if (action === "edit-record") openDialog(button.dataset.kind, id);
  if (action === "edit-income") openDialog("income", id);
  if (action === "delete-income") removeItem("incomes", id);
  if (action === "edit-fund") openDialog("fund", id);
  if (action === "delete-fund") removeItem("funds", id);
  if (action === "edit-expense") openDialog("expense", id);
  if (action === "edit-project-entry" && selectedProject()?.status !== "settled") openDialog("projectEntry", id);
  if (action === "sort-detail-expenses") toggleDetailExpenseSort(button.dataset.field);
});

document.body.addEventListener("keydown", event => {
  const row = event.target.closest(".clickable-row[data-action='edit-record'], .clickable-row[data-action='edit-expense'], .clickable-row[data-action='edit-project-entry'], .clickable-row[data-action='edit-inline-allocation']");
  if (!row || !["Enter", " "].includes(event.key)) return;
  event.preventDefault();
  if (row.dataset.action === "edit-inline-allocation") {
    startAllocationRowEdit(row.dataset.fundId);
    return;
  }
  if (row.dataset.action === "edit-project-entry" && selectedProject()?.status === "settled") return;
  openDialog(row.dataset.kind || (row.dataset.action === "edit-project-entry" ? "projectEntry" : "expense"), row.dataset.id);
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
  closeRecordFilterMenu();
  closeAddRecordMenu();
  const returnTab = detailReturnTab || "home";
  selectedFundId = null;
  selectedProjectId = null;
  allocationRowEdit = null;
  showingAllocationDetail = false;
  activeTab = returnTab;
  render();
  restoreTabScroll(returnTab);
}

function showAllocationDetail(edit = false) {
  if (!selectedFundId && !showingAllocationDetail) {
    enterDetailFromCurrentTab();
  }
  selectedFundId = null;
  showingAllocationDetail = true;
  allocationRowEdit = null;
  render();
  requestAnimationFrame(scrollPageTop);
}

function showTab(tab) {
  const nextTab = ["home", "records", "projects", "settings"].includes(tab) ? tab : "home";
  saveActiveTabScroll();
  closeRecordFilterMenu();
  closeAddRecordMenu();
  activeTab = nextTab;
  selectedFundId = null;
  selectedProjectId = null;
  allocationRowEdit = null;
  showingAllocationDetail = false;
  render();
  restoreTabScroll(nextTab);
}

function updateBottomNav() {
  els.bottomNav.querySelectorAll("[data-tab]").forEach(button => {
    const isActive = button.dataset.tab === activeTab;
    button.classList.toggle("active", isActive);
    if (isActive) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });
}

function scrollPageTop() {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
}

function currentScrollY() {
  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

function saveActiveTabScroll() {
  if (selectedFundId || showingAllocationDetail || selectedProjectId) return;
  tabScrollPositions[activeTab] = currentScrollY();
}

function enterDetailFromCurrentTab() {
  saveActiveTabScroll();
  detailReturnTab = activeTab;
}

function restoreTabScroll(tab) {
  const target = tabScrollPositions[tab] || 0;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.scrollTo(0, target);
    });
  });
}

function startDetailSwipe(event) {
  if ((!selectedFundId && !showingAllocationDetail && !selectedProjectId) || event.touches.length !== 1) return;
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
  if (!detailSwipeStart || (!selectedFundId && !showingAllocationDetail && !selectedProjectId) || event.changedTouches.length !== 1) {
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
  els.projectDetailView.classList.remove("is-leaving");
}

function toggleAddRecordMenu() {
  const willOpen = els.addRecordMenu.hidden;
  els.addRecordMenu.hidden = !willOpen;
  els.addRecordBtn.setAttribute("aria-expanded", String(willOpen));
}

function closeAddRecordMenu() {
  els.addRecordMenu.hidden = true;
  els.addRecordBtn.setAttribute("aria-expanded", "false");
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
    project: state.projects,
    projectEntry: selectedProject()?.entries || [],
    allocation: month.funds,
    quickAllocate: month.funds,
    transfer: month.funds,
    categoryRole: month.funds
  }[mode];
  const item = id ? source.find(entry => entry.id === id) : defaults;

  const titles = {
    income: id ? t("editIncome") : t("addIncome"),
    fund: id ? t("editFundDialog") : t("addFundDialog"),
    expense: id ? t("editExpense") : t("addExpense"),
    project: id ? t("editProject") : t("addProject"),
    projectEntry: id ? t("editProjectEntry") : t("addProjectEntry"),
    allocation: t("allocateIncome"),
    quickAllocate: t("allocateIncome"),
    transfer: t("moveFunds"),
    categoryRole: t("editCategorySettings")
  };
  els.dialogTitle.textContent = titles[mode];
  els.dialog.dataset.mode = mode;
  const canDelete = ["expense", "project", "fund"].includes(mode) && Boolean(id) && !(mode === "project" && item?.status === "settled");
  els.deleteDialogBtn.hidden = !canDelete;
  els.deleteDialogBtn.textContent = mode === "project" ? t("deleteProject") : mode === "fund" ? t("delete") : t("deleteExpense");
  els.fields.innerHTML = fieldTemplates(mode, item || {});
  if (!els.dialog.open) {
    lockBackgroundScroll();
    els.dialog.showModal();
    requestAnimationFrame(preventDialogInputFocus);
  }
}

function preventDialogInputFocus() {
  const active = document.activeElement;
  if (active && els.dialog.contains(active) && ["INPUT", "SELECT", "TEXTAREA"].includes(active.tagName)) {
    active.blur();
  }
  els.dialogTitle.focus({ preventScroll: true });
}

function fieldTemplates(mode, item) {
  if (mode === "income") {
    return `
      ${field(t("date"), "date", item.date || defaultEntryDateForCurrentMonth(), "date")}
      ${field(t("name"), "name", item.name || "", "text")}
      ${field(t("amount"), "amount", item.amount || "", "number")}
    `;
  }

  if (mode === "fund") {
    return `
      ${field(t("name"), "name", item.name || "", "text")}
    `;
  }

  if (mode === "categoryRole") {
    const role = normalizeCategoryRole(item.role);
    const billingCycle = normalizeBillingCycle(item.billingCycle);
    const dueDay = item.dueDay === null || item.dueDay === undefined ? "" : item.dueDay;
    return `
      <label class="field">${t("categoryRole")}
        <select name="role">
          ${CATEGORY_ROLES.map(value => `<option value="${value}" ${role === value ? "selected" : ""}>${categoryRoleLabel(value)}</option>`).join("")}
        </select>
      </label>
      <label class="checkbox-field">
        <input name="isSubscription" type="checkbox" ${item.isSubscription ? "checked" : ""}>
        <span>${t("isSubscription")}</span>
      </label>
      <label class="field">${t("billingCycle")}
        <select name="billingCycle">
          ${BILLING_CYCLES.map(value => `<option value="${value}" ${billingCycle === value ? "selected" : ""}>${billingCycleLabel(value)}</option>`).join("")}
        </select>
      </label>
      <label class="field">${t("expectedAmount")}
        <input name="expectedAmount" type="text" inputmode="decimal" autocomplete="off" value="${escapeAttr(item.expectedAmount || "")}" data-money-input>
      </label>
      <label class="field">${t("dueDay")}
        <input name="dueDay" type="text" inputmode="numeric" autocomplete="off" value="${escapeAttr(dueDay)}" placeholder="${escapeAttr(t("noDueDay"))}">
      </label>
    `;
  }

  if (mode === "project") {
    const selectedFund = projectDefaultFundInCurrentMonth(item);
    const funds = currentMonth().funds
      .map(fund => `<option value="${fund.id}" ${selectedFund?.id === fund.id ? "selected" : ""}>${escapeHtml(fund.name)}</option>`)
      .join("");
    return `
      ${field(t("name"), "name", item.name || "", "text")}
      <label class="field">${t("defaultFund")}
        <select name="defaultFundId">${funds}</select>
      </label>
      ${field(t("startDate"), "startDate", item.startDate || state.currentMonth + "-01", "date")}
      ${field(t("endDate"), "endDate", item.endDate || state.currentMonth + "-01", "date")}
    `;
  }

  if (mode === "projectEntry") {
    const project = selectedProject();
    const selectedFund = projectEntryFundInCurrentMonth(item, project);
    const funds = currentMonth().funds
      .map(fund => `<option value="${fund.id}" ${selectedFund?.id === fund.id ? "selected" : ""}>${escapeHtml(fund.name)}</option>`)
      .join("");
    return `
      ${field(t("date"), "date", item.date || defaultEntryDateForCurrentMonth(), "date")}
      <label class="field">${t("category")}
        <select name="fundId">${funds}</select>
      </label>
      ${field(t("note"), "note", item.note || "", "text")}
      ${field(t("amount"), "amount", item.amount || "", "number")}
    `;
  }

  if (mode === "allocation") {
    return renderAllocationEditor();
  }

  if (mode === "quickAllocate") {
    return renderQuickAllocateForm();
  }

  if (mode === "transfer") {
    const funds = currentMonth().funds
      .map(fund => `<option value="${fund.id}">${escapeHtml(fund.name)} · ${money(balanceFor(fund))}</option>`)
      .join("");
    return `
      <label class="field">${t("from")}
        <select name="fromFundId">${funds}</select>
      </label>
      <label class="field">${t("to")}
        <select name="toFundId">${funds}</select>
      </label>
      ${field(t("amount"), "amount", "", "number")}
    `;
  }

  const categories = currentMonth().funds
    .map(fund => `<option value="${escapeAttr(fund.name)}" ${item.category === fund.name ? "selected" : ""}>${escapeHtml(fund.name)} · ${money(balanceFor(fund))}</option>`)
    .join("");
  return `
    ${field(t("date"), "date", item.date || defaultEntryDateForCurrentMonth(), "date")}
    <label class="field">${t("category")}
      <select name="category">${categories}</select>
    </label>
    ${noteField(t("note"), item.note || "")}
    ${field(t("amount"), "amount", item.amount || "", "number")}
  `;
}

function renderAllocationEditor() {
  const totalIncome = sum(currentMonth().incomes);
  const funds = currentMonth().funds;
  return `
    <section class="quick-allocation-card">
      <h3>${t("quickAdd")}</h3>
      <div class="quick-allocation-grid">
        <label class="field compact">${t("category")}
          <select name="quickFundId">
            ${funds.map(fund => `<option value="${fund.id}">${escapeHtml(fund.name)}</option>`).join("")}
          </select>
        </label>
        <label class="field compact">${t("amount")}
          <input name="quickAmount" type="text" inputmode="decimal" autocomplete="off" data-money-input>
        </label>
        <button type="button" data-action="apply-quick-allocation">${t("add")}</button>
      </div>
    </section>

    <section class="allocation-editor-summary" data-total-income="${totalIncome}">
      <article>
        <span>${t("totalIncome")}</span>
        <strong>${money(totalIncome)}</strong>
      </article>
      <article>
        <span>${t("allocated")}</span>
        <strong id="allocationEditorAllocated">${money(sum(funds, "allocation"))}</strong>
      </article>
      <article>
        <span>${t("unallocated")}</span>
        <strong id="allocationEditorUnallocated">${money(unallocatedFor())}</strong>
      </article>
    </section>

    <div class="allocation-editor-table-wrap">
      <table class="allocation-editor-table">
        <thead>
          <tr>
            <th>${t("category")}</th>
            <th>${t("allocated")}</th>
            <th>${t("percentIncome")}</th>
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

function renderQuickAllocateForm() {
  const month = currentMonth();
  const funds = month.funds;
  const selected = funds[0];
  const unallocated = unallocatedFor(month);
  const before = selected ? balanceFor(selected) : 0;
  const options = funds
    .map(fund => `<option value="${fund.id}">${escapeHtml(fund.name)} · ${money(balanceFor(fund))}</option>`)
    .join("");

  return `
    <section class="quick-allocate-status">
      <article>
        <span>${t("unallocated")}</span>
        <strong data-quick-unallocated>${money(unallocated)}</strong>
      </article>
      <article>
        <span>${t("unallocatedAfter")}</span>
        <strong data-quick-unallocated-after>${money(unallocated)}</strong>
      </article>
    </section>
    <label class="field">${t("category")}
      <select name="fundId" data-quick-allocate-fund>${options}</select>
    </label>
    ${field(t("amount"), "amount", "", "number")}
    <section class="quick-allocate-preview">
      <article>
        <span>${t("before")}</span>
        <strong data-quick-before>${money(before)}</strong>
      </article>
      <article>
        <span>${t("after")}</span>
        <strong data-quick-after>${money(before)}</strong>
      </article>
    </section>
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

function noteField(label, value) {
  return `
    <label class="field note-autocomplete-field">${label}
      <input name="note" type="text" value="${escapeAttr(value)}" autocomplete="off" data-note-autocomplete required>
      <div class="note-suggestions" data-note-suggestions hidden></div>
    </label>
  `;
}

function updateNoteAutocomplete(event) {
  if (dialogMode !== "expense" || !event.target?.matches("[data-note-autocomplete]")) return;

  const panel = els.form.querySelector("[data-note-suggestions]");
  if (!panel) return;

  const suggestions = getNoteSuggestions(event.target.value);
  if (!suggestions.length) {
    hideNoteSuggestions();
    return;
  }

  panel.innerHTML = suggestions.map(suggestion => `
    <button type="button" class="note-suggestion" data-note="${escapeAttr(suggestion.note)}" data-category="${escapeAttr(suggestion.category)}">
      <span>${escapeHtml(suggestion.note)}</span>
      <small>${escapeHtml(suggestion.category)}</small>
    </button>
  `).join("");
  panel.hidden = false;
}

function applyNoteSuggestion(event) {
  const button = event.target.closest("[data-note][data-category]");
  if (!button || dialogMode !== "expense") return;

  const noteInput = els.form.elements.note;
  const categorySelect = els.form.elements.category;
  if (noteInput) noteInput.value = button.dataset.note;
  if (categorySelect && [...categorySelect.options].some(option => option.value === button.dataset.category)) {
    categorySelect.value = button.dataset.category;
  }
  hideNoteSuggestions();
}

function hideNoteSuggestions() {
  const panel = els.form.querySelector("[data-note-suggestions]");
  if (panel) {
    panel.hidden = true;
    panel.innerHTML = "";
  }
}

function getNoteSuggestions(query) {
  const normalizedQuery = normalizeAutocompleteText(query);
  if (!normalizedQuery) return [];

  const currentCategories = new Set(currentMonth().funds.map(fund => fund.name));
  const notes = new Map();

  Object.values(state.months || {}).forEach(month => {
    (month.expenses || []).forEach(expense => {
      const note = String(expense.note || "").trim();
      const category = expense.category;
      if (!note || !category || !currentCategories.has(category)) return;

      const normalizedNote = normalizeAutocompleteText(note);
      if (!normalizedNote || !normalizedNote.includes(normalizedQuery)) return;

      const key = normalizedNote;
      const timestamp = Date.parse(expense.updatedAt || expense.createdAt || fallbackTimestamp(expense.date));
      const entry = notes.get(key) || {
        note,
        normalizedNote,
        count: 0,
        latest: 0,
        categories: new Map()
      };
      entry.count += 1;
      entry.latest = Math.max(entry.latest, Number.isFinite(timestamp) ? timestamp : 0);
      entry.note = note.length < entry.note.length ? note : entry.note;

      const categoryEntry = entry.categories.get(category) || { category, count: 0, latest: 0 };
      categoryEntry.count += 1;
      categoryEntry.latest = Math.max(categoryEntry.latest, Number.isFinite(timestamp) ? timestamp : 0);
      entry.categories.set(category, categoryEntry);
      notes.set(key, entry);
    });
  });

  return [...notes.values()]
    .map(entry => {
      const category = [...entry.categories.values()]
        .sort((a, b) => b.count - a.count || b.latest - a.latest || a.category.localeCompare(b.category))[0]?.category || "";
      return {
        note: entry.note,
        category,
        count: entry.count,
        latest: entry.latest,
        rank: noteMatchRank(entry.normalizedNote, normalizedQuery)
      };
    })
    .sort((a, b) => b.rank - a.rank || b.latest - a.latest || b.count - a.count || a.note.localeCompare(b.note))
    .slice(0, 5);
}

function normalizeAutocompleteText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, " ")
    .trim();
}

function noteMatchRank(note, query) {
  if (note === query) return 4;
  if (note.startsWith(query)) return 3;
  if (note.split(" ").some(part => part.startsWith(query))) return 2;
  return 1;
}

function saveEntry(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(els.form).entries());
  const month = currentMonth();

  if (dialogMode === "allocation") {
    saveAllocationEditor(data);
    return;
  }

  if (dialogMode === "quickAllocate") {
    saveQuickAllocate(data);
    return;
  }

  if (dialogMode === "transfer") {
    transferAllocation(data);
    return;
  }

  if (dialogMode === "categoryRole") {
    saveCategorySettings(data);
    return;
  }

  if (dialogMode === "project") {
    saveProject(data);
    return;
  }

  if (dialogMode === "projectEntry") {
    saveProjectEntry(data);
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
    alert(t("validAmount"));
    return;
  }
  if (dialogMode === "fund" && !payload.name) return;

  let affectsLaterMonthStarts = dialogMode === "expense";
  let fundRename = null;
  if (dialogMode === "fund" && editingId) {
    const previous = month[key].find(item => item.id === editingId);
    if (previous && previous.name !== payload.name) {
      affectsLaterMonthStarts = true;
      fundRename = { previousName: previous.name, nextName: payload.name };
    }
  }

  const needsLaterMonthConfirm = dialogMode === "fund" && Boolean(fundRename);
  if (affectsLaterMonthStarts && needsLaterMonthConfirm && !confirmLaterMonthUpdate()) return;

  if (editingId) {
    const index = month[key].findIndex(item => item.id === editingId);
    const previous = month[key][index];
    month[key][index] = { ...month[key][index], ...payload };
    month[key][index].createdAt = month[key][index].createdAt || fallbackTimestamp(month[key][index].date || `${state.currentMonth}-01`);
    month[key][index].updatedAt = nowStamp();
    if (dialogMode === "expense") {
      markFundUpdatedByName(previous.category);
      markFundUpdatedByName(payload.category);
    }
    if (dialogMode === "fund" && fundRename) {
      renameCategoryRecords(fundRename.previousName, fundRename.nextName);
      month[key][index].updatedAt = nowStamp();
    }
  } else {
    const stamp = nowStamp();
    const defaults = dialogMode === "fund" ? { start: 0, allocation: 0, target: 0 } : {};
    const created = { id: crypto.randomUUID(), ...defaults, ...payload, createdAt: stamp, updatedAt: stamp };
    if (dialogMode === "expense") {
      markFundUpdatedByName(payload.category);
    }
    month[key].push(created);
    if (dialogMode === "fund") {
      addCategoryToManualOrder(created.name);
      syncCreatedCategoryToLaterMonths(created);
      affectsLaterMonthStarts = true;
    }
  }

  if (affectsLaterMonthStarts) {
    cascadeLaterMonthStartsQuietly();
  }
  markFinancialDirty();
  saveState();
  els.dialog.close();
  render();
}

function saveCategorySettings(data) {
  const fund = currentMonth().funds.find(item => item.id === editingId);
  if (!fund) return;

  const expectedAmount = parseMoneyInput(data.expectedAmount);
  if (String(data.expectedAmount || "").trim() && expectedAmount === null) {
    alert(t("validAmount"));
    return;
  }
  const dueDayText = String(data.dueDay || "").trim();
  const dueDay = dueDayText ? Number(dueDayText) : null;
  if (dueDay !== null && (!Number.isInteger(dueDay) || dueDay < 1 || dueDay > 31)) {
    alert(t("validDueDay"));
    return;
  }

  const categoryName = fund.name;
  const metadata = {
    role: normalizeCategoryRole(data.role),
    isSubscription: data.isSubscription === "on",
    billingCycle: normalizeBillingCycle(data.billingCycle),
    expectedAmount: normalizeMoney(expectedAmount || 0),
    dueDay
  };

  sortedMonthKeys()
    .filter(key => key >= state.currentMonth)
    .forEach(key => {
      const month = state.months[key];
      month.funds
        .filter(item => item.name === categoryName)
        .forEach(item => {
          Object.assign(item, metadata, { updatedAt: nowStamp() });
        });
    });

  markFinancialDirty();
  saveState();
  els.dialog.close();
  render();
}

function renameCategoryRecords(previousName, nextName) {
  if (!previousName || !nextName || previousName === nextName) return;
  renameCategoryInManualOrder(previousName, nextName);

  sortedMonthKeys()
    .filter(key => key >= state.currentMonth)
    .forEach(key => {
      const month = state.months[key];
      month.funds.forEach(fund => {
        if (fund.name === previousName) {
          fund.name = nextName;
          fund.updatedAt = nowStamp();
        }
      });
      month.expenses.forEach(expense => {
        if (expense.category === previousName) {
          expense.category = nextName;
          expense.updatedAt = nowStamp();
        }
      });
      (month.categoryEvents || []).forEach(event => {
        if (event.category === previousName) {
          event.category = nextName;
          event.updatedAt = nowStamp();
        }
        if (event.fromCategory === previousName) {
          event.fromCategory = nextName;
          event.updatedAt = nowStamp();
        }
        if (event.toCategory === previousName) {
          event.toCategory = nextName;
          event.updatedAt = nowStamp();
        }
      });
    });

  state.projects.forEach(project => {
    project.entries?.forEach(entry => {
      const entryMonth = (entry.date || project.monthId || "").slice(0, 7);
      if (entry.category === previousName && entryMonth >= state.currentMonth) {
        entry.category = nextName;
        entry.updatedAt = nowStamp();
        project.updatedAt = nowStamp();
      }
    });
  });
}

function deleteCurrentDialogItem() {
  if (dialogMode === "expense") {
    deleteCurrentExpense();
    return;
  }
  if (dialogMode === "project") {
    deleteCurrentProject();
    return;
  }
  if (dialogMode === "fund") {
    deleteCurrentCategory();
  }
}

function deleteCurrentCategory() {
  if (dialogMode !== "fund" || !editingId) return;

  const fund = currentMonth().funds.find(item => item.id === editingId);
  if (!fund) return;

  const hasActivity = categoryHasCurrentOrLaterActivity(fund.name);
  const message = hasActivity
    ? t("deleteCategoryWithActivityConfirm", fund.name)
    : t("deleteCategoryConfirm", fund.name);
  if (!window.confirm(message)) return;

  removeCategoryFromCurrentAndLaterMonths(fund.name);
  cascadeLaterMonthStartsQuietly();
  markFinancialDirty();
  saveState();
  els.dialog.close();
  render();
}

function categoryHasCurrentOrLaterActivity(categoryName) {
  const monthHasActivity = sortedMonthKeys()
    .filter(key => key >= state.currentMonth)
    .some(key => {
      const month = state.months[key];
      const fund = month.funds.find(item => item.name === categoryName);
      const fundHasMoney = fund && (
        Number(fund.start || 0) !== 0 ||
        Number(fund.allocation || 0) !== 0 ||
        balanceFor(fund, month) !== 0
      );
      return fundHasMoney ||
        month.expenses.some(expense => expense.category === categoryName) ||
        (month.categoryEvents || []).some(event => (
          event.category === categoryName ||
          event.fromCategory === categoryName ||
          event.toCategory === categoryName
        ));
    });

  if (monthHasActivity) return true;

  return state.projects.some(project => (project.entries || []).some(entry => {
    const entryMonth = (entry.date || project.monthId || "").slice(0, 7);
    return entry.category === categoryName && entryMonth >= state.currentMonth;
  }));
}

function removeCategoryFromCurrentAndLaterMonths(categoryName) {
  removeCategoryFromManualOrder(categoryName);
  sortedMonthKeys()
    .filter(key => key >= state.currentMonth)
    .forEach(key => {
      const month = state.months[key];
      month.funds = month.funds.filter(fund => fund.name !== categoryName);
    });
}

function deleteCurrentExpense() {
  if (dialogMode !== "expense" || !editingId) return;

  const month = currentMonth();
  const expense = month.expenses.find(item => item.id === editingId);
  if (!expense) return;

  const confirmMessage = expense.projectId
    ? t("deleteSettledProjectExpenseConfirm")
    : t("deleteExpenseConfirm");
  if (!window.confirm(confirmMessage)) return;

  month.expenses = month.expenses.filter(item => item.id !== editingId);
  markFundUpdatedByName(expense.category);
  unlinkSettlementExpense(expense);
  cascadeLaterMonthStartsQuietly();
  markFinancialDirty();
  saveState();
  els.dialog.close();
  dialogMode = null;
  editingId = null;
  render();
}

function deleteCurrentProject() {
  if (dialogMode !== "project" || !editingId) return;
  deleteProjectById(editingId, true);
}

function deleteSelectedProject() {
  const project = selectedProject();
  if (!project) return;
  deleteProjectById(project.id, false);
}

function deleteProjectById(projectId, closeDialogAfterDelete) {
  const project = state.projects.find(item => item.id === projectId);
  if (!project) return;

  if (project.status === "settled") {
    showToast(t("settledProjectDeleteDisabled"));
    return;
  }

  if (!window.confirm(t("deleteProjectConfirm", project.name))) return;

  state.projects = state.projects.filter(item => item.id !== project.id);
  selectedProjectId = null;
  detailReturnTab = "projects";
  activeTab = "projects";

  markFinancialDirty();
  saveState();
  if (closeDialogAfterDelete) els.dialog.close();
  dialogMode = null;
  editingId = null;
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
    alert(t("validQuickAdd"));
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
  const unallocated = normalizeMoney(totalIncome - allocated);
  const allocatedEl = els.form.querySelector("#allocationEditorAllocated");
  const unallocatedEl = els.form.querySelector("#allocationEditorUnallocated");

  if (allocatedEl) allocatedEl.textContent = money(allocated);
  if (unallocatedEl) {
    unallocatedEl.textContent = money(unallocated);
    unallocatedEl.classList.toggle("is-negative", unallocated < 0);
  }
}

function updateQuickAllocatePreview() {
  if (dialogMode !== "quickAllocate") return;
  const month = currentMonth();
  const data = Object.fromEntries(new FormData(els.form).entries());
  const fund = month.funds.find(item => item.id === data.fundId) || month.funds[0];
  const amount = parseMoneyInput(data.amount) || 0;
  const unallocated = unallocatedFor(month);
  const before = fund ? balanceFor(fund) : 0;
  const after = before + amount;
  const unallocatedAfter = normalizeMoney(unallocated - amount);

  const unallocatedEl = els.form.querySelector("[data-quick-unallocated]");
  const unallocatedAfterEl = els.form.querySelector("[data-quick-unallocated-after]");
  const beforeEl = els.form.querySelector("[data-quick-before]");
  const afterEl = els.form.querySelector("[data-quick-after]");

  if (unallocatedEl) unallocatedEl.textContent = money(unallocated);
  if (unallocatedAfterEl) {
    unallocatedAfterEl.textContent = money(unallocatedAfter);
    unallocatedAfterEl.classList.toggle("is-negative", unallocatedAfter < 0);
  }
  if (beforeEl) beforeEl.textContent = money(before);
  if (afterEl) afterEl.textContent = money(after);
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
      alert(t("validAllocations"));
      return;
    }
    updates.push({ fund, amount });
  }

  const totalIncome = sum(currentMonth().incomes);
  const totalAllocated = updates.reduce((total, item) => total + item.amount, 0);
  const overAllocatedCents = moneyCents(totalAllocated) - moneyCents(totalIncome);
  if (overAllocatedCents > 0) {
    alert(t("overAllocated", money(centsToMoney(overAllocatedCents))));
    return;
  }

  const changed = updates.some(item => Number(item.fund.allocation || 0) !== item.amount);
  if (!changed) {
    els.dialog.close();
    render();
    return;
  }

  updates.forEach(item => {
    const previousAllocation = Number(item.fund.allocation || 0);
    if (Number(item.fund.allocation || 0) !== item.amount) {
      item.fund.allocation = normalizeMoney(item.amount);
      item.fund.updatedAt = nowStamp();
      addCategoryEvent({
        type: "allocation-adjustment",
        category: item.fund.name,
        amount: item.amount - previousAllocation,
        note: t("allocationChanged")
      });
    }
  });
  finishBalanceMutation();
}

function saveQuickAllocate(data) {
  const amount = parseMoneyInput(data.amount);
  const fund = currentMonth().funds.find(item => item.id === data.fundId);
  const unallocated = unallocatedFor();

  if (!fund || amount === null || moneyCents(amount) <= 0 || moneyCents(amount) > moneyCents(unallocated)) {
    alert(t("validQuickAllocate"));
    return;
  }

  fund.allocation = normalizeMoney(Number(fund.allocation || 0) + amount);
  fund.updatedAt = nowStamp();
  addCategoryEvent({
    type: "allocation-adjustment",
    category: fund.name,
    amount,
    note: t("allocationChanged")
  });
  finishBalanceMutation();
}

function transferAllocation(data) {
  const amount = parseMoneyInput(data.amount);
  const month = currentMonth();
  const fromFund = month.funds.find(item => item.id === data.fromFundId);
  const toFund = month.funds.find(item => item.id === data.toFundId);

  if (!fromFund || !toFund || fromFund.id === toFund.id || amount === null || amount <= 0) {
    alert(t("validTransfer"));
    return;
  }

  const fromAvailable = balanceFor(fromFund);
  if (amount > fromAvailable) {
    alert(t("moveLimit", money(fromAvailable), fromFund.name));
    return;
  }

  if (normalizeCategoryRole(fromFund.role) === "fixed") {
    showToast(t("fixedMoveReminder"));
  }

  const allocationMove = Math.min(Number(fromFund.allocation || 0), amount);
  const startMove = amount - allocationMove;
  fromFund.allocation = Number(fromFund.allocation || 0) - allocationMove;
  toFund.allocation = Number(toFund.allocation || 0) + allocationMove;
  fromFund.start = Number(fromFund.start || 0) - startMove;
  toFund.start = Number(toFund.start || 0) + startMove;
  fromFund.updatedAt = nowStamp();
  toFund.updatedAt = nowStamp();
  addCategoryEvent({
    type: "move-out",
    category: fromFund.name,
    fromCategory: fromFund.name,
    toCategory: toFund.name,
    amount: -amount,
    note: t("toCategoryNote", toFund.name)
  });
  addCategoryEvent({
    type: "move-in",
    category: toFund.name,
    fromCategory: fromFund.name,
    toCategory: toFund.name,
    amount,
    note: t("fromCategoryNote", fromFund.name)
  });
  finishBalanceMutation();
}

function saveProject(data) {
  const defaultFund = fundById(data.defaultFundId);
  const payload = {
    name: data.name.trim(),
    defaultFundId: data.defaultFundId,
    defaultCategory: defaultFund?.name || "",
    startDate: data.startDate,
    endDate: data.endDate
  };

  if (!payload.name || !payload.defaultFundId) return;

  if (editingId) {
    const project = state.projects.find(item => item.id === editingId);
    if (project) {
      Object.assign(project, payload, { updatedAt: nowStamp() });
    }
  } else {
    const project = {
      id: crypto.randomUUID(),
      type: "other",
      ...payload,
      monthId: state.currentMonth,
      startMonth: state.currentMonth,
      status: "active",
      entries: [],
      settlementExpenseIds: [],
      createdAt: nowStamp(),
      updatedAt: nowStamp()
    };
    state.projects.push(project);
    selectedProjectId = project.id;
    detailReturnTab = "projects";
    activeTab = "projects";
  }

  markFinancialDirty();
  saveState();
  els.dialog.close();
  render();
}

function saveProjectEntry(data) {
  const project = selectedProject();
  if (!project || project.status === "settled") return;

  const amount = parseMoneyInput(data.amount);
  if (amount === null || amount <= 0) {
    alert(t("validAmount"));
    return;
  }
  const fund = fundById(data.fundId) || fundByName(project.defaultCategory);
  if (!fund) return;

  const payload = {
    date: data.date,
    fundId: fund.id,
    category: fund.name,
    note: data.note.trim(),
    amount
  };

  if (editingId) {
    const index = project.entries.findIndex(entry => entry.id === editingId);
    if (index >= 0) {
      project.entries[index] = { ...project.entries[index], ...payload, updatedAt: nowStamp() };
    }
  } else {
    project.entries.push({ id: crypto.randomUUID(), ...payload, createdAt: nowStamp(), updatedAt: nowStamp() });
  }

  project.updatedAt = nowStamp();
  markFinancialDirty();
  saveState();
  els.dialog.close();
  render();
}

function settleOrReopenProject() {
  const project = selectedProject();
  if (!project) return;

  if (project.status === "settled") {
    reopenProject(project);
  } else {
    settleProject(project);
  }
}

function settleProject(project) {
  if (project.status === "settled" || (project.settlementExpenseIds || []).length) return;
  const breakdown = projectBreakdown(project);
  if (!breakdown.length) return;
  if (!window.confirm(t("settleProjectConfirm", project.name, breakdown.length))) return;

  const month = currentMonth();
  const settlementDate = defaultEntryDateForCurrentMonth();
  const createdIds = [];

  breakdown.forEach(item => {
    const fund = month.funds.find(entry => entry.id === item.fundId) || month.funds.find(entry => entry.name === item.category);
    if (!fund) return;
    const stamp = nowStamp();
    const expense = {
      id: crypto.randomUUID(),
      date: settlementDate,
      category: fund.name,
      note: project.name,
      amount: item.amount,
      projectId: project.id,
      createdAt: stamp,
      updatedAt: stamp
    };
    month.expenses.push(expense);
    createdIds.push(expense.id);
    markFundUpdatedByName(fund.name);
  });
  if (!createdIds.length) return;

  project.status = "settled";
  project.settlementExpenseIds = createdIds;
  project.settledMonth = state.currentMonth;
  project.settledAt = nowStamp();
  project.updatedAt = nowStamp();
  cascadeLaterMonthStartsQuietly();
  markFinancialDirty();
  saveState();
  render();
}

function reopenProject(project) {
  if (!window.confirm(t("reopenProjectConfirm", project.name))) return;

  const ids = new Set(project.settlementExpenseIds || []);
  const affectedMonths = new Set();
  Object.entries(state.months).forEach(([monthId, month]) => {
    month.expenses = month.expenses.filter(expense => {
      if (!ids.has(expense.id)) return true;
      markFundUpdatedByNameInMonth(month, expense.category);
      affectedMonths.add(monthId);
      return false;
    });
  });
  project.status = "active";
  project.settlementExpenseIds = [];
  project.settledMonth = "";
  project.settledAt = "";
  project.updatedAt = nowStamp();
  const cascadeFrom = [...affectedMonths].sort()[0] || state.currentMonth;
  cascadeLaterMonthStartsQuietly(cascadeFrom);
  markFinancialDirty();
  saveState();
  render();
}

function unlinkSettlementExpense(expense) {
  if (!expense?.projectId) return;
  const project = state.projects.find(item => item.id === expense.projectId);
  if (!project) return;
  project.settlementExpenseIds = (project.settlementExpenseIds || []).filter(id => id !== expense.id);
  project.updatedAt = nowStamp();
}

function markFundUpdatedByName(name) {
  markFundUpdatedByNameInMonth(currentMonth(), name);
}

function markFundUpdatedByNameInMonth(month, name) {
  const fund = month?.funds?.find(item => item.name === name);
  if (fund) fund.updatedAt = nowStamp();
}

function nowStamp() {
  return new Date().toISOString();
}

function fallbackTimestamp(date) {
  return `${date || "1970-01-01"}T00:00:00.000Z`;
}

function normalizePayload(mode, data) {
  if (mode === "income") {
    const amount = requireMoney(data.amount);
    return { date: data.date, name: data.name.trim(), amount };
  }
  if (mode === "fund") {
    return {
      name: data.name.trim()
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
  if (key === "funds" && removed) {
    const hasActivity = categoryHasCurrentOrLaterActivity(removed.name);
    const message = hasActivity
      ? t("deleteCategoryWithActivityConfirm", removed.name)
      : t("deleteCategoryConfirm", removed.name);
    if (!window.confirm(message)) return;

    removeCategoryFromCurrentAndLaterMonths(removed.name);
    cascadeLaterMonthStartsQuietly();
    markFinancialDirty();
    saveState();
    render();
    return;
  }

  const affectsLaterMonthStarts = Boolean((key === "expenses" || key === "funds") && removed);

  currentMonth()[key] = currentMonth()[key].filter(item => item.id !== id);
  if (key === "expenses" && removed) {
    markFundUpdatedByName(removed.category);
  }
  if (affectsLaterMonthStarts) {
    cascadeLaterMonthStartsQuietly();
  }
  if (removed) markFinancialDirty();
  saveState();
  render();
}

function openMonthDialog() {
  if (!els.monthDialog.hidden) {
    closeMonthDialog();
    return;
  }
  monthCalendarYear = Number(state.currentMonth.slice(0, 4));
  renderMonthCalendar();
  els.monthDialog.hidden = false;
}

function closeMonthDialog() {
  els.monthDialog.hidden = true;
}

function renderMonthCalendar() {
  const realMonthId = formatRealMonthId();
  const monthNames = Array.from({ length: 12 }, (_, index) =>
    new Date(monthCalendarYear, index, 1).toLocaleString(currentLanguage() === "zh" ? "zh-CN" : "en-US", { month: "short" })
  );

  els.monthCalendarTitle.textContent = String(monthCalendarYear);
  els.monthGrid.innerHTML = monthNames.map((name, index) => {
    const monthId = `${monthCalendarYear}-${String(index + 1).padStart(2, "0")}`;
    const exists = Boolean(state.months[monthId]);
    const selected = monthId === state.currentMonth;
    const isCurrentRealMonth = monthId === realMonthId;
    return `
      <button type="button" class="month-cell ${exists ? "exists" : "is-empty"} ${selected ? "selected" : ""} ${isCurrentRealMonth ? "is-real-current" : ""}" data-month-id="${monthId}" aria-label="${formatMonthLabel(monthId)}">
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
  const message = t("createMonth", formatMonthLabel(monthId), previousKey ? formatMonthLabel(previousKey) : "");

  if (!window.confirm(message)) return;
  createMonthRecord(monthId);
  switchMonth(monthId);
  closeMonthDialog();
}

function switchMonth(monthId) {
  state.currentMonth = monthId;
  selectedFundId = null;
  selectedProjectId = null;
  showingAllocationDetail = false;
  activeTab = "home";
  detailReturnTab = "home";
  tabScrollPositions.home = 0;
  tabScrollPositions.records = 0;
  tabScrollPositions.projects = 0;
  tabScrollPositions.settings = 0;
  saveState();
  render();
  requestAnimationFrame(scrollPageTop);
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
      createdAt: fallbackTimestamp(`${monthId}-01`),
      updatedAt: fund.updatedAt || ""
    })),
    expenses: [],
    categoryEvents: [],
    debts: []
  };
  cascadeLaterMonthStarts(monthId);
  markFinancialDirty();
  saveState();
}

function getNextMonthId(monthId) {
  const [year, month] = monthId.split("-").map(Number);
  const next = new Date(year, month, 1);
  return `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}`;
}

function formatMonthLabel(monthId) {
  const date = new Date(`${monthId}-01T00:00:00`);
  return date.toLocaleString(currentLanguage() === "zh" ? "zh-CN" : "en-US", { month: "long", year: "numeric" });
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
  state.lastBackupAt = new Date().toISOString();
  state.backupDirty = false;
  saveState();
  localStorage.setItem(LAST_BACKUP_KEY, state.lastBackupAt);
  localStorage.removeItem(DISMISSED_BACKUP_KEY);
  renderBackupReminder();
  renderBackupStatus();
}

function renderBackupReminder() {
  if (activeTab !== "home" || selectedFundId || showingAllocationDetail) {
    els.backupReminder.hidden = true;
    return;
  }

  const lastBackup = state.lastBackupAt || localStorage.getItem(LAST_BACKUP_KEY);
  const dismissedAt = localStorage.getItem(DISMISSED_BACKUP_KEY);
  const now = Date.now();
  const reminderMs = BACKUP_REMINDER_DAYS * 24 * 60 * 60 * 1000;
  const dismissedRecently = dismissedAt && now - Date.parse(dismissedAt) < 24 * 60 * 60 * 1000;
  const needsBackup = !lastBackup || now - Date.parse(lastBackup) > reminderMs;

  els.backupReminder.hidden = !needsBackup || dismissedRecently;
  if (!needsBackup || dismissedRecently) return;

  els.backupReminderText.textContent = lastBackup
    ? t("backupRecent", daysSince(lastBackup))
    : t("backupNever");
}

function renderBackupStatus() {
  if (!els.backupStatusText || !els.backupStatusValue) return;
  els.backupStatusText.textContent = state.backupDirty ? t("backupStatusDirty") : t("backupStatusClean");
  els.backupStatusValue.textContent = state.lastBackupAt
    ? `${t("lastBackup")}: ${formatShortDate(state.lastBackupAt.slice(0, 10))}`
    : t("neverBackedUp");
  els.backupStatusValue.classList.toggle("is-negative", Boolean(state.backupDirty));
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
      state.backupDirty = false;
      state.lastBackupAt = imported.lastBackupAt || imported.backupCreatedAt || new Date().toISOString();
      saveState();
      render();
    } catch {
      alert(t("importFailed"));
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}

async function checkForUpdates() {
  if (!("serviceWorker" in navigator)) {
    showToast(t("upToDate"));
    return;
  }

  showToast(t("checkingUpdates"));
  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) {
    showToast(t("upToDate"));
    return;
  }

  updateRegistration = registration;
  watchServiceWorkerRegistration(registration);

  try {
    await registration.update();
  } catch {
    showToast(t("upToDate"));
    return;
  }

  if (registration.waiting) {
    showUpdateBanner(registration);
    return;
  }

  const installing = registration.installing;
  if (installing) {
    waitForInstallingWorker(installing, registration, true);
    return;
  }

  window.setTimeout(() => {
    if (registration.waiting) {
      showUpdateBanner(registration);
    } else {
      showToast(t("upToDate"));
    }
  }, 1200);
}

function showUpdateBanner(registration) {
  updateRegistration = registration;
  els.updateBanner.hidden = false;
  showToast(t("updateAvailable"));
}

function activateWaitingServiceWorker() {
  const waitingWorker = updateRegistration?.waiting;
  if (!waitingWorker) {
    showToast(t("checkingUpdates"));
    checkForUpdates();
    return;
  }
  waitingWorker.postMessage({ type: "SKIP_WAITING" });
}

function watchServiceWorkerRegistration(registration) {
  if (!registration || registration.__moneyUpdateWatch) return;
  registration.__moneyUpdateWatch = true;

  if (registration.waiting) {
    showUpdateBanner(registration);
  }

  registration.addEventListener("updatefound", () => {
    const installing = registration.installing;
    if (installing) waitForInstallingWorker(installing, registration, false);
  });
}

function waitForInstallingWorker(worker, registration, notifyIfCurrent) {
  worker.addEventListener("statechange", () => {
    if (worker.state !== "installed") return;
    if (navigator.serviceWorker.controller) {
      showUpdateBanner(registration);
    } else if (notifyIfCurrent) {
      showToast(t("upToDate"));
    }
  });
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
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshingForUpdate) return;
    refreshingForUpdate = true;
    window.location.reload();
  });

  navigator.serviceWorker.register("./sw.js").then(registration => {
    updateRegistration = registration;
    watchServiceWorkerRegistration(registration);
  }).catch(() => {
    // Offline support is optional during local development.
  });
}

render();
registerServiceWorker();
