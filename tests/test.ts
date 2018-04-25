import { BASE_URL } from '../environment/environment';
import LoginPage from '../pages/loginPage';
import { ClientFunction } from 'testcafe';

fixture `A set of TestCafe examples`
    .page(BASE_URL);

const page = new LoginPage();

test('Cloudbreak title', async t => {
    const cloudbreakTitle = await page.getCloudbreakTitle();

    await t
        .navigateTo(BASE_URL)
        .expect(cloudbreakTitle()).eql('Hortonworks Cloudbreak')
});

test('Cloudbreak Login form', async t => {
    const loginFormTitle = await page.getLoginFormTitle();

    await t
        .navigateTo(BASE_URL)
        .expect(loginFormTitle).contains('Sign In')
});

test('Cloudbreak Login', async t => {
    const getLocation  = ClientFunction(() => document.location.href.toString());

    await t
        .useRole(page.defaultUser)
        .expect(getLocation()).notContains('login')
});
