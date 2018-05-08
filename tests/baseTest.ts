import { BASE_URL } from '../environment/environment';
import BasePage from '../pages/BasePage';
import LoginPage from '../pages/loginPage';

fixture `Cloudbreak Base examples`
    .page(BASE_URL);

const basePage = new BasePage();
const loginPage = new LoginPage();

const actualURL = basePage.getPageUrl();

test('Cloudbreak Logout is success', async t => {
    await loginPage.login();

    await t
        .click(basePage.logoutIcon)
        .click(basePage.confirmation)
        .expect(actualURL()).notContains('clusters')
});

test('Cloudbreak Menu is present', async t => {
    await loginPage.login();

    await t
        .expect(basePage.menu)
});

test('Clusters menu item is present', async t => {
    await loginPage.login();

    await t
        .expect(basePage.menu.find('.menu-clusters').with({ visibilityCheck: true }).count).gte(1)
});
