import { Page } from 'puppeteer';
import AutomationTestSetup from '../../bootstrap/AutomationTestSetup';

class LogoutTest extends AutomationTestSetup {
    constructor(page: Page) {
        super();
        this.assert(page);
    }

    async assert(page: Page) {
        await page.waitForSelector('.user-profile-menu');
        const question = await this.readDialog(page, 'Logout?', 'confirm');
        if (question) {
            const menu = await page.waitForSelector('.menu');
            menu?.evaluate((btn) => {
                (btn as HTMLButtonElement).click();
            });

            setTimeout(async () => {
                await page.evaluate(() => {
                    const logoutBtn = document.querySelector('.menu-widget li#logoutBtn') as HTMLButtonElement;
                    logoutBtn.click();
                });
            }, 1000);
        }
    }
}

export default LogoutTest;
