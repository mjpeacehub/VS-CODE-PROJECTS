const { faker } = require('@faker-js/faker');

class CommonUI {

    static async login(page) {
        const credentials = Buffer.from(`${process.env.SEP_QA_USERNAME}:${process.env.SEP_QA_PASSWORD}`).toString('base64');
        await page.setExtraHTTPHeaders({
            'Authorization': `Basic ${credentials}`
        });
    }

    static async completeStartApplication(page, {
        firstName = faker.person.firstName(),
        lastName = faker.person.lastName(),
        email = faker.internet.email({ firstName, lastName, provider: 'example.com' }),
        phoneNumber = faker.string.numeric(10),
        referralSource = faker.helpers.arrayElement([
            'Email',
            'Facebook',
            'Google',
            'Instagram',
            'LinkedIN',
            'Twitter',
            'Referred by a friend or colleague',
            'Other'
        ])
    } = {}) {
        await this.login(page);
        await page.goto(process.env.SEP_QA_URL);

        await page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
        await page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
        await page.getByRole('textbox', { name: 'Email Address' }).fill(email);
        await page.getByRole('textbox', { name: 'Phone' }).fill(phoneNumber);

        await page.getByText('How did you hear about us?', { exact: true }).click();
        await page.getByRole('option', { name: referralSource, exact: true }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByText('Choose a payment plan', { exact: true }).waitFor();

        return { firstName, lastName, email, phoneNumber, referralSource };
    }
}

module.exports = { CommonUI };
