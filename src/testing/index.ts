import 'dotenv/config';
import puppeteer, { Browser, Page } from 'puppeteer';
import readline from 'readline';

abstract class AutomationTestSetup {
    
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
              resolve(answer.toLowerCase())
            });
        })
    }

    async readDialog(page: Page, message: string, type: ('alert' | 'prompt' | 'confirm') = 'alert') : Promise<any> {
        console.log('type', type)
        return await page.evaluate(async (type, message) => {
            let dialog = undefined;
            switch(type) {
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
        }, type, message)
    }
}

class AutomationTest extends AutomationTestSetup {

    constructor() {
        super();
        (async () => {
            const {browser, page} = await this.initializer();
            this.open(page);
            this.assertLogin(page);
        })();
    }

    async assertLogin(page: Page) {
        await page.waitForSelector('div.content__guest');
        // const guestOrUser = await this.readLine('Do you want to login as a guest? [Y/n]: ') as ('y'|'n');
        const guestOrUser = await this.readDialog(page, 'Do you want to login as a guest?: ', 'confirm');
        console.log(guestOrUser)

    }
    
}

new AutomationTest();


// (async () => {
//     const port = process.env.PORT ?? 3000;
//     console.log(`Running test on http://localhost:${port}`);
//     const browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-maximized'] });
//     const page = await browser.newPage();
//     await page.goto(`http://localhost:${port}`);
//     // await browser.close();

//     // wait for guest page
//     await page.$('div.content__guest');

//     // question wheter user is guest or not
//     const isGuestLogin = await page.evaluate(async () => {
//         let dialog = window.confirm('Deseja fazer login como guest?');
//         return dialog;
//     });

//     if (isGuestLogin) {
//         // set random username
//         const guestInputUsername = await page.waitForSelector('div.content__guest input[name="username"]');
//         guestInputUsername?.type(randomNumber(10));
//         // click enter
//         const btnEnter = await page.waitForSelector('div.content__guest button[name="enter"]');
//         setTimeout(async () => {
//             await btnEnter?.evaluate((b) => b.click());
//         }, 2000);
//     }
// })();