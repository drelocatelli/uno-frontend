import { Browser, Page } from 'puppeteer';
import AutomationTestSetup from '../bootstrap/AutomationTestSetup';
import LoginTest from './tests/login.spec';
import ResponsivityTest from './tests/responsivity.spec';

class Test extends AutomationTestSetup {
    tests = {
        login: (page: Page) => new LoginTest(page),
        responsivity: (page: Page, browser: Browser) => new ResponsivityTest(page, browser),
    };

    constructor() {
        super();
        this.initializer('.container').then(async ({ page, browser }) => {
            while (true) {
                // select test order
                await this.runTests([
                    this.tests.login(page),
                ]);
            }
        });
    }
    
    async runTests(testOrder: Array<any>) {
        try {
            await Promise.all(testOrder);
            await this.readLine('Select [Enter]: ');
        } catch (err) {
            console.log(err);
        }
    }
}

new Test();
