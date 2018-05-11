import { Selector } from 'testcafe';

export default class ClusterCreateWizard {
    public templateSwitch: any = Selector('app-basic-advanced-toggler i');
    public credentialSelector: any = Selector('[placeholder="Please select credential"]');
    public clusterNameField: any = Selector('#clusterName');
    public baseImageTab = Selector('mat-radio-button').withText('Base Image');
    public nextButton = Selector('button').withText('Next');
    public userField = Selector('input[formcontrolname="username"]');
    public passwordField = Selector('input[formcontrolname="password"]');
    public confirmPasswordField = Selector('input[formcontrolname="passwordConfirmation"]');
    public sshTextarea = Selector('[formcontrolname="publicKey"]');
    public sshSelector = Selector('#cb-cluster-create-security-ssh-key-name-select');
    public createButton = Selector('.btn.btn-primary.text-uppercase');

    async setAdvancedTemplate(t) {
        await t
            .maximizeWindow()
            .click(this.templateSwitch)
    }
    
    async createOpenStackCluster(
        credentialName: string,
        clusterName: string,
        user: string,
        password: string,
        sshKeyName: string,
        t,
        network?: string,
        subnet?: string,
        securityGroupMaster?: string,
        securityGroupWorker?: string,
        securityGroupCompute?: string
    ) {
        await t
            .click(this.credentialSelector)
            .click(Selector('mat-option').withText(credentialName))
            .typeText(this.clusterNameField, clusterName, { replace: true })
            .click(this.baseImageTab)
            .click(this.nextButton, { speed: 0.5 })
            .click(this.nextButton, { speed: 0.5 })
            .click(this.nextButton, { speed: 0.5 })
            .click(this.nextButton, { speed: 0.5 })
            .click(this.nextButton, { speed: 0.5 })
            .typeText(this.userField, user, { replace: true })
            .typeText(this.passwordField, password, { replace: true })
            .typeText(this.confirmPasswordField, password, { replace: true })
            .click(this.sshSelector)
            .click(Selector('mat-option').withText(sshKeyName))
            .click(this.createButton);
    }

    async createAzureCluster(
        credentialName: string,
        clusterName: string,
        user: string,
        password: string,
        sshKey: string,
        t,
        network?: string,
        subnet?: string,
        securityGroupMaster?: string,
        securityGroupWorker?: string,
        securityGroupCompute?: string
    ) {
        await t
            .click(this.credentialSelector)
            .click(Selector('mat-option').withText(credentialName))
            .typeText(this.clusterNameField, clusterName, { replace: true })
            .click(this.baseImageTab)
            .click(this.nextButton, { speed: 0.5 })
            .click(this.nextButton, { speed: 0.5 })
            .click(this.nextButton, { speed: 0.5 })
            .click(this.nextButton, { speed: 0.5 })
            .click(this.nextButton, { speed: 0.5 })
            .typeText(this.userField, user, { replace: true })
            .typeText(this.passwordField, password, { replace: true })
            .typeText(this.confirmPasswordField, password, { replace: true })
            .typeText(this.sshTextarea, sshKey, { speed: 0.5 })
            .click(this.createButton);
    }
}