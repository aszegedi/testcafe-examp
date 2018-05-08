import { BASE_URL } from '../environment/environment';
import BasePage from '../pages/BasePage';
import LoginPage from '../pages/loginPage';

const basePage = new BasePage();
const loginPage = new LoginPage();

fixture `Cloudbreak Credential examples`
    .page(BASE_URL)
    .beforeEach(async ctx => {
        await loginPage.login(ctx);
    });

const actualURL = basePage.getPageUrl();

test('Cloudbreak Credentials page is opened', async t => {
    await basePage.openPage('Credentials');

    await t
        .expect(actualURL()).contains('credentials')
});
