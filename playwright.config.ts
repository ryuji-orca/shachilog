import { defineConfig, devices } from '@playwright/test'

const PORT = process.env.PORT || '3000'

if (!PORT) {
	throw new Error(`PORT environment variable is required`)
}

export default defineConfig({
	testDir: 'src/test/e2e',
	timeout: 15 * 1000,
	expect: {
		timeout: 5 * 1000,
	},

	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'html',
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: `http://localhost:${PORT}/`,

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'chromium',
			// use: { ...devices['Desktop Chrome'] },
			use: {
				...devices['Desktop Chrome'],
				launchOptions: {
					args: [
						'--allow-file-access-from-files',
						'--use-fake-ui-for-media-stream',
						'--use-fake-device-for-media-stream',
						'--use-file-for-fake-audio-capture=tests/sample.wav',
					],
				},
			},
		},
	],

	/* Folder for test artifacts such as screenshots, videos, traces, etc. */
	outputDir: 'test-results/',

	webServer: {
		command: 'yarn dev',
		// command: process.env.CI ? 'yarn start:mocks' : 'yarn dev',
		port: Number(PORT),
		reuseExistingServer: true,
		stdout: 'pipe',
		stderr: 'pipe',
		env: {
			PORT,
			NODE_ENV: 'test',
		},
	},
})
