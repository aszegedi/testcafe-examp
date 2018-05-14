import { Selector, t } from 'testcafe';

export default class ClusterPage {
    public createButton = Selector('#btnCreateCluster');

    getWidgetStatus(clusterName: string) {
        return Selector('a[data-stack-name="' + clusterName + '"]').find('[data-qa="stack-status"]').innerText;
    }

    getWidget(clusterName: string) {
        return Selector('a[data-stack-name="' + clusterName + '"]').count;
    }

    async openClusterDetails(clusterName: string) {
        const widgetLink = Selector('a[data-stack-name="' + clusterName + '"]');

        await t
            .click(widgetLink)
    }
}