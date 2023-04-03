import { Browser, Page } from 'puppeteer';
import AutomationTestSetup from '../bootstrap/AutomationTestSetup';
import LoginTest from './tests/login.spec';
import LogoutTest from './tests/logout.spec';
import ResponsivityTest from './tests/responsivity.spec';

class Test extends AutomationTestSetup {
    tests = {
        login: (page: Page) => new LoginTest(page),
        logout: (page: Page) => new LogoutTest(page),
        responsivity: (page: Page, browser: Browser) => new ResponsivityTest(page, browser),
    };

    constructor() {
        super();
        this.initializer('.container').then(async ({ page, browser }) => {
            await this.runTests([this.tests.login(page), this.tests.logout(page)]);
        });
    }

    async runTests(testOrder: Array<any>) {
        try {
            await Promise.all([testOrder]);
        } catch (err) {
            console.log(err);
        }
    }
}

new Test();
