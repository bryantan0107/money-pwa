/* Keep itinerary text in the existing planText / dailyPlans fields. */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Itinerary = api;
})(typeof globalThis === "object" ? globalThis : this, function () {
  const escape = text => String(text).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  function validDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return false;
    const date = new Date(`${value}T12:00:00Z`);
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }
  function normalizePlans(value) {
    const seen = new Set();
    return (Array.isArray(value) ? value : []).map(item => ({
      date: typeof item?.date === "string" ? item.date : "",
      note: typeof item?.note === "string" ? item.note : ""
    })).filter(item => {
      // Retain even unusual legacy dates for the Other dates section.
      if (!/^\d{4}-\d{2}-\d{2}$/.test(item.date) || seen.has(item.date)) return false;
      seen.add(item.date); return true;
    });
  }
  function days(project) {
    if (!validDate(project?.startDate) || !validDate(project?.endDate) || project.startDate > project.endDate) return [];
    const start = Date.parse(`${project.startDate}T12:00:00Z`), end = Date.parse(`${project.endDate}T12:00:00Z`);
    const count = Math.min(Math.floor((end - start) / 86400000) + 1, 3660);
    return Array.from({ length: count }, (_, index) => new Date(start + index * 86400000).toISOString().slice(0, 10));
  }
  function otherPlans(project) {
    const visible = new Set(days(project));
    return normalizePlans(project.dailyPlans).filter(plan => !visible.has(plan.date) && plan.note.trim())
      .sort((a, b) => a.date.localeCompare(b.date));
  }
  function setDay(project, date, note) {
    const plans = normalizePlans(project.dailyPlans);
    if (!validDate(date) && !plans.some(plan => plan.date === date)) throw new Error("invalid-date");
    const next = plans.filter(plan => plan.date !== date);
    const text = String(note || "").trimEnd();
    if (text.trim()) next.push({ date, note: text });
    project.dailyPlans = next.sort((a, b) => a.date.localeCompare(b.date));
  }
  function linkify(text) {
    let html = "", cursor = 0;
    const source = String(text);
    for (const match of source.matchAll(/https?:\/\/[^\s<>"']+/gi)) {
      let url = match[0].replace(/[.,!?;:。，！？；：]+$/, "");
      for (const [open, close] of [["(", ")"], ["[", "]"], ["（", "）"]]) {
        while (url.endsWith(close) && url.split(close).length > url.split(open).length) url = url.slice(0, -1);
      }
      html += escape(source.slice(cursor, match.index));
      try {
        const parsed = new URL(url);
        if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("unsafe-url");
        html += `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(url)}</a>`;
      } catch { html += escape(url); }
      cursor = match.index + url.length;
    }
    return html + escape(source.slice(cursor));
  }
  function createDoubleTap() {
    let down = null, previous = null;
    const cancel = () => { down = null; previous = null; };
    const moved = point => Math.hypot(point.x - down.x, point.y - down.y) > 12 || Math.abs(point.scroll - down.scroll) > 2;
    return {
      cancel,
      down(point) {
        if (!point.key || !point.primary) return cancel();
        down = point;
      },
      move(point) {
        if (down && point.pointerId === down.pointerId && moved(point)) cancel();
      },
      up(point) {
        const valid = down && point.pointerId === down.pointerId && point.key === down.key &&
          point.time - down.time <= 350 && !moved(point);
        down = null;
        if (!valid) { cancel(); return false; }
        const double = previous && point.key === previous.key && point.time - previous.time <= 350 &&
          Math.hypot(point.x - previous.x, point.y - previous.y) <= 24 && Math.abs(point.scroll - previous.scroll) <= 2;
        previous = double ? null : point;
        return Boolean(double);
      }
    };
  }
  return { validDate, normalizePlans, days, otherPlans, setDay, linkify, createDoubleTap };
});

const ITINERARY_COPY = {
  en: {
    itinerary: "Itinerary", tripNotes: "Trip notes", tripNotesHint: "Hotels, transport and things to remember",
    itineraryEditHint: "Double-click or double-tap a day to edit.",
    noTripNotes: "Keep addresses, useful links and general notes here.", dailyItinerary: "Daily itinerary",
    itineraryDay: number => `Day ${number}`, today: "Today", jumpToDate: "Jump to a date",
    otherPlanDates: count => `Other dates · ${count}`, otherPlanDatesHelp: "Saved plans outside the displayed trip dates are kept here. You can still view and edit them.",
    emptyDayPlan: "No plans yet. Add a few ideas for this day.", editDayPlan: "Edit day", addDayPlan: "Add plans",
    editTripNotes: "Edit trip notes", dayPlanText: "Plans for this day",
    dayPlanPlaceholder: "Arrival day\n09:30 Flight\nAfternoon: check in, explore nearby\nAdd addresses or https:// links",
    itinerarySaved: "Saved on this device", itineraryEditConflict: "This plan changed while you were editing. Your draft is still open; copy it before reopening the latest plan."
  },
  zh: {
    itinerary: "行程", tripNotes: "旅行备注", tripNotesHint: "酒店、交通及需要记住的事",
    itineraryEditHint: "双击或双点当天卡片即可编辑。",
    noTripNotes: "可以在这里保存地址、实用链接和整趟旅行的备注。", dailyItinerary: "每日行程",
    itineraryDay: number => `第 ${number} 天`, today: "今天", jumpToDate: "跳转日期",
    otherPlanDates: count => `其他日期的行程 · ${count}`, otherPlanDatesHelp: "未显示在当前旅行日期中的旧行程保留在这里，仍可查看和编辑。",
    emptyDayPlan: "还没有安排，可以先写下当天的想法。", editDayPlan: "编辑当天", addDayPlan: "添加安排",
    editTripNotes: "编辑旅行备注", dayPlanText: "当天行程",
    dayPlanPlaceholder: "抵达当天\n09:30 航班\n下午：入住酒店，附近散步\n可加入地址或 https:// 链接",
    itinerarySaved: "已保存到本机", itineraryEditConflict: "这份行程在编辑期间有了其他修改。你的草稿仍在，请先复制草稿，再重新打开最新内容。"
  }
};
let itineraryEditor = null;
let itineraryDisplayedProject = null;

function renderItinerary(project) {
  const notes = project.planText || "";
  document.querySelector("#tripNotesTitle").textContent = t("tripNotes");
  document.querySelector("#tripNotesHint").textContent = t("tripNotesHint");
  els.projectPlanDisplay.innerHTML = `${notes.trim() ? `<div class="itinerary-text">${Itinerary.linkify(notes)}</div>` : `<p class="itinerary-empty">${t("noTripNotes")}</p>`}
    <button class="secondary-action" type="button" data-action="edit-trip-notes">${t("editTripNotes")}</button>`;
  const days = projectPlanDays(project), today = localDateId(new Date()), plans = dailyPlanMap(project);
  document.querySelector("#dailyItineraryTitle").textContent = t("dailyItinerary");
  document.querySelector("#itineraryEditHint").textContent = t("itineraryEditHint");
  const navigation = document.querySelector("#itineraryNavigation");
  navigation.hidden = !days.length;
  document.querySelector("#itineraryJumpLabel").textContent = t("jumpToDate");
  const jump = document.querySelector("#itineraryDateJump");
  const previousDate = itineraryDisplayedProject === project.id ? jump.value : "";
  const selectedDate = days.includes(previousDate) ? previousDate : days.includes(today) ? today : days[0];
  jump.innerHTML = days.map((date, index) => `<option value="${date}" ${date === selectedDate ? "selected" : ""}>${escapeHtml(formatShortDate(date))} · ${t("itineraryDay", index + 1)}</option>`).join("");
  itineraryDisplayedProject = project.id;
  const todayButton = document.querySelector("#itineraryTodayBtn");
  todayButton.hidden = !days.includes(today);
  todayButton.textContent = t("today");
  els.projectDailyPlanList.innerHTML = days.length ? days.map((date, index) => itineraryDayCard(date, plans.get(date)?.note || "", index + 1, today)).join("")
    : `<p class="itinerary-empty">${t("noProjectDateRange")}</p>`;
  const others = Itinerary.otherPlans(project), otherPanel = document.querySelector("#itineraryOtherDates");
  otherPanel.hidden = !others.length;
  document.querySelector("#itineraryOtherTitle").textContent = t("otherPlanDates", others.length);
  document.querySelector("#itineraryOtherHelp").textContent = t("otherPlanDatesHelp");
  document.querySelector("#itineraryOtherList").innerHTML = others.map(plan => itineraryDayCard(plan.date, plan.note, null, today)).join("");
}

function itineraryDayCard(date, note, number, today) {
  return `<article id="itinerary-day-${escapeAttr(date)}" data-date="${escapeAttr(date)}" tabindex="-1" class="itinerary-day ${date === today ? "is-today" : ""}">
    <div class="itinerary-day-head"><div><strong>${escapeHtml(formatShortDate(date))}</strong><span>${escapeHtml(formatWeekdayShort(date))}${number ? ` · ${t("itineraryDay", number)}` : ""}${date === today ? ` · ${t("today")}` : ""}</span></div>
      <button class="secondary-action" type="button" data-action="edit-itinerary-day" data-date="${escapeAttr(date)}" aria-label="${escapeAttr(`${t("editDayPlan")} · ${date}`)}">${t(note.trim() ? "edit" : "add")}</button></div>
    ${note.trim() ? `<div class="itinerary-text">${Itinerary.linkify(note)}</div>` : `<p class="itinerary-empty">${t("emptyDayPlan")}</p>`}</article>`;
}

function jumpToItineraryDate(date) {
  const card = document.getElementById(`itinerary-day-${date}`);
  if (!card) return;
  document.querySelector("#itineraryDateJump").value = date;
  card.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
  card.focus({ preventScroll: true });
}

function openItineraryEditor(date = null) {
  if (els.dialog.open) return;
  const project = selectedProject();
  if (!project) return;
  const note = date ? dailyPlanMap(project).get(date)?.note || "" : project.planText || "";
  itineraryEditor = { projectId: project.id, date, original: note };
  dialogMode = "itinerary";
  editingId = null;
  els.dialog.dataset.mode = "itinerary";
  els.dialogTitle.textContent = date ? `${formatShortDate(date)} · ${t("editDayPlan")}` : t("editTripNotes");
  els.deleteDialogBtn.hidden = true;
  els.fields.innerHTML = `<label class="field">${t(date ? "dayPlanText" : "tripNotes")}<textarea name="itineraryText" rows="10" placeholder="${escapeAttr(t(date ? "dayPlanPlaceholder" : "tripNotesHint"))}">${escapeHtml(note)}</textarea></label>`;
  els.form.querySelector("button[type='submit']").textContent = t("save");
  hideNoteSuggestions();
  lockBackgroundScroll();
  els.dialog.showModal();
  requestAnimationFrame(preventDialogInputFocus);
}

function itineraryGestureCard(target) {
  if (target.closest("a, button, input, select, textarea, label, summary, [contenteditable]")) return null;
  return target.closest(".itinerary-day");
}

function bindItineraryGestures(panel) {
  const taps = Itinerary.createDoubleTap();
  const point = event => ({ key: itineraryGestureCard(event.target), pointerId: event.pointerId,
    primary: event.isPrimary, x: event.clientX, y: event.clientY, time: event.timeStamp, scroll: window.scrollY || 0 });
  const touch = event => event.pointerType === "touch" || event.pointerType === "pen";
  panel.addEventListener("dblclick", event => {
    const card = itineraryGestureCard(event.target);
    if (!card || event.button !== 0 || els.dialog.open) return;
    event.preventDefault();
    taps.cancel();
    openItineraryEditor(card.dataset.date);
  });
  panel.addEventListener("pointerdown", event => {
    if (touch(event)) taps.down(point(event));
  });
  panel.addEventListener("pointermove", event => {
    if (touch(event)) taps.move(point(event));
  }, { passive: true });
  panel.addEventListener("pointercancel", () => taps.cancel());
  panel.addEventListener("pointerup", event => {
    if (!touch(event) || !taps.up(point(event)) || els.dialog.open) return;
    if (event.cancelable) event.preventDefault();
    openItineraryEditor(itineraryGestureCard(event.target).dataset.date);
  });
}

function saveItineraryDialog(data) {
  const editor = itineraryEditor;
  const project = editor && state.projects.find(item => item.id === editor.projectId);
  if (!project) return;
  const current = editor.date ? dailyPlanMap(project).get(editor.date)?.note || "" : project.planText || "";
  if (current !== editor.original) return alert(t("itineraryEditConflict"));
  const note = String(data.itineraryText || "").trimEnd();
  if (note !== current) {
    saveSyncRecovery(state, "before-itinerary-edit");
    if (editor.date) Itinerary.setDay(project, editor.date, note);
    else project.planText = note;
    project.updatedAt = nowStamp();
    markFinancialDirty();
    saveState();
  }
  itineraryEditor = null;
  closeEntryDialog();
  // Refresh only the plan: retain the project and page scroll position.
  renderProjectPlan(project);
  showToast(t("itinerarySaved"));
}
