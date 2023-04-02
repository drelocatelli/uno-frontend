import { Page } from "puppeteer";
import AutomationTestSetup from "../bootstrap/AutomationTestSetup";

class AutomationTest extends AutomationTestSetup {
    constructor() {
        super();
        this.initializer().then(({page, browser}) => {
            this.assertLogin(page);
        })
    }
    
    async assertLogin(page: Page) {
        try {
            await page.waitForSelector('div.content__guest', { timeout: 500 });
            const guestInputUsername = await page.waitForSelector('div.content__guest input[name="username"]');
            guestInputUsername?.type(this.randomNumber(10));
            // click enter
            const btnEnter = await page.waitForSelector('div.content__guest button[name="enter"]');
            setTimeout(async () => {
                await btnEnter?.evaluate((b) => b.click());
            }, 2000);
        } catch (err) {
            const createAccBtn = await page.waitForSelector('button[name="createAccount"]');
            createAccBtn?.evaluate(btn  => (btn as HTMLButtonElement).click());

            const randomUser = this.generateRandomUser();
            const randomPass = this.randomNumber(10);

            const usernameIn = await page.waitForSelector('input[name="username"]');
            usernameIn?.evaluate( async (el : HTMLInputElement, randomUser) => {
                el.value = randomUser;
            }, randomUser);

            const emailIn = await page.waitForSelector('input[name="email"]');
            emailIn?.evaluate( async (el : HTMLInputElement, randomUser) => {
                el.value = `${randomUser}@example.com`;
            }, randomUser);

            const passwordIn = await page.waitForSelector('input[name="password"]');
            passwordIn?.evaluate( async (el : HTMLInputElement, randomPass) => {
                el.value = randomPass;
            }, randomPass);

            const registerBtn = await page.waitForSelector('button[name="register"]');
            setTimeout(async () => {
                registerBtn?.evaluate((el: HTMLButtonElement) => el.click())
            }, 2000);
        }
    }

}

new AutomationTest();