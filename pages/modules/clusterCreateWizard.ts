import { Selector, t } from 'testcafe';

export default class ClusterCreateWizard {
    public templateSwitch: any = Selector('app-basic-advanced-toggler i');
    public credentialSelector: any = Selector('[placeholder="Please select credential"]');
    public clusterNameField: any = Selector('#clusterName');
    public baseImageTab = Selector('mat-radio-button').withText('Base Image');
    public nextButton = Selector('.action-container .btn.btn-primary', { visibilityCheck: true });
    public userField = Selector('input[formcontrolname="username"]');
    public passwordField = Selector('input[formcontrolname="password"]');
    public confirmPasswordField = Selector('input[formcontrolname="passwordConfirmation"]');
    public sshTextarea = Selector('[formcontrolname="publicKey"]');
    public sshSelector = Selector('#cb-cluster-create-security-ssh-key-name-select');
    public createButton = Selector('.btn.btn-primary.text-uppercase');

    async elementWithTag(tagName: string) {
        let element = Selector(tag => document.getElementsByTagName(tag));
        const visibleElement = element.with({
            visibilityCheck: true
        });

        return await visibleElement(tagName);
    }

    async setAdvancedTemplate() {
        await t
            .maximizeWindow()
            .click(this.templateSwitch)
    }

    async clickNextOnPage(pageAppName: string) {
        await this.elementWithTag(pageAppName);
        await t
            .expect(this.nextButton.hasAttribute('disabled')).notOk({ timeout: 5000 })
            .click(this.nextButton, { speed: 0.5 })
    }

    async generalConfiguration(credentialName: string, clusterName: string) {
        await t
            .click(this.credentialSelector, { speed: 0.5 })
            .click(Selector('mat-option').withText(credentialName))
            .typeText(this.clusterNameField, clusterName, { replace: true })
            .click(this.baseImageTab, { speed: 0.5 })
    }

    async disableGatewayTopology() {
        const gatewaySlider = Selector('app-gateway-configuration mat-slide-toggle');

        await t
            .click(gatewaySlider)
    }

    async setAmbariCredentials(user: string, password: string) {
        await t
            .typeText(this.userField, user, { replace: true })
            .typeText(this.passwordField, password, { replace: true })
            .typeText(this.confirmPasswordField, password, { replace: true})
    }

    async selectSSHKey(name: string) {
        await t
            .click(this.sshSelector)
            .click(Selector('mat-option').withText(name))
    }

    async createOpenStackCluster(credentialName: string, clusterName: string, user: string, password: string, sshKeyName: string, network?: string, subnet?: string, securityGroupMaster?: string, securityGroupWorker?: string, securityGroupCompute?: string) {
        await this.setAdvancedTemplate();
        await this.generalConfiguration(credentialName, clusterName);
        await this.clickNextOnPage('app-general-configuration');
        await this.clickNextOnPage('app-hardware-and-storage');
        await this.clickNextOnPage('app-config-cluster-extensions');
        await this.clickNextOnPage('app-config-external-sources');
        await this.disableGatewayTopology();
        await this.clickNextOnPage('app-gateway-configuration');
        await this.clickNextOnPage('app-network');
        await this.setAmbariCredentials(user, password);
        await this.selectSSHKey(sshKeyName);

        await t
            .click(this.createButton);
    }
}