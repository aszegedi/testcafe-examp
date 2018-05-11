import { BASE_URL, OS_APIFACING, OS_AUTH_URL, OS_PASSWORD, OS_TENANT_NAME, OS_USERNAME } from '../environment/environment';
import BasePage from '../pages/basePage';
import LoginPage from '../pages/loginPage';
import CredentialCreateWizard from '../pages/modules/credentialCreateWizard';

const basePage = new BasePage();
const loginPage = new LoginPage();
const wizard = new CredentialCreateWizard();

fixture `Cloudbreak Credential examples`
    .page(BASE_URL)
    .beforeEach(async ctx => {
        await loginPage.login(ctx);
    });

test('New OpenStack credential has been created successfully', async t => {
    const credentialName = 'autotesting-os';
    const keystoneVersion = 'v2';
    const user = OS_USERNAME;
    const password = OS_PASSWORD;
    const tenantName = OS_TENANT_NAME;
    const endpoint = OS_AUTH_URL;
    const apiFacing = OS_APIFACING.charAt(0).toUpperCase() + OS_APIFACING.slice(1);

    await basePage.openPage('getstarted');

    await wizard.selectProvider('openstack', t);

    await t
        .expect(wizard.createOpenStackCredential(keystoneVersion, credentialName, user, password, tenantName, endpoint, apiFacing, t)).ok('check OpenStack V2 credential has been created with no error')
});
