import { Browser, Page } from 'puppeteer';
import AutomationTestSetup from '../bootstrap/AutomationTestSetup';
import LoginTest from './tests/login.spec';
import LogoutTest from './tests/logout.spec';
import fs from 'fs';

class Test extends AutomationTestSetup {
    tests = {
        login: (page: Page) => new LoginTest(page),
        logout: (page: Page) => new LogoutTest(page),
    };

    constructor() {
        super();
        this.initializer('.container').then(async ({ page, browser }) => {
            await this.runTests([]);
            await this.createTestSelection(page);
        });
    }

    async runTests(testOrder: Array<any>) {
        try {
            await Promise.all([testOrder]);
        } catch (err) {
            console.log(err);
        }
    }

    private async getFilesInDir(dir: string) {
        const files = fs.readdirSync(dir);
        return files.filter(f => !f.startsWith('basic')).map(t => t = t.replace('.spec.ts', ''));
      }

      
      async createTestSelection(page: Page) {
        const testSelected = (value: string) => {
            //@ts-ignore
            this.tests[value](page);
        }

        await page.exposeFunction('testSelected', testSelected);
        const files = await this.getFilesInDir('./src/tests');
        await page.evaluate((files) => {
            const select = document.createElement('select') as HTMLSelectElement;
            select.name = 'test';
            select.style.cssText = 'position:fixed; top: 15px; left:15px';
            const option = document.createElement('option') as HTMLOptionElement;
            option.text = 'Select a test';
            select.appendChild(option);
            for(let file of files) {
                const option = document.createElement('option') as HTMLOptionElement;
                option.value = file;
                option.text = file;
                select.appendChild(option)
                console.log(file)
            }
            document.body.appendChild(select);

            select.addEventListener('change', (e) => {
                const target = (e.target as HTMLSelectElement);
                const value = target.selectedOptions[0].value;
                testSelected(value);
            })
        }, files);

    }
}

new Test();
