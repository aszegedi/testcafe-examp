import { BASE_URL } from '../environment/environment';
import { BasePage } from '../pages/basePage';

fixture `A set of TestCafe examples`
    .page(BASE_URL);

const page = new BasePage();

test('Cloudbreak title', async t => {
    const cloudbreakTitle = await page.getCloudbreakTitle();

    await t
        .navigateTo(BASE_URL)
        .expect(cloudbreakTitle()).eql('Hortonworks Cloudbreak');
});

test('Cloudbreak Login form', async t => {
    const loginFormTitle = await page.getLoginFormTitle();

    await t
        .navigateTo(BASE_URL)
        .expect(loginFormTitle).contains('Sign In');
});
