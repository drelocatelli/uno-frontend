import puppeteer, { Browser, Page } from 'puppeteer';
import fs from 'fs';
import readline from 'readline';
abstract class AutomationTestSetup {
    async initializer(url: string, waitInitialContainer?: string): Promise<{ page: Page; browser: Browser }> {
        const browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-maximized'] });
        const page = await browser.newPage();
        
        await this.open(page, url, waitInitialContainer);
        
        return { browser, page };
    }
    
    async open(page: Page, url: string, waitInitialContainer?: string) {
        await page.goto(url);
        if(waitInitialContainer) {
            await page.waitForSelector(waitInitialContainer);
        }
    }

    protected async getFilesInDir(dir: string) {
        const files = fs.readdirSync(dir);
        return files.filter(f => !f.startsWith('basic')).map(t => t = t.replace('.spec.ts', ''));
    }
    
    randomNumber(quantity: number) {
        let num = '';
        for (let i = 0; i < quantity; i++) {
            num += Math.floor(Math.random() * 10);
        }
        let randomNum = BigInt(num);
        return randomNum.toString();
    }

    generateRandomUser(charactersQuantity: number) : string {
        let username = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;

        for (let i = 0; i < charactersQuantity; i++) {
            username += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return username;
    }
    
    async readConsole(question: string) {
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
