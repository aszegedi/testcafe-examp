import { BASE_URL } from '../environment/environment';
import BasePage from '../pages/BasePage';
import LoginPage from '../pages/loginPage';

const basePage = new BasePage();
const loginPage = new LoginPage();

fixture `Cloudbreak Base examples`
    .page(BASE_URL)
    .beforeEach(async ctx => {
        await loginPage.login(ctx);
    });

const actualURL = basePage.getPageUrl();

test('Cloudbreak Logout is success', async t => {
    await t
        .click(basePage.logoutIcon)
        .click(basePage.confirmation)
        .expect(actualURL()).notContains('clusters')
});

test('Clusters menu item is present', async t => {
    await t
        .expect(basePage.menu.find('.menu-clusters').with({ visibilityCheck: true }).count).gte(1)
});
