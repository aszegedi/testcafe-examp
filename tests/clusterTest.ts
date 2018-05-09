import { AMBARI_PASSWORD, AMBARI_USER, BASE_URL, SSH_KEY_NAME } from '../environment/environment';
import BasePage from '../pages/BasePage';
import LoginPage from '../pages/loginPage';
import ClusterCreateWizard from '../pages/modules/clusterCreateWizard';

const basePage = new BasePage();
const loginPage = new LoginPage();
const wizard = new ClusterCreateWizard();

fixture `Cloudbreak Cluster examples`
    .page(BASE_URL)
    .beforeEach(async ctx => {
        await loginPage.login(ctx);
    });

test('Create new OpenStack cluster is success', async t => {
    const credentialName = 'openstack';
    const clusterName = 'autotesting-os';
    const user = AMBARI_USER;
    const password = AMBARI_PASSWORD;
    const sshKeyName = SSH_KEY_NAME;

    await basePage.openPage('clusters/ref/create');

    await wizard.setAdvancedTemplate(t);

    await t
        .expect(wizard.createOpenStackCluster(credentialName, clusterName, user, password, sshKeyName, t)).ok()
});
