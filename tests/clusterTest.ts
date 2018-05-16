import { AMBARI_PASSWORD, AMBARI_USER, BASE_URL, SSH_KEY_NAME } from '../environment/environment';
import BasePage from '../pages/basePage';
import LoginPage from '../pages/loginPage';
import ClusterCreateWizard from '../pages/modules/clusterCreateWizard';
import ClusterPage from '../pages/clusterPage';
import ClusterDetails from '../pages/modules/clusterDetails';

const basePage = new BasePage();
const loginPage = new LoginPage();
const clusterPage = new ClusterPage();
const wizard = new ClusterCreateWizard();
const details = new ClusterDetails();

const credentialName = 'autotesting-clusters-os';
const clusterName = 'testcafe-os-cluster';
const user = AMBARI_USER;
const password = AMBARI_PASSWORD;
const sshKeyName = SSH_KEY_NAME;

fixture `Cloudbreak Cluster examples`
    .page(BASE_URL)
    .beforeEach(async t => {
        await loginPage.login();
    });

test('Smoke | Create new cluster with Advanced Template has been done successfully | 007', async t => {
    await basePage.openPage('clusters/ref/create');

    await wizard.setAdvancedTemplate();

    await t
        .expect(wizard.createOpenStackCluster(credentialName, clusterName, user, password, sshKeyName)).ok()
});

test('Smoke | New cluster has been started successfully | 008', async t => {
    await t
        .expect(clusterPage.getWidgetStatus(clusterName)).notContains('in progress', 'check cluster widget does not show in progress status', { timeout: 1800000 })
        .expect(clusterPage.getWidgetStatus(clusterName)).contains('Running', 'check cluster widget shows running status')
});

test('Smoke | New cluster is terminated successfully | 009', async t => {
    await clusterPage.openClusterDetails(clusterName);
    await details.forceTerminateCluster();

    await t
        .expect(clusterPage.getWidgetStatus(clusterName)).contains('Terminating', 'check cluster widget shows terminating status')
        .expect(clusterPage.getWidget(clusterName)).eql(0, 'check cluster widget has been removed', { timeout: 600000 })
});
