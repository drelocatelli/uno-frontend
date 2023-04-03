import { Browser, Page } from "puppeteer";
import AutomationTestSetup from "../../bootstrap/AutomationTestSetup";

class ResponsivityTest extends AutomationTestSetup {
    constructor(page: Page, browser: Browser) {
        super();
        this.assert(page, browser);
    }
    
    init() {
        this.initializer().then(async ({page, browser}) => {
            await page.waitForSelector('.container');
            await this.assert(page, browser);    
        })
    }
    
    async assert(page: Page, browser: Browser) {
        const question = await this.readLine('Take snapshot? [Y|n]:') as ('y' | 'n');
        console.log('question', question)
        if(question == 'y') {
            await page.setViewport({isMobile: true, width: 320, height: 480});
            setTimeout(async () => {
                await page.screenshot({
                    path: './src/assets/mobile.png'
                })
            }, 2000);
            await page.setViewport({isMobile: true, width: 768, height: 1024});
            setTimeout(async () => {
                await page.screenshot({
                    path: './src/assets/tablet.png'
                })
            }, 2000);
            await page.setViewport({isMobile: false, width: 0, height: 0});
            setTimeout(async () => {
                await page.screenshot({
                    path: './src/assets/desktop.png'
                });
            }, 2000);
            browser.close();
        } 
    }


}

export default ResponsivityTest;