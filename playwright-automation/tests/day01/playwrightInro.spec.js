//const {test} = require ("@playwright/test")

import {test} from "@playwright/test"

test ("simple googletest",async({page}) => {
    await page.goto("https://google.com");
    await page.waitForTimeout(3000);
});







