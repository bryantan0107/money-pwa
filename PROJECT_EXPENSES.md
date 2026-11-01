# Project expense model

Local implementation: app `2026.11.01.2`, ledger `dataVersion: 3`, service-worker cache `v133`.

Expenses in `months[monthId].expenses` are the sole financial source. Optional `expense.projectId` associates one project; project totals span all months. Category/date/amount changes cascade later-month starting balances after confirmation. Associations and project status never change money. Project deletion retains expenses.

`projects-core.js` owns migration and ledger mutations. `project-ui.js` provides the expense forms, linking picker, project rendering and review handlers; `app.js` routes existing category/record/project surfaces to them.

## Existing records

- A project receives `accountingVersion: 1` once. `legacySettled` records its original settlement state and does not change when reopening.
- Settled originals stay in `project.entries` for reference. Existing settlement expenses remain in their original months. Only explicit settlement IDs may repair a missing project association; no amount/name matching or automatic replacement payment is allowed.
- Active originals remain pending until explicit posting, linking or skipping. Each entry stores `resolution: { kind, expenseId, resolvedAt }`. Posting checks this before creating any expense. Reloading, reopening or deleting a linked expense cannot make a resolved entry pending again. Skipped originals can be explicitly reviewed again.
- New projects use real expenses immediately and never create legacy entries.
- Future-version backups are rejected before import. Import saves a local recovery copy before replacing the current ledger.

## Local review

Serve this checkout on a separate local port, for example:

```sh
python3 -m http.server 4174 --bind 127.0.0.1
```

Open `http://127.0.0.1:4174/?preview=local`. This localhost-only mode prevents Supabase initialization and cloud synchronization. Import a private backup through Settings; it remains in the browser's local storage, not the repository. Use this URL for review: a localhost URL without `preview=local` retains normal sync behavior. Keep a separate port from any existing local ledger because local storage is shared by origin.

## Validation

```sh
node --test tests/*.test.cjs
# Optional: also validate a private backup, read-only, entirely in memory.
MONEY_BACKUP_TEST_PATH=/absolute/path/to/backup.json node --test tests/*.test.cjs
```

`app-projects.test.cjs` loads the actual app handlers with memory storage and controlled confirmation responses. It covers posting, moving across months, cancellation, linking/unlinking, completion/reopening, deletion, imports, and legacy review. These are application tests, not browser UI tests.

`tests/project-browser.cjs` is an additional Playwright check requiring a Playwright installation, browser runtime and the backup environment variable. It blocks requests outside the local preview origin. It has not completed in the current desktop sandbox because Chromium launch is denied. In-app browser checks cover import, direct posting, category deduction and mobile layouts; native JavaScript confirmation dialogs require manual review in this environment.

Before a future release, update all devices to the new client before resuming shared-ledger editing. The previous version-2 client rejects version-3 ledgers; no Supabase schema change is required by this feature. Publishing remains subject to the user's explicit approval.
