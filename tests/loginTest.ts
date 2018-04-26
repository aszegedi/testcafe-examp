import { BASE_URL } from '../environment/environment';
import LoginPage from '../pages/loginPage';
import { ClientFunction } from 'testcafe';

fixture `Cloudbreak Login examples`
    .page(BASE_URL);

const page = new LoginPage();

test('Cloudbreak Title is present', async t => {
    const cloudbreakTitle = await page.getCloudbreakTitle();

    await t
        .navigateTo(BASE_URL)
        .expect(cloudbreakTitle()).eql('Hortonworks Cloudbreak')
});

test('Cloudbreak Login form is present', async t => {
    const loginFormTitle = await page.getLoginFormTitle();

    await t
        .navigateTo(BASE_URL)
        .expect(loginFormTitle).contains('Sign In')
});

test('Cloudbreak Login is success', async t => {
    const getPageUrl  = ClientFunction(() => window.location.href);

    await t
        .useRole(page.defaultUser)
        .expect(getPageUrl()).notContains('login')
});
