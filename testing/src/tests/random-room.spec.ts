import { Browser, Page } from "puppeteer";
import AutomationTestSetup from "../../bootstrap/automationSetup";

class RandomRoomTest extends AutomationTestSetup {
    constructor(page: Page, browser: Browser) {
        super();
        this.assert(page);
    }

    async assert(page: Page) {
        await page.waitForSelector('.rooms');
        await page.evaluate(() => {
            const roomsSelector = document.querySelectorAll('input[name="room"]') as NodeListOf<HTMLInputElement>;
            for(let room of roomsSelector) {
                if(!room.disabled) {
                    room.click();
                }
            }
        });
        const enterRoomBtn = await page.waitForSelector('button[type="submit"]');
        enterRoomBtn?.evaluate(btn => {
            (btn as HTMLButtonElement).click();
        })
    }
}

export default RandomRoomTest;