import { test, expect, Page } from '@playwright/test'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Navigate to the home page and wait for it to load */
async function gotoHome(page: Page) {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  // Wait for React to render the home cards
  await page.locator('h1').waitFor({ state: 'visible', timeout: 10000 })
}

/** Navigate from home page by clicking an exercise card title */
async function clickHomeCard(page: Page, cardTitle: string) {
  const card = page.locator('.card', { hasText: cardTitle })
  await card.first().click()
  await page.waitForTimeout(500)
}

/** Navigate using the top navbar buttons (exact match) */
async function clickNavButton(page: Page, label: string) {
  await page.locator('nav button', { hasText: new RegExp(`^${label}$`) }).click()
  await page.waitForTimeout(500)
}

/** Go home by clicking the title in the navbar */
async function goHomeViaNav(page: Page) {
  await page.locator('nav h2').click()
  await page.waitForTimeout(500)
}

// ---------------------------------------------------------------------------
// Test 1: Home Page Visual
// ---------------------------------------------------------------------------

test.describe('Home Page', () => {
  test('renders all exercise cards correctly', async ({ page }) => {
    await gotoHome(page)

    // Verify app title
    await expect(page.locator('h1')).toContainText('English Learning App')

    // Verify key exercise cards are present
    for (const title of ['Grammar', 'Reading', 'Free Talk', 'Essay Writing', 'AI Settings']) {
      await expect(page.locator('.card', { hasText: title }).first()).toBeVisible()
    }

    // Visual snapshot
    await expect(page).toHaveScreenshot('home-page.png', { fullPage: true })
  })
})

// ---------------------------------------------------------------------------
// Test 2: Free Talk Chat
// ---------------------------------------------------------------------------

test.describe('Free Talk Chat', () => {
  test('shows personality selection screen', async ({ page }) => {
    await gotoHome(page)
    await clickHomeCard(page, 'Free Talk')

    // Verify personality options
    await expect(page.getByText('Friendly Chat')).toBeVisible()
    await expect(page.getByText('English Teacher')).toBeVisible()
    await expect(page.getByText('Interviewer')).toBeVisible()
    await expect(page.getByText('Debate Partner')).toBeVisible()

    await expect(page).toHaveScreenshot('free-talk-personality-selection.png', { fullPage: true })
  })

  test('starts debate chat and shows greeting message', async ({ page }) => {
    await gotoHome(page)
    await clickHomeCard(page, 'Free Talk')

    await page.locator('.card', { hasText: 'Debate Partner' }).click()
    await page.waitForTimeout(1000)

    await expect(page.getByText('debate session', { exact: false })).toBeVisible()
    await expect(page.getByPlaceholder('Type in English...')).toBeVisible()

    await expect(page).toHaveScreenshot('free-talk-debate-started.png', { fullPage: true })
  })

  test('sends a message and receives mock agent response', async ({ page }) => {
    await gotoHome(page)
    await clickHomeCard(page, 'Free Talk')

    await page.locator('.card', { hasText: 'Friendly Chat' }).click()
    await page.waitForTimeout(1000)

    const input = page.getByPlaceholder('Type in English...')
    await input.fill('I have been studying English for several years and I find it fascinating how language shapes our thinking.')
    await page.locator('button', { hasText: 'Send' }).click()

    await page.waitForTimeout(2500)
    await expect(page.getByText('I have been studying English', { exact: false })).toBeVisible()

    await expect(page).toHaveScreenshot('free-talk-conversation.png', { fullPage: true })
  })

  test('sends message with grammar error and gets correction', async ({ page }) => {
    await gotoHome(page)
    await clickHomeCard(page, 'Free Talk')

    await page.locator('.card', { hasText: 'English Teacher' }).click()
    await page.waitForTimeout(1000)

    const input = page.getByPlaceholder('Type in English...')
    await input.fill('I have been learning English since 5 years and it has been a remarkable journey.')
    await page.locator('button', { hasText: 'Send' }).click()

    await page.waitForTimeout(2500)
    await expect(page.getByText('for', { exact: false }).first()).toBeVisible()

    await expect(page).toHaveScreenshot('free-talk-grammar-correction.png', { fullPage: true })
  })
})

// ---------------------------------------------------------------------------
// Test 3: Essay Writing
// ---------------------------------------------------------------------------

