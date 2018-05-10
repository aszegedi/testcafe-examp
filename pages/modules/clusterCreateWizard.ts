import { Selector, t } from 'testcafe';

export default class ClusterCreateWizard {
    public templateSwitch: any = Selector("div[class='setup-wizard-title-bar'] i");

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
        const credentialSelector = Selector("mat-select[placeholder='Please select credential']");
        const clusterNameField = Selector('#clusterName');
        const baseImageTab = Selector('mat-radio-button').withText('Base Image');
        const nextButton = Selector('button').withText('Next');
        const userField = Selector('input[formcontrolname="username"]');
        const passwordField = Selector('input[formcontrolname="password"]');
        const confirmPasswordField = Selector('input[formcontrolname="passwordConfirmation"]');
        const sshSelector = Selector('#cb-cluster-create-security-ssh-key-name-select');
        const createButton = Selector('.btn.btn-primary.text-uppercase');

        await t
            .click(credentialSelector)
            .click(Selector('mat-option').withText(credentialName))
            .typeText(clusterNameField, clusterName, { replace: true })
            .click(baseImageTab)
            .click(nextButton)
            .click(nextButton)
            .click(nextButton)
            .click(nextButton)
            .click(nextButton)
            .typeText(userField, user, { replace: true })
            .typeText(passwordField, password, { replace: true })
            .typeText(confirmPasswordField, password, { replace: true })
            .click(sshSelector)
            .click(Selector('mat-option').withText(sshKeyName))
            .click(createButton);
    }
}