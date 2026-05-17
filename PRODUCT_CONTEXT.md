# Money App Product Context

This file records long-term product direction and user preferences for this project. Read it before making larger design, data, or architecture changes.

## Product Goal

- Build a personal money management app that can be used daily on an iPhone.
- Current stage: PWA for real use, with offline support, local data, and manual iCloud backup/export.
- Long-term possibility: become a polished iOS app that could be packaged for the App Store.
- Keep the code and data logic clean enough that future migration to Capacitor or a native iOS app is not painful.

## Core Money Model

- Income is the source of all monthly money.
- Monthly income is allocated into funds.
- Expenses belong to funds.
- Fund available balance is based on:
  - starting balance
  - plus monthly allocation
  - minus expenses in that fund
- Unallocated money should remain visible as money not yet assigned to a fund.
- Moving money between funds should adjust monthly allocation, not create a fake expense.
- Months are a continuous ledger, not independent sheets.
- A fund's next-month starting balance must equal its previous-month available balance.
- When creating a new month, carry each fund's current available balance into the new month as starting balance.
- If an older month is changed and later months already exist, changes that affect fund available balances must cascade into later months' starting balances after user confirmation.
- Do not offer an "Only This Month" option for fund-balance-affecting changes, because that would break month continuity.
- The confirmation choice should be:
  - Update Later Months
  - Cancel
- Actions that should trigger this confirmation when later months exist:
  - adding, editing, or deleting an expense
  - editing fund starting balance or monthly allocation
  - moving money between funds
  - deleting a fund
- Actions that do not need this confirmation:
  - editing income name or amount unless it is allocated into funds
  - backup/import/export settings
  - sorting or pinning funds

## Design Direction

- iPhone-first, not desktop-first.
- The visual style should feel advanced, minimal, and close to Apple/iOS design.
- Use quiet cards, clean spacing, restrained color, and clear hierarchy.
- Avoid making pages feel like landing pages or dashboards with too much decoration.
- Do not use horizontal scrolling unless the user explicitly asks for it or the content truly requires it.
- Mobile pages should never drift sideways during gestures; prevent page-level horizontal overflow by default.
- When a modal or dialog is open, the background page must not scroll, even if the dialog content reaches the top or bottom.
- Opening edit/add dialogs should not auto-focus text, amount, or date fields; users choose which field to edit.
- Keep form input/select font sizes iOS-safe, so Safari/PWA does not auto-zoom when editing.
- When in doubt, optimize for a real iPhone screen width.
- Homepage should show only key information; details can live behind tappable cards or detail pages.

## Navigation Principles

- Home is the main daily-use screen.
- Detail pages should feel like separate mobile app screens.
- Homepage-only summary elements should not follow into detail pages.
- `Balance Detail` pages should not show the top income summary strip.
- `Income Storage Detail` should also behave like a separate detail page.
- Month navigation should use a calendar-style year view with 12 month cells, not a native dropdown plus add button.
- Month navigation should feel like a compact dropdown/popover attached to the month button, not a large centered modal.
- Months that do not exist yet should appear greyed out; tapping them should ask before creating the month.
- The real current month should be marked with a small underline so users can find it even while viewing another month.
- Detail pages should support a quick left-edge right swipe to return home, with a smooth transition.
- Returning from a detail page should restore the previous page's scroll position instead of jumping to the top.
- Bottom tabs should remember their own scroll positions when switching between them.
- Future bottom navigation may be useful. Tentative tabs:
  - Home
  - Records
  - Settings
- Avoid calling a tab `Account` unless the app actually has login/account/cloud sync.
- Bottom navigation is now part of the mobile-first direction. Keep it simple and iOS-like:
  - Home for daily overview and available balance
  - Records for income and expense records
- Settings for backup, restore, currency, and future app settings
- Detail pages should hide bottom navigation for now, so they feel like focused child screens.
- Backup and restore belong in Settings; do not keep a duplicate top-right overflow menu for them.
- App display language should be switchable in Settings. Current supported languages: English and Chinese.
- The top subtitle under `Money` is not useful and should stay removed.
- Provide a quick privacy toggle near the app title to hide displayed amounts in public; amounts should become masked text while underlying data remains unchanged.

