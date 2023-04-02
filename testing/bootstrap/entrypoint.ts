import 'dotenv/config';
import puppeteer, { Browser, Page } from 'puppeteer';
import readline from "readline";

class AutomationTestSetup {

    constructor() {
        (async () => {
            const {browser, page} = await this.initializer();
            this.open(page);
        })();
    }
    
    async initializer() : Promise<{page: Page, browser: Browser}> {
        const browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-maximized'] });
        const page = await browser.newPage();
        
        return {browser, page};
    }
    
    async open(page: Page) {
        const port = process.env.PORT ?? 3000;
        console.log(`Running test on http://localhost:${port}`);
        await page.goto(`http://localhost:${port}`);

    }

    randomNumber(quantity: number) {
        let num = '';
        for (let i = 0; i < quantity; i++) {
            num += Math.floor(Math.random() * 10);
        }
        let randomNum = BigInt(num);
        return randomNum.toString();
    }

    async readLine(question: string) {

        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });
    
        return new Promise(resolve => {
    
            rl.question(question, (answer) => {
              rl.close();
              resolve(answer)
            });
        })
    }
}

export default AutomationTestSetup;