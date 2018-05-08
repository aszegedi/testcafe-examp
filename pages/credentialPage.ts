import { ClientFunction, Selector } from 'testcafe';

export default class BasePage {
    public logoutIcon = Selector('#logoutBtn');
    public confirmation = Selector('button[data-qa="confirmation-yes"]');
    public menu = Selector('app-menu');

    getPageUrl() {
        const getPageUrl = ClientFunction(() => window.location.href);

        return getPageUrl;
    }

    getPageTitle() {
        const getPageTitle = ClientFunction(() => document.title);

        return getPageTitle;
    }
}