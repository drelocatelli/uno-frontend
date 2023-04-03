import { Browser, Page } from "puppeteer";
import AutomationTestSetup from "../../bootstrap/AutomationTestSetup";

class ResponsivityTest extends AutomationTestSetup {
    init() {
        this.initializer().then(async ({page, browser}) => {
            await page.waitForSelector('.container');
            await this.takeSnapshot(page, browser);    
        })
    }

    async takeSnapshot(page: Page, browser: Browser) {
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

new ResponsivityTest().init();

export default ResponsivityTest;