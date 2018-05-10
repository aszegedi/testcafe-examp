import { Selector } from 'testcafe';

export default class ClusterDetails {
    public terminateButton: any = Selector('.btn.btn-secondary.btn-terminate');

    async forceTerminateCluster(t) {
        const confirmationYesButton = Selector('.modal-window-footer.clear-right button.btn.btn-primary.pull-right.text-uppercase');
        const forceTermination = Selector('app-delete-stack-dialog mat-checkbox');
        const forceTerminationLabel = forceTermination.find('label');

        await t
            .maximizeWindow()
            .click(this.terminateButton)
            .click(forceTerminationLabel)
            .click(confirmationYesButton)
    }
}