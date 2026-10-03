"""Local budgeting and real service-worker smoke check; no account required."""
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', headless=True, args=['--no-sandbox'])
    context = browser.new_context(viewport={'width': 390, 'height': 844})
    page = context.new_page()
    page.set_default_timeout(10000)
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    assert page.goto('http://127.0.0.1:8000/?sw=1', wait_until='networkidle').status == 200
    expect(page.locator('#dashboardView')).to_be_visible()
    page.wait_for_function('navigator.serviceWorker.controller !== null')
    assert page.evaluate('typeof window.supabase.createClient') == 'function'
    print('PASS: mobile dashboard, SDK initialization, and active service worker', flush=True)

    def snapshot():
        return page.evaluate('JSON.parse(JSON.stringify(state))')

    before = snapshot()
    month_id = before['currentMonth']
    month_before = before['months'][month_id]
    income_before = sum(item['amount'] for item in month_before['incomes'])
    page.locator('#incomeStorageCard').click()
    page.locator('#allocationDetailAddIncomeBtn').click()
    page.locator('#entryForm input[name="name"]').fill('Onboarding income')
    page.locator('#entryForm input[name="amount"]').fill('100')
    page.locator('#entryForm button[type="submit"]').click()
    expect(page.locator('#entryDialog')).not_to_be_visible()
    month = snapshot()['months'][month_id]
    assert sum(item['amount'] for item in month['incomes']) == round(income_before + 100, 2)
    expect(page.locator('#allocationDetailIncome')).to_contain_text(f'{income_before + 100:,.2f}')
    print('PASS: income entry and displayed total', flush=True)

    page.locator('#backToDashboardFromAllocationBtn').click()
    groceries = next(fund for fund in month['funds'] if fund['name'] == 'Groceries')
    balance_before = page.evaluate('(id) => balanceFor(currentMonth().funds.find(f => f.id === id))', groceries['id'])
    page.locator('#quickExpenseBtn').click()
    page.locator('#entryForm select[name="category"]').select_option(value='Groceries')
    page.locator('#entryForm input[name="note"]').fill('Onboarding groceries')
    page.locator('#entryForm input[name="amount"]').fill('12.34')
    page.locator('#entryForm button[type="submit"]').click()
    expect(page.locator('#entryDialog')).not_to_be_visible()
    balance_after = page.evaluate('(id) => balanceFor(currentMonth().funds.find(f => f.id === id))', groceries['id'])
    assert round(balance_before - balance_after, 2) == 12.34
    page.locator('[data-tab="records"]').click()
    expect(page.locator('#recordTable')).to_contain_text('Onboarding groceries')
    expect(page.locator('#recordTable')).to_contain_text('Onboarding income')
    print('PASS: expense entry, balance deduction, and records', flush=True)

    page.reload(wait_until='networkidle')
    persisted = page.evaluate("JSON.parse(localStorage.getItem('monthly-money-manager-v2'))")
    assert any(item['note'] == 'Onboarding groceries' for item in persisted['months'][month_id]['expenses'])
    assert any(item['name'] == 'Onboarding income' for item in persisted['months'][month_id]['incomes'])
    print('PASS: local data survives reload', flush=True)

    context.set_offline(True)
    page.reload(wait_until='domcontentloaded')
    expect(page.locator('#dashboardView')).to_be_visible()
    expect(page.locator('#storageTotalIncome')).to_contain_text(f'{income_before + 100:,.2f}')
    page.locator('[data-tab="records"]').click()
    expect(page.locator('#recordTable')).to_contain_text('Onboarding groceries')
    assert not errors, errors
    assert page.evaluate('typeof window.supabase.createClient') == 'function'
    print('PASS: offline reload, stored records, and cached SDK; no JavaScript page errors', flush=True)
    context.close()
    browser.close()
print('5 functional smoke checks passed', flush=True)
