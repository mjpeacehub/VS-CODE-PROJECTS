export class CommonUI {

    static async login(page) {
        const credentials = Buffer.from(`${process.env.SEP_QA_USERNAME}:${process.env.SEP_QA_PASSWORD}`).toString('base64');
        await page.setExtraHTTPHeaders({
            'Authorization': `Basic ${credentials}`
        });
    }
}

module.exports = CommonUI;
