import { BASE_URL } from '../environment/environment';
import { ClientFunction } from 'testcafe';
import LoginPage from '../pages/loginPage';
import BasePage from '../pages/BasePage';
import { AngularSelector, waitForAngular } from 'testcafe-angular-selectors';

fixture `Cloudbreak Base examples`
    .page(BASE_URL);

const loginPage = new LoginPage();
const basePage = new BasePage();

test('Cloudbreak Logout is success', async t => {
    const getPageUrl  = ClientFunction(() => window.location.href);

    await t
        .useRole(loginPage.defaultUser)
        .click(basePage.logoutIcon)
        .click(basePage.confirmation)
        .expect(getPageUrl()).notContains('clusters')
});
