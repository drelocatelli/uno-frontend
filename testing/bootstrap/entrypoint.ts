import { Browser, Page } from "puppeteer";
import definedTests from "../src/defineTests";
import AutomationTestSetup from "./automationSetup";
import 'dotenv/config';

class Entrypoint extends AutomationTestSetup {

    constructor() {
        super();
        this.initializer(process.env.URL ?? 'about:blank').then(async ({ page, browser }) => {
            await this.createTestSelection(page, browser);
            page.on('load', () => {
                page.waitForSelector('select#testSelectorDrelocatelli', {timeout: 2000}).catch(async () => {
                    console.log('not found')
                    await this.addTestSelection(page, browser);
                    await this.addTestRunner(page, browser);
                });
            })
        });
    }

    async addTestSelection(page: Page, browser: Browser) {
        const tests = definedTests;
        await page.evaluate((tests) => {
            const select = document.createElement('select') as HTMLSelectElement;
            select.id = 'testSelectorDrelocatelli';
            select.name = 'test';
            select.style.cssText = 'position:fixed; top: 15px; left:15px;  z-index: 10000000000000000000000000000000; width: auto; height: auto; font-family: serif; cursor: pointer; outline: none; opacity:.3; transition: opacity .2s; font-size: 18px;';
            select.addEventListener('mouseover', () => {
                select.style.opacity = '1';
            })
            select.addEventListener('mouseleave', () => {
                select.style.opacity = '.3';
            })
            const option = document.createElement('option') as HTMLOptionElement;
            option.text = 'Test list';
            select.appendChild(option);
            for(let test of tests) {
                const option = document.createElement('option') as HTMLOptionElement;
                option.value = test.name;
                option.text = test.name;
                select.appendChild(option)
            }
            document.body.appendChild(select);

        }, tests);
    }

    async addTestRunner(page: Page, browser: Browser) {
        const tests = definedTests;

        const testSelectedExists = await page.evaluate(() => {
            //@ts-ignore
            return typeof window['testSelected'] === 'function';
        });

        let testSelected = (value: string) => {
            const testIdx = tests.findIndex(t => t.name == value);
            console.log(`Running ${tests[testIdx].name}...`)
            if(testIdx >= 0) {
                //@ts-ignore
                new tests[testIdx].class(page, browser);
            } else {
                console.error('Test not found');
            }
        }
        if(!testSelectedExists) {
            await page.exposeFunction('testSelected', testSelected);
        }
        await page.evaluate(async () => {
            const selectEl = document.querySelector('select#testSelectorDrelocatelli') as HTMLSelectElement;
            selectEl?.addEventListener('change', (e) => {
                const target = (e.target as HTMLSelectElement);
                const value = target.selectedOptions[0].value;
                testSelected(value);
                // target.selectedIndex = 0;
            })
        });
    }
    
    async createTestSelection(page: Page, browser: Browser) {
        await this.addTestSelection(page, browser);
        await this.addTestRunner(page, browser);
    }
}

new Entrypoint();