import { BASE_URL } from '../environment/environment';
import LoginPage from '../pages/loginPage';
import BasePage from '../pages/basePage';

const loginPage = new LoginPage();
const basePage = new BasePage();

fixture `Cloudbreak Login examples`
    .page(BASE_URL);

const actualURL = basePage.getPageUrl();
const actualTitle = basePage.getPageTitle();

test('Smoke | Cloudbreak page Title is present| 001', async t => {
    await t
        .navigateTo(BASE_URL)
        .expect(actualTitle()).eql('Hortonworks Cloudbreak', 'check Cloudbreak page title is "Hortonworks Cloud"')
});

test('Smoke | Cloudbreak Login has been failed for invalid user credentials | 002', async t => {
    await loginPage.invalidLogin();

    await t
        .expect(loginPage.errorMessage.textContent).contains('Login failed: Incorrect email/password or the account is disabled.')
});

test('Smoke | Valid Cloudbreak user has been logged in successfully | 003', async t => {
    await loginPage.login();

    await t
        .expect(actualURL()).notContains('login', 'check actual URL does not contain "login"')
});
