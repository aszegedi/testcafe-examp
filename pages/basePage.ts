import { ClientFunction, Selector } from 'testcafe';
import { browser } from '../utils/index';

export default class BasePage {
    public logoutIcon = Selector('#logoutBtn');
    public confirmation = Selector('button[data-qa="confirmation-yes"]');
    public menu = Selector('app-menu');

    getPageUrl() {
        return ClientFunction(() => window.location.href);
    }

    getPageTitle() {
        return ClientFunction(() => document.title);
    }

    openPage(pageName: string) {
        const name = pageName.toLowerCase();

        return browser.goTo('/' + name);
    }
}