## Current Homepage Priorities

- Top compact strip:
  - Total Income + Add
  - Allocated + Move
  - Unallocated + Allocate
- `Income Storage` card:
  - shows a storage-style income allocation bar, inspired by iPhone storage UI
  - whole card is tappable
  - right-side arrow is preferred over a visible `Details` button
- `Available Balance` is the primary daily working area.
- Homepage should include compact `Recent Expenses`, showing about the last five updated expenses.
- `Recent Expenses` on the homepage is a read-only reference list, not an editing surface. Keep it small, with date, category, note, and amount in compact one-line rows. Editing belongs behind `View All`.
- `Available Balance` is the main homepage list. It should always show search, sort, add fund, depleted group, and fund cards; do not use an expand/collapse control here.
- Fund cards should be compact and mobile-readable.
- Whole fund card can open its balance details.
- Global `Log` is the main expense entry action.
- Adding a fund is less common, so it should stay visually secondary, such as a small white `+` button.

## Sorting And Fund List Rules

- Available Balance uses sort controls instead of manual drag reorder.
- Sort options:
  - most available first
  - least available first
  - recently updated first
  - oldest updated first
- "Updated" means money was allocated to a fund or an expense was added/edited/deleted for that fund.
- Fund cards can be pinned.
- Pinned funds always stay at the top, outside normal sorting.
- Funds with zero or negative available balance can be grouped lower under `Depleted`.
- If a depleted fund receives allocation and becomes positive again, it should automatically return to the main available group.

## Chart And Detail Preferences

- Prefer iPhone Storage-style horizontal allocation bars over pie charts.
- Income allocation chart should answer: "Where did this month's income go?"
- `Allocate` should be an allocation editor for the current month, not a long-term plan template.
- Allocation editor should show `Total Income`, `Allocated`, and `Unallocated`, then every fund with editable `Allocated` and `% Income`.
- Editing `Allocated` should recalculate `% Income`; editing `% Income` should recalculate `Allocated`.
- `Quick Add` should stay at the top of the allocation editor for one-off adjustments to a single fund.
- Do not mix spending progress into the income allocation chart.
- Spending progress belongs on fund cards and fund detail pages.
- `Income Storage Detail` should provide more detailed allocation proportions.
- For `Fund Allocation`, user prefers a horizontal table similar to the expense table when requested.
- Current desired `Fund Allocation` columns:
  - Fund
  - Allocated
  - % Income

## Data And Backup Direction

- Keep data local-first for now.
- Current currency is euro; display money amounts with the `€` symbol.
- Do not show a separate `Money Owed` feature for now. Lending money should be logged as an expense, and repayment should be logged as income. A dedicated lending/borrowing tab may be considered later.
- Manual JSON backup/restore should remain reliable.
- iCloud Drive manual backup reminders are part of the current product direction.
- Future improvements should consider data migration, because the app may evolve into a packaged iOS app.
- Avoid short-term data hacks that make old user data hard to upgrade later.

## PWA And Deployment

- Current deployment path: GitHub Pages.
- User prefers to preview changes locally before syncing to GitHub.
- Do not sync to GitHub unless the user asks.
- When updating PWA assets, bump cache/version strings so the phone can receive updates.
- Use the formal local git checkout at `/Users/bryanyijuetan/Documents/Codex/money-pwa` for future work.
- Preferred fast publishing workflow after local approval:
  - make changes in the formal checkout
  - verify locally
  - commit directly on `main`
  - push with `git push origin main`
  - let GitHub Pages deploy automatically
- Unless the user explicitly asks for a PR or separate branch, direct `main` sync is preferred for speed.

## Interaction Preferences

- Buttons should be clear, but not oversized when the action is secondary.
- Use icon-like controls for secondary actions when possible.
- Search results should feel connected to the search input and use white/neutral backgrounds, not bright blue.
- Tables and cards must not overflow the iPhone viewport unless explicitly requested.
- Text should not overlap buttons or other UI.
- If a UI element starts to feel crowded, prefer simplifying labels, moving actions to a second row, or making the page more focused.
