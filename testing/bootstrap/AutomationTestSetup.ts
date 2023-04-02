import puppeteer, { Browser, Page } from 'puppeteer';
import readline from 'readline';

abstract class AutomationTestSetup {
    async initializer(waitInitialContainer?: string): Promise<{ page: Page; browser: Browser }> {
        const browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-maximized'] });
        const page = await browser.newPage();
        
        await this.open(page);
        
        if(waitInitialContainer) {
            await page.waitForSelector(waitInitialContainer);
        }
        return { browser, page };
    }

    async open(page: Page) {
        const port = process.env.PORT ?? 3000;
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

    generateRandomUser() : string {
        let username = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;

        for (let i = 0; i < 30; i++) {
            username += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return username;
    }

    async readLine(question: string) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        return new Promise((resolve) => {
            rl.question(question, (answer) => {
                rl.close();
                resolve(answer.toLowerCase());
            });
        });
    }

    async readDialog(page: Page, message: string, type: 'alert' | 'prompt' | 'confirm' = 'alert') {
        return await page.evaluate(
            async (type, message) => {
                let dialog: any = undefined;
                switch (type) {
                    case 'alert':
                        dialog = window.alert(message);
                        break;
                    case 'confirm':
                        dialog = window.confirm(message);
                        break;
                    case 'prompt':
                        dialog = window.prompt(message);
                        break;
                }

                return dialog;
            },
            type,
            message,
        );
    }
}

export default AutomationTestSetup;