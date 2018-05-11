import { Selector } from 'testcafe';

export default class CredentialCreateWizard {
    public createCredentialApp = Selector('app-get-started');
    public providerSelector = this.createCredentialApp.find('.cb-credential-create-started-select-provider-switch');

    async selectProvider(providerName: string, t) {
        let name = (providerName.toLowerCase() == 'azure') ? 'msa' : providerName.toLowerCase();
        const providerButton = Selector('div[class="option"] img[src*="' + name + '.png"]');

        await t
            .maximizeWindow()
            .click(this.providerSelector)
            .click(providerButton)
    }
    
    async createOpenStackCredential(keystoneVersion: string, name: string, user: string, password: string, tenantName: string, endpoint: string, apiFacing: string, t) {
        const keystoneSelector = Selector('#keystone-version-dropdown');
        const nameField = Selector('#name');
        const userField = Selector('#user');
        const passwordField = Selector('#password');
        const tenantField = Selector('#tenantName');
        const endpointField = Selector('#endpoint');
        const apiSelector = Selector('#cb-credential-create-openstack-api-facing-select');
        const createButton = Selector('#cb-credential-create-submit-button');

        await t
            .click(keystoneSelector)
            .click(Selector('mat-option').withText(keystoneVersion))
            .typeText(nameField, name)
            .typeText(userField, user)
            .typeText(passwordField, password)
            .typeText(tenantField, tenantName)
            .typeText(endpointField, endpoint)
            .click(apiSelector)
            .click(Selector('mat-option').withText(apiFacing))
            .click(createButton)
    }
}