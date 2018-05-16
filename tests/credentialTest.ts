import { BASE_URL, OS_APIFACING, OS_AUTH_URL, OS_PASSWORD, OS_TENANT_NAME, OS_USERNAME } from '../environment/environment';
import BasePage from '../pages/basePage';
import LoginPage from '../pages/loginPage';
import CredentialCreateWizard from '../pages/modules/credentialCreateWizard';
import CredentialPage from '../pages/credentialPage';

const basePage = new BasePage();
const loginPage = new LoginPage();
const credentialPage = new CredentialPage();
const wizard = new CredentialCreateWizard();

fixture `Cloudbreak Credential examples`
    .page(BASE_URL)
    .beforeEach(async t => {
        t.ctx.credentialName = 'autotesting-os';
        await loginPage.login();
    });

test('Smoke | New OpenStack credential has been created successfully | 006', async t => {
    const keystoneVersion = 'v2';
    const user = OS_USERNAME;
    const password = OS_PASSWORD;
    const tenantName = OS_TENANT_NAME;
    const endpoint = OS_AUTH_URL;
    const apiFacing = OS_APIFACING.charAt(0).toUpperCase() + OS_APIFACING.slice(1);

    await basePage.openPage('getstarted');

    await wizard.selectProvider('openstack');

    await t
        .expect(wizard.createOpenStackCredential(keystoneVersion, t.ctx.credentialName, user, password, tenantName, endpoint, apiFacing)).ok('check OpenStack V2 credential has been created with no error')
})
    .after( async t => {
        await basePage.openPage('credentials');

        await credentialPage.deleteCredential(t.ctx.credentialName);
});
