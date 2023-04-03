import { Page } from 'puppeteer';
import AutomationTestSetup from '../bootstrap/AutomationTestSetup';
import LoginTest from './login';

class Test extends AutomationTestSetup {
    tests = {
        login: (page: Page) => new LoginTest(page),
    };

    constructor() {
        super();
        this.initializer('.container').then(async ({ page, browser }) => {
            while (true) {
                await this.runTests([
                    this.tests.login(page)
                ]);
                await this.readLine('Select [Enter]: ');
            }
        });
    }

    async runTests(testOrder: Array<any>) {
        try {
            await Promise.all(testOrder);
        } catch (err) {
            console.log(err);
        }
    }
}

new Test();
