import { BASE_URL } from '../environment/environment';
import LoginPage from '../pages/loginPage';
import BasePage from '../pages/basePage';

const loginPage = new LoginPage();
const basePage = new BasePage();

fixture `Cloudbreak Login examples`
    .page(BASE_URL);

const actualURL = basePage.getPageUrl();
const actualTitle = basePage.getPageTitle();

test('Cloudbreak Title is present', async t => {
    await t
        .navigateTo(BASE_URL)
        .expect(actualTitle()).eql('Hortonworks Cloudbreak')
});

test('Cloudbreak Login form is present', async t => {
    await t
        .navigateTo(BASE_URL)
        .expect(loginPage.loginForm.textContent).contains('Sign In')
});

test('Cloudbreak Login is failed', async t => {
    await loginPage.invalidLogin(t);

    await t
        .expect(loginPage.errorMessage.textContent).contains('Login failed: Incorrect email/password or the account is disabled.')
});

test('Cloudbreak Login is success', async t => {
    await loginPage.login(t);

    await t
        .expect(actualURL()).notContains('login')
});
