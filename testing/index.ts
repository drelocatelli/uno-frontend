import 'dotenv/config';
import puppeteer from "puppeteer";

(async() => {
    const port = process.env.PORT ?? 3000;
    console.log(`Running test on http://localhost:${port}`)
    const browser = await puppeteer.launch({headless: false, defaultViewport: null, args: ['--start-maximized']});
    const page = await browser.newPage();
    await page.goto(`http://localhost:${port}`);
    // await browser.close();

    // wait for guest page
    await page.$('div.content__guest');

    // question wheter user is guest or not
    const isGuestLogin = await page.evaluate(async () => {
        let dialog = window.confirm('Deseja fazer login como guest?')
        return dialog;
    });

    if(isGuestLogin) {
        // set random username
        const guestInputUsername = await page.waitForSelector('div.content__guest input[name="username"]');
        guestInputUsername?.type(randomNumber(10))
        // click enter
        const btnEnter = await page.waitForSelector('div.content__guest button[name="enter"]');
        setTimeout(async () => {
            await btnEnter?.evaluate(b => b.click())
        }, 2000)
    }
    
    
})();


function randomNumber(quantity: number) {
        let num = '';
    for (let i = 0; i < quantity; i++) {
    num += Math.floor(Math.random() * 10);
    }
    let randomNum = BigInt(num);
    return randomNum.toString();
}