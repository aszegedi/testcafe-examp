import { AMBARI_PASSWORD, AMBARI_USER, BASE_URL, SSH_KEY } from '../environment/environment';
import BasePage from '../pages/BasePage';
import LoginPage from '../pages/loginPage';
import ClusterCreateWizard from '../pages/modules/clusterCreateWizard';
import ClusterPage from '../pages/clusterPage';
import ClusterDetails from '../pages/modules/clusterDetails';

const basePage = new BasePage();
const loginPage = new LoginPage();
const clusterPage = new ClusterPage();
const wizard = new ClusterCreateWizard();
const details = new ClusterDetails();

const credentialName = 'azure';
const clusterName = 'azure-cluster';
const user = AMBARI_USER;
const password = AMBARI_PASSWORD;
const sshKey = SSH_KEY;

fixture `Cloudbreak Cluster examples`
    .page(BASE_URL)
    .beforeEach(async ctx => {
        await loginPage.login(ctx);
    });

test('Create new Azure cluster with Advanced Template is success', async t => {
    await basePage.openPage('clusters/ref/create');

    await wizard.setAdvancedTemplate(t);

    await t
        .expect(wizard.createAzureCluster(credentialName, clusterName, user, password, sshKey, t)).ok()
});

test('New Azure cluster is launched', async t => {
    await t
        .expect(clusterPage.getWidgetStatus(clusterName)).notContains('in progress', 'check cluster is not in progress status', { timeout: 1200000 })
});

test('New Azure cluster is running', async t => {
    await t
        .expect(clusterPage.getWidgetStatus(clusterName)).contains('Running', 'check cluster is in running status')
});

test('New Azure cluster is terminating', async t => {
    await clusterPage.openClusterDetails(clusterName, t);
    await details.forceTerminateCluster(t);

    await t
        .expect(clusterPage.getWidgetStatus(clusterName)).contains('Terminating', 'check cluster is in terminating status')
});

test('New Azure cluster is terminated', async t => {
    await t
        .expect(clusterPage.getWidget(clusterName)).eql(0, 'check cluster widget has been removed', { timeout: 600000 })
});
