import { BASE_URL } from '../environment/environment';
import LoginPage from '../pages/loginPage';
import BasePage from '../pages/basePage';

const loginPage = new LoginPage();
const basePage = new BasePage();

fixture `Cloudbreak Login examples`
    .page(BASE_URL);

const actualURL = basePage.getPageUrl();
const actualTitle = basePage.getPageTitle();

test('Cloudbreak page Title is present', async t => {
    await t
        .navigateTo(BASE_URL)
        .expect(actualTitle()).eql('Hortonworks Cloudbreak', 'check Cloudbreak page title is "Hortonworks Cloud"')
});

test('Cloudbreak Login has been failed for invalid user credentials', async t => {
    await loginPage.invalidLogin(t);

    await t
        .expect(loginPage.errorMessage.textContent).contains('Login failed: Incorrect email/password or the account is disabled.')
});

test('Valid Cloudbreak user has been logged in successfully ', async t => {
    await loginPage.login(t);

    await t
        .expect(actualURL()).notContains('login', 'check actual URL does not contain "login"')
});
