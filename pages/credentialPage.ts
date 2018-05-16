import { Selector, t } from 'testcafe';

export default class CredentialPage {
    public createButton = Selector('#btnCreateCredential');

    async deleteCredential(name: string) {
        const selectCredentialCheckbox = Selector('[data-qa="' + name + '"] mat-checkbox');
        const deleteIcon = Selector('[data-qa="delete"]');
        const confirmationYes = Selector('.btn.btn-primary.pull-right.text-uppercase');

        await t
            .click(selectCredentialCheckbox, { speed: 0.5 })
            .click(deleteIcon, { speed: 0.5 })
            .click(confirmationYes, { speed: 0.5 })
    }
}