test.describe('Essay Writing', () => {
  test('shows prompt selection with all categories', async ({ page }) => {
    await gotoHome(page)
    await clickHomeCard(page, 'Essay Writing')

    await expect(page.getByText('Opinion').first()).toBeVisible()
    await expect(page.getByText('Academic').first()).toBeVisible()
    await expect(page.getByText('Remote Work vs Office Work')).toBeVisible()
    await expect(page.getByText('Language Acquisition Theories')).toBeVisible()

    await expect(page).toHaveScreenshot('essay-prompt-selection.png', { fullPage: true })
  })

  test('selects C2 academic prompt and shows writing interface', async ({ page }) => {
    await gotoHome(page)
    await clickHomeCard(page, 'Essay Writing')

    await page.locator('.card', { hasText: 'Language Acquisition Theories' }).click()
    await page.waitForTimeout(500)

    await expect(page.getByText('Compare and contrast', { exact: false })).toBeVisible()
    await expect(page.getByText('C2')).toBeVisible()
    await expect(page.locator('textarea')).toBeVisible()

    await expect(page).toHaveScreenshot('essay-writing-interface.png', { fullPage: true })
  })

  test('writes essay and runs offline analysis', async ({ page }) => {
    await gotoHome(page)
    await clickHomeCard(page, 'Essay Writing')

    await page.locator('.card', { hasText: 'Language Acquisition Theories' }).click()
    await page.waitForTimeout(500)

    const essay = `The debate between nativist and constructivist accounts of language acquisition remains one of the most intellectually fertile controversies in linguistics. Nativism, most prominently championed by Noam Chomsky, posits the existence of an innate Language Acquisition Device. Constructivism, by contrast, appeals to domain-general learning mechanisms.

The empirical evidence is characteristically equivocal. Cross-linguistic studies of creole genesis lend some credence to nativist claims. Conversely, connectionist models have demonstrated that many ostensibly rule-governed phenomena can be acquired through pattern association.

A comprehensive account arguably requires a reconciliation of these paradigms. The emergentist framework suggests that language arises from the interaction of multiple constraints.`

    await page.locator('textarea').fill(essay)
    await page.waitForTimeout(500)

    await expect(page.getByText(/\d+ \/ \d+ words/)).toBeVisible()

    await page.locator('button', { hasText: /Basic Analysis/i }).click()
    await page.waitForTimeout(1000)

    await expect(page.getByText(/Word Count|Sentences|Paragraphs/i).first()).toBeVisible()

    await expect(page).toHaveScreenshot('essay-offline-analysis.png', { fullPage: true })
  })
})

// ---------------------------------------------------------------------------
// Test 4: AI Settings Page
// ---------------------------------------------------------------------------

test.describe('AI Settings', () => {
  test('shows API key input and model selection', async ({ page }) => {
    await gotoHome(page)
    await clickHomeCard(page, 'AI Settings')

    await expect(page.getByText('AI Status')).toBeVisible()
    await expect(page.getByText('Sonnet', { exact: false }).first()).toBeVisible()
    await expect(page.locator('button', { hasText: /Test Connection/i })).toBeVisible()

    await expect(page).toHaveScreenshot('ai-settings.png', { fullPage: true })
  })
})

// ---------------------------------------------------------------------------
// Test 5: Navigation Flow
// ---------------------------------------------------------------------------

test.describe('Navigation Flow', () => {
  test('navigates between sections via navbar', async ({ page }) => {
    await gotoHome(page)

    // Home -> Free Talk (via card)
    await clickHomeCard(page, 'Free Talk')
    await expect(page.getByText('Friendly Chat')).toBeVisible()

    // Free Talk -> Essay (via navbar)
    await clickNavButton(page, 'Essay')
    await expect(page.getByText('Essay Writing')).toBeVisible()

    // Essay -> Grammar (via navbar)
    await clickNavButton(page, 'Grammar')
    await page.waitForTimeout(500)

    // Grammar -> Home (via title click)
    await goHomeViaNav(page)
    await expect(page.locator('h1')).toContainText('English Learning App')

    await expect(page).toHaveScreenshot('navigation-back-home.png', { fullPage: true })
  })
})

// ---------------------------------------------------------------------------
// Test 6: Responsive Layout — Mobile viewport
// ---------------------------------------------------------------------------

test.describe('Responsive Layout', () => {
  test('home page renders on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await gotoHome(page)

    await expect(page.locator('h1')).toContainText('English Learning App')

    await expect(page).toHaveScreenshot('home-mobile.png', { fullPage: true })
  })

  test('free talk chat works on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await gotoHome(page)

    await clickHomeCard(page, 'Free Talk')
    await expect(page.getByText('Friendly Chat')).toBeVisible()

    await page.locator('.card', { hasText: 'Friendly Chat' }).click()
    await page.waitForTimeout(1000)

    const input = page.getByPlaceholder('Type in English...')
    await input.fill('Hello, how are you today?')
    await page.locator('button', { hasText: 'Send' }).click()
    await page.waitForTimeout(2500)

    await expect(page).toHaveScreenshot('free-talk-mobile.png', { fullPage: true })
  })
})
