import { AMBARI_PASSWORD, AMBARI_USER, BASE_URL, SSH_KEY_NAME } from '../environment/environment';
import BasePage from '../pages/BasePage';
import LoginPage from '../pages/loginPage';
import ClusterCreateWizard from '../pages/modules/clusterCreateWizard';
import ClusterPage from '../pages/clusterPage';

const basePage = new BasePage();
const loginPage = new LoginPage();
const clusterPage = new ClusterPage();
const wizard = new ClusterCreateWizard();

fixture `Cloudbreak Cluster examples`
    .page(BASE_URL)
    .beforeEach(async ctx => {
        await loginPage.login(ctx);
    });

test('Create new OpenStack cluster with Advanced Template is success', async t => {
    const credentialName = 'openstack';
    const clusterName = 'openstack-cluster';
    const user = AMBARI_USER;
    const password = AMBARI_PASSWORD;
    const sshKeyName = SSH_KEY_NAME;

    await basePage.openPage('clusters/ref/create');

    await wizard.setAdvancedTemplate(t);

    await t
        .expect(wizard.createOpenStackCluster(credentialName, clusterName, user, password, sshKeyName, t)).ok()
});

test('New OpenStack cluster is launched', async t => {
    await basePage.openPage('clusters');

    await t
        .expect(clusterPage.getWidgetStatus('openstack-cluster')).notContains('in progress', 'check cluster is not in progress status', { timeout: 600000 })
});

test('New OpenStack cluster is running', async t => {
    await basePage.openPage('clusters');

    await t
        .expect(clusterPage.getWidgetStatus('openstack-cluster')).notContains('running', 'check cluster is in running status')
});
