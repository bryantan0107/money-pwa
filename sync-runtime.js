/* Cloud I/O and lifecycle. All writes go through Supabase's atomic revision RPC. */
function syncConfig() {
  const config = window.MONEY_SYNC_CONFIG || {};
  return { supabaseUrl: String(config.supabaseUrl || "").trim(), supabaseAnonKey: String(config.supabaseAnonKey || "").trim() };
}
function isCloudSyncConfigured() {
  if (isLocalProjectPreview()) return false;
  const config = syncConfig();
  return Boolean(config.supabaseUrl && config.supabaseAnonKey);
}
function isLocalProjectPreview() {
  return ["localhost", "127.0.0.1", "::1"].includes(location.hostname) &&
    new URLSearchParams(location.search).get("preview") === "local";
}
function syncStorageKey(part, userId = syncUserId) { return `${SYNC_PREFIX}${userId}:${part}`; }
function readSyncStorage(part, fallback = null) {
  const raw = localStorage.getItem(syncStorageKey(part));
  try { return raw ? JSON.parse(raw) : fallback; }
  catch { return fallback; }
}
function markSyncConflict() {
  syncPhase = "conflict";
  localStorage.setItem(syncStorageKey("conflict"), JSON.stringify({ id: crypto.randomUUID(), createdAt: nowStamp() }));
}
function reconcileSharedSyncLedger() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return true;
  const shared = JSON.parse(stored);
  const other = MoneySync.content(shared);
  if (MoneySync.equal(other, syncLastSaved)) return true;
  const merged = MoneySync.merge(syncLastSaved, MoneySync.content(state), other);
  if (merged.conflicts.length) {
    saveSyncRecovery(state, "local-tab");
    saveSyncRecovery(shared, "other-tab");
    markSyncConflict();
    return false;
  }
  state = normalizeStateLanguage(MoneySync.withContent(state, merged.value));
  persistSyncLedger();
  return true;
}
function persistSyncLedger() {
  const serialized = JSON.stringify(state);
  if (syncUserId) localStorage.setItem(syncStorageKey("ledger"), serialized);
  // A different tab can change the active account. Never write its ledger.
  if (!syncUserId || localStorage.getItem(SYNC_OWNER_KEY) === syncUserId) localStorage.setItem(STORAGE_KEY, serialized);
  syncLastSaved = MoneySync.content(state);
}
function saveSyncRecovery(data, reason) {
  const history = readSyncStorage("recovery", []);
  history.push({ createdAt: new Date().toISOString(), reason, data: structuredClone(data) });
  localStorage.setItem(syncStorageKey("recovery"), JSON.stringify(history.slice(-3)));
}
function exportSyncRecovery() {
  const latest = readSyncStorage("recovery", []).at(-1);
  if (!latest) return;
  const blob = new Blob([JSON.stringify({ ...latest.data, backupCreatedAt: latest.createdAt, app: "Money" }, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `money-sync-recovery-${latest.createdAt.slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}
function getDeviceId() {
  const key = "monthly-money-manager-device-id";
  let id = localStorage.getItem(key);
  if (!id) { id = crypto.randomUUID(); localStorage.setItem(key, id); }
  return id;
}
function syncIsDirty() { return !syncBaseline || !MoneySync.equal(MoneySync.content(state), syncBaseline.base); }
function renderCloudSyncStatus(message = "") {
  if (!els.cloudSyncStatus) return;
  const configured = isCloudSyncConfigured();
  const signedIn = Boolean(syncSession && syncUserId);
  const recovery = passwordRecoveryMode;
  const blocked = syncInFlight || navigator.onLine === false || syncPhase === "setup-required" || syncPhase === "account-changed";
  els.syncEmailInput.hidden = !configured || signedIn || recovery;
  els.syncCodeInput.hidden = !configured || signedIn || recovery;
  els.syncNewPasswordInput.hidden = !configured || !recovery;
  for (const button of [els.syncDownloadBtn, els.syncUploadBtn, els.syncNowBtn, els.syncBackupBtn]) {
    button.hidden = !configured || !signedIn || recovery;
    button.disabled = blocked;
  }
  // Recovery export is available even offline or when the migration is missing.
  els.syncBackupBtn.hidden ||= !signedIn || !readSyncStorage("recovery", []).length;
  els.syncBackupBtn.disabled = false;
  els.syncNowBtn.disabled = syncInFlight || navigator.onLine === false || ["account-changed", "conflict"].includes(syncPhase);
  els.syncSignOutBtn.hidden = !configured || !signedIn || recovery;
  els.syncSignOutBtn.disabled = syncInFlight;
  els.syncSignInBtn.hidden = !configured || signedIn || recovery;
  els.syncSignInBtn.disabled = !supabaseClient;
  els.syncUpdatePasswordBtn.hidden = !configured || !recovery;
  els.syncSignInBtn.textContent = t("signIn");
  els.syncUpdatePasswordBtn.textContent = t("savePassword");
  els.syncDownloadBtn.textContent = t("syncDownloadCloud");
  els.syncUploadBtn.textContent = t("syncUploadDevice");
  els.syncSignOutBtn.textContent = t("signOut");
  els.syncNowBtn.textContent = t("syncNow");
  els.syncBackupBtn.textContent = t("syncRecoveryBackup");
  let text = message;
  if (!configured) text = t(isLocalProjectPreview() ? "localPreview" : "cloudSyncNotConfigured");
  else if (recovery) text = t("cloudSyncPasswordRecovery");
  else if (!supabaseClient && syncInitialized) text = t("syncUnavailable");
  else if (!signedIn) text ||= syncPhase === "error" ? t("cloudSyncError") : t("cloudSyncSignedOut");
  else if (!text) {
    const phase = navigator.onLine === false ? "offline" : syncPhase;
    const key = { syncing: "cloudSyncChecking", conflict: "syncConflict", linking: "syncLinkRequired",
      offline: "syncOffline", error: "cloudSyncError", "setup-required": "syncSetupRequired", "account-changed": "syncAccountChanged" }[phase];
    if (key) text = t(key);
    else if (syncIsDirty()) text = t("syncPending");
    else {
      const date = syncBaseline?.lastSyncedAt;
      text = date ? t("syncComplete", new Date(date).toLocaleString(currentLanguage() === "zh" ? "zh-CN" : "en-GB")) : t("syncPending");
    }
  }
  els.cloudSyncStatus.textContent = text;
  els.cloudSyncStatus.setAttribute("role", "status");
  renderCloudSyncDiagnostics();
}
function renderCloudSyncDiagnostics() {
  if (!els.cloudSyncDiagnostics) return;
  // Detailed device identifiers are unnecessary in the everyday sync UI.
  els.cloudSyncDiagnostics.textContent = syncSession && syncUserId ? syncSession.user.email || "" : "";
}
function syncEditing() {
  return Boolean(els.dialog?.open || allocationRowEdit || document.activeElement?.matches("input, textarea, select"));
}
function scheduleCloudSync(delay = 1000) {
  if (syncUserId && readSyncStorage("conflict")) syncPhase = "conflict";
  if (syncUserId && !syncInFlight && !["conflict", "linking", "setup-required", "account-changed"].includes(syncPhase) && syncIsDirty()) syncPhase = "pending";
  renderCloudSyncStatus();
  if (!syncUserId || !syncSession || passwordRecoveryMode || ["conflict", "linking", "setup-required", "account-changed"].includes(syncPhase)) return;
  if (syncInFlight) { syncQueued = true; return; }
  clearTimeout(syncTimer);
  syncTimer = setTimeout(() => runCloudSync(), delay);
}
function emptySyncLedger() {
  const data = structuredClone(initialData);
  data.months = { [data.currentMonth]: { label: data.months[data.currentMonth].label, funds: [], incomes: [], expenses: [], categoryEvents: [], debts: [] } };
  data.projects = [];
  data.restockItems = [];
  data.updatedAt = nowStamp();
  return normalizeStateLanguage(data);
}
async function activateCloudSession(session) {
  const userId = session?.user?.id || null;
  syncSession = session;
  if (userId === syncUserId) { renderCloudSyncStatus(); return; }
  syncGeneration++;
  clearTimeout(syncTimer);
  clearInterval(syncPollTimer);
  const previousOwner = localStorage.getItem(SYNC_OWNER_KEY);
  if (previousOwner && previousOwner === syncUserId) localStorage.setItem(syncStorageKey("ledger", previousOwner), JSON.stringify(state));
  syncUserId = userId;
  syncBaseline = null;
  lastFetchedRemoteSync = null;
  if (!userId) { syncPhase = "signed-out"; renderCloudSyncStatus(); return; }
  const saved = previousOwner !== userId ? readSyncStorage("ledger") : null;
  const restoreAccount = previousOwner !== userId && (Boolean(previousOwner) || (Boolean(saved) && syncPristine));
  if (restoreAccount) {
    localStorage.removeItem(LAST_BACKUP_KEY);
    localStorage.removeItem(DISMISSED_BACKUP_KEY);
    syncPristine = !saved;
    state = saved ? normalizeStateLanguage(saved) : emptySyncLedger();
    if (state.lastBackupAt) localStorage.setItem(LAST_BACKUP_KEY, state.lastBackupAt);
    resetSyncView();
  }
  // The first account can explicitly claim an existing unsigned local ledger.
  localStorage.setItem(SYNC_OWNER_KEY, userId);
  // An unsigned ledger created after sign-out must be explicitly linked. It
  // must never be interpreted as deletions from the previous account's base.
  const binding = previousOwner === userId || restoreAccount ? readSyncStorage("baseline") : null;
  if (binding && Number.isSafeInteger(binding.revision) && binding.revision >= 1 && MoneySync.validLedger(binding.base)) syncBaseline = binding;
  persistSyncLedger();
  syncPhase = readSyncStorage("conflict") ? "conflict" : "pending";
  render();
  syncPollTimer = setInterval(() => {
    if (document.visibilityState === "visible") scheduleCloudSync(0);
  }, 20000);
  scheduleCloudSync(0);
}
function resetSyncView() {
  selectedFundId = null;
  selectedProjectId = null;
  showingAllocationDetail = false;
  allocationRowEdit = null;
  if (els.dialog?.open) { els.dialog.close(); unlockBackgroundScroll(); }
}
function isPasswordRecoveryUrl() { return `${location.search}${location.hash}`.includes("type=recovery"); }
function clearAuthUrlState() {
  const url = new URL(location.href);
  ["access_token", "refresh_token", "expires_at", "expires_in", "provider_token", "token_type", "type", "code", "error", "error_code", "error_description"].forEach(key => url.searchParams.delete(key));
  url.hash = "";
  history.replaceState({}, document.title, `${url.pathname}${url.search}`);
}
async function initCloudSync() {
  syncInitialized = true;
  if (!isCloudSyncConfigured() || !window.supabase?.createClient) { renderCloudSyncStatus(); return; }
  try {
    const config = syncConfig();
    supabaseClient = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey, {
      global: { fetch: (input, init = {}) => fetch(input, { ...init, cache: "no-store" }) },
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    });
    passwordRecoveryMode = isPasswordRecoveryUrl();
    supabaseClient.auth.onAuthStateChange((event, session) => {
      // SDK methods must run outside this callback's authentication lock.
      if (event === "PASSWORD_RECOVERY") passwordRecoveryMode = true;
      setTimeout(() => activateCloudSession(session).catch(handleCloudSyncError), 0);
    });
    const { data, error } = await supabaseClient.auth.getSession();
    if (error) throw error;
    await activateCloudSession(data?.session || null);
  } catch (error) { handleCloudSyncError(error); }
}
async function signInToCloudSync() {
  if (!supabaseClient) return renderCloudSyncStatus(t("syncUnavailable"));
  const email = els.syncEmailInput.value.trim();
  const password = els.syncCodeInput.value;
  if (!email || !password) return;
  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) throw error;
    els.syncCodeInput.value = "";
    els.syncCodeInput.blur();
    await activateCloudSession(data.session);
  } catch (error) { handleCloudSyncError(error); }
}
async function updateCloudSyncPassword() {
  if (!supabaseClient || !els.syncNewPasswordInput.value) return;
  try {
    const { error } = await supabaseClient.auth.updateUser({ password: els.syncNewPasswordInput.value });
    if (error) throw error;
    passwordRecoveryMode = false;
    els.syncNewPasswordInput.value = "";
    els.syncNewPasswordInput.blur();
    clearAuthUrlState();
    scheduleCloudSync(0);
  } catch (error) { handleCloudSyncError(error); }
}
async function signOutOfCloudSync() {
  if (!supabaseClient || syncInFlight) return;
  try {
    persistSyncLedger();
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
    await activateCloudSession(null);
    localStorage.removeItem(SYNC_OWNER_KEY);
    localStorage.removeItem(LAST_BACKUP_KEY);
    localStorage.removeItem(DISMISSED_BACKUP_KEY);
    state = emptySyncLedger();
    syncPristine = true;
    passwordRecoveryMode = false;
    resetSyncView();
    persistSyncLedger();
    render();
  } catch (error) { handleCloudSyncError(error); }
}
function syncAssertCurrent(userId, generation) {
  if (syncUserId !== userId || syncGeneration !== generation || syncSession?.user?.id !== userId) throw new Error("sync-account-changed");
}
function validateRemoteSync(row) {
  if (!row) return;
  if (!Number.isSafeInteger(row.revision) || row.revision < 1 || !MoneySync.validLedger(row.data_json, DATA_VERSION)) throw new Error("sync-invalid-remote");
}
async function fetchRemoteSyncState(userId = syncUserId) {
  const { data, error } = await supabaseClient.from(SYNC_TABLE)
    .select("data_json, updated_at, device_id, app_version, revision").eq("user_id", userId).maybeSingle();
  if (error) throw error;
  validateRemoteSync(data);
  return data || null;
}
function rememberSyncBaseline(remote) {
  syncBaseline = { revision: remote.revision, base: MoneySync.content(remote.data_json), lastSyncedAt: nowStamp() };
  localStorage.setItem(syncStorageKey("baseline"), JSON.stringify(syncBaseline));
  localStorage.removeItem(syncStorageKey("conflict"));
  lastFetchedRemoteSync = remote;
  state.cloudSync = { lastSyncedAt: syncBaseline.lastSyncedAt, lastRemoteUpdatedAt: remote.updated_at, lastAction: "sync" };
  persistSyncLedger();
  syncPristine = false;
}
function applyRemoteSyncState(remote, reason = "download") {
  validateRemoteSync(remote);
  const shared = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  if (shared && !MoneySync.equal(MoneySync.content(shared), MoneySync.content(state))) saveSyncRecovery(shared, "other-tab-before-download");
  saveSyncRecovery(state, reason);
  const changed = !MoneySync.equal(MoneySync.content(state), MoneySync.content(remote.data_json));
  state = normalizeStateLanguage(MoneySync.withContent(state, MoneySync.content(remote.data_json)));
  if (changed) { state.updatedAt = nowStamp(); state.backupDirty = true; }
  rememberSyncBaseline(remote);
  if (selectedFundId && !currentMonth().funds.some(fund => fund.id === selectedFundId)) selectedFundId = null;
  if (selectedProjectId && !state.projects.some(project => project.id === selectedProjectId)) selectedProjectId = null;
  render();
}
function handleCloudSyncError(error) {
  if (error?.message === "sync-account-changed") return;
  const missing = ["42703", "PGRST202", "PGRST204"].includes(error?.code);
  syncPhase = missing ? "setup-required" : navigator.onLine === false ? "offline" : "error";
  renderCloudSyncStatus();
}
async function runCloudSync({ manual = false, choice = null } = {}) {
  if (!supabaseClient || !syncUserId || !syncSession || passwordRecoveryMode) return;
  if (localStorage.getItem(SYNC_OWNER_KEY) !== syncUserId) { syncPhase = "account-changed"; renderCloudSyncStatus(); return; }
  if (syncInFlight) { syncQueued = true; return; }
  if (navigator.onLine === false) { syncPhase = "offline"; renderCloudSyncStatus(); return; }
  if (syncPhase === "conflict" && !choice) return renderCloudSyncStatus();
  if (!manual && ["conflict", "linking", "setup-required", "account-changed"].includes(syncPhase)) return;
  if (syncEditing()) { scheduleCloudSync(1500); return; }
  if (!choice && !reconcileSharedSyncLedger()) { renderCloudSyncStatus(); return; }
  // Web Locks serializes tabs on supporting browsers. The database CAS remains
  // mandatory and provides protection across browsers, devices, and old tabs.
  if (navigator.locks) {
    return navigator.locks.request(`money-cloud-${syncUserId}`, { ifAvailable: true }, lock => {
      if (!lock) { scheduleCloudSync(2000); return; }
      return performCloudSync({ manual, choice });
    });
  }
  return performCloudSync({ manual, choice });
}
async function performCloudSync({ manual, choice }) {
  const initialConflict = localStorage.getItem(syncStorageKey("conflict"));
  syncInFlight = true;
  syncQueued = false;
  syncPhase = "syncing";
  renderCloudSyncStatus();
  const userId = syncUserId;
  const generation = syncGeneration;
  try {
    for (let attempt = 0; attempt < 3; attempt++) {
      const remote = await fetchRemoteSyncState(userId);
      syncAssertCurrent(userId, generation);
      if (localStorage.getItem(syncStorageKey("conflict")) !== initialConflict) { markSyncConflict(); return; }
      if (syncEditing()) { syncQueued = true; syncPhase = "pending"; return; }
      // Re-read local state after network I/O so edits made during a fetch count.
      const local = MoneySync.content(state);
      const cloud = remote ? MoneySync.content(remote.data_json) : null;
      lastFetchedRemoteSync = remote;
      if (!MoneySync.validLedger(local, DATA_VERSION)) throw new Error("sync-invalid-local");
      if (choice) {
        if (choice === "remote" && !remote) { syncPhase = "linking"; renderCloudSyncStatus(t("cloudSyncNoCloudData")); return; }
        if (!window.confirm(t(choice === "remote" ? "cloudSyncDownloadConfirm" : "cloudSyncUploadConfirm"))) {
          syncPhase = readSyncStorage("conflict") ? "conflict" : !syncBaseline ? "linking" : syncIsDirty() ? "pending" : "synced";
          syncQueued = syncPhase === "pending";
          return;
        }
        if (choice === "remote") { applyRemoteSyncState(remote, "choose-cloud"); syncPhase = syncIsDirty() ? "pending" : "synced"; syncQueued = syncIsDirty(); return; }
        const shared = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
        if (shared && !MoneySync.equal(MoneySync.content(shared), local)) saveSyncRecovery(shared, "other-tab-before-upload");
        saveSyncRecovery(state, "before-upload");
        if (remote) saveSyncRecovery(remote.data_json, "previous-cloud");
      } else if (!syncBaseline) {
        if (remote && (syncPristine || MoneySync.equal(local, cloud))) {
          applyRemoteSyncState(remote, "first-download"); syncPhase = syncIsDirty() ? "pending" : "synced"; syncQueued = syncIsDirty(); return;
        }
        syncPhase = "linking"; return;
      }
      let candidate = local;
      if (!choice) {
        if (!remote || remote.revision < syncBaseline.revision ||
            (remote.revision === syncBaseline.revision && !MoneySync.equal(cloud, syncBaseline.base))) {
          markSyncConflict(); return;
        }
        if (MoneySync.equal(local, cloud)) { rememberSyncBaseline(remote); syncPhase = "synced"; return; }
        if (MoneySync.equal(local, syncBaseline.base)) {
          applyRemoteSyncState(remote); syncPhase = syncIsDirty() ? "pending" : "synced"; syncQueued = syncIsDirty(); return;
        }
        if (!MoneySync.equal(cloud, syncBaseline.base)) {
          const merged = MoneySync.merge(syncBaseline.base, local, cloud);
          if (merged.conflicts.length) { markSyncConflict(); return; }
          candidate = merged.value;
        }
        if (MoneySync.equal(candidate, cloud)) {
          applyRemoteSyncState(remote); syncPhase = syncIsDirty() ? "pending" : "synced"; syncQueued = syncIsDirty(); return;
        }
      }
      const payload = MoneySync.withContent(state, candidate);
      payload.updatedAt = nowStamp();
      const { data, error } = await supabaseClient.rpc("save_money_sync_state", {
        p_user_id: userId, p_expected_revision: remote?.revision || 0,
        p_data_json: payload, p_device_id: getDeviceId(), p_app_version: APP_VERSION
      });
      syncAssertCurrent(userId, generation);
      if (error) throw error;
      if (localStorage.getItem(syncStorageKey("conflict")) !== initialConflict) { markSyncConflict(); return; }
      if (!data || typeof data.applied !== "boolean") throw new Error("sync-invalid-response");
      if (!data.applied) {
        if (choice) { markSyncConflict(); return; }
        continue;
      }
      validateRemoteSync(data.row);
      if (!data.row || !MoneySync.equal(MoneySync.content(data.row.data_json), candidate) || data.row.revision !== (remote?.revision || 0) + 1) throw new Error("sync-invalid-response");
      // Reconcile edits made while the upload was in flight. Acknowledging an
      // older snapshot must never erase or mark these edits as synchronized.
      const current = MoneySync.content(state);
      const merged = MoneySync.merge(local, current, candidate);
      if (merged.conflicts.length) { markSyncConflict(); return; }
      if (syncEditing() && !MoneySync.equal(current, merged.value)) {
        // Keep the old merge base until the editor closes. The accepted cloud
        // snapshot will be reconciled afterwards, without changing form data.
        syncPhase = "pending";
        syncQueued = true;
        return;
      }
      if (!MoneySync.equal(current, merged.value)) saveSyncRecovery(state, "before-merge");
      state = normalizeStateLanguage(MoneySync.withContent(state, merged.value));
      rememberSyncBaseline(data.row);
      syncPhase = syncIsDirty() ? "pending" : "synced";
      // Avoid replacing an open form or an inline editor after the upload.
      if (!syncEditing()) render();
      if (syncIsDirty()) syncQueued = true;
      return;
    }
    syncPhase = "pending";
    syncQueued = true;
  } catch (error) { if (generation === syncGeneration) handleCloudSyncError(error); }
  finally {
    syncInFlight = false;
    renderCloudSyncStatus();
    if (syncQueued || (generation !== syncGeneration && syncUserId)) scheduleCloudSync(1000);
  }
}
function downloadCloudSyncState() { return runCloudSync({ manual: true, choice: "remote" }); }
function uploadDeviceSyncState() { return runCloudSync({ manual: true, choice: "local" }); }

window.addEventListener("online", () => scheduleCloudSync(0));
window.addEventListener("offline", () => renderCloudSyncStatus());
window.addEventListener("focus", () => scheduleCloudSync(0));
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") scheduleCloudSync(0);
});
document.addEventListener("focusout", () => scheduleCloudSync(1000));
window.addEventListener("storage", event => {
  if (event.key === SYNC_OWNER_KEY && syncUserId && event.newValue !== syncUserId) {
    syncPhase = "account-changed"; renderCloudSyncStatus(); return;
  }
  if (event.key === STORAGE_KEY && event.newValue && !syncEditing() && localStorage.getItem(SYNC_OWNER_KEY) === syncUserId) {
    const incoming = JSON.parse(event.newValue);
    if (MoneySync.validLedger(incoming)) { state = normalizeStateLanguage(incoming); syncLastSaved = MoneySync.content(state); render(); }
  }
  if (event.key === syncStorageKey("baseline") && !syncEditing()) syncBaseline = readSyncStorage("baseline");
  scheduleCloudSync();
});
