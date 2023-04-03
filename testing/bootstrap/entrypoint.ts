import { Browser, Page } from "puppeteer";
import definedTests from "../src/defineTests";
import AutomationTestSetup from "./automationSetup";

class Entrypoint extends AutomationTestSetup {

    constructor() {
        super();
        this.initializer('http://localhost:3000').then(async ({ page, browser }) => {
            await this.createTestSelection(page, browser);
        });
    }
    
    async createTestSelection(page: Page, browser: Browser) {
        function capitalizeFirstLetter(str: string) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        const tests = definedTests;
        const testSelected = (value: string) => {
            const fileName = capitalizeFirstLetter(value).concat('Spec');
            const className = `new ${fileName}(${page}, ${browser})`;
            console.log(`Trying to execute '${className}'...`)
            const testIdx = tests.findIndex(t => t.name == value);
            // new tests[0].class(page, browser);
            
            if(testIdx >= 0) {
                //@ts-ignore
                new tests[testIdx].class(page, browser);
            } else {
                console.error('Test not found');
            }
        }
        await page.exposeFunction('testSelected', testSelected);
        await page.evaluate((tests) => {
            const select = document.createElement('select') as HTMLSelectElement;
            select.name = 'test';
            select.style.cssText = 'position:fixed; top: 15px; left:15px;  z-index: 10000000000000000000000000000000;';
            const option = document.createElement('option') as HTMLOptionElement;
            option.text = 'Select a test';
            select.appendChild(option);
            for(let test of tests) {
                const option = document.createElement('option') as HTMLOptionElement;
                option.value = test.name;
                option.text = test.name;
                select.appendChild(option)
            }
            document.body.appendChild(select);

            select.addEventListener('change', (e) => {
                const target = (e.target as HTMLSelectElement);
                const value = target.selectedOptions[0].value;
                testSelected(value);
            })
        }, tests);

    }
}

new Entrypoint();