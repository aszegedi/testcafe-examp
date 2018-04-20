import { ClientFunction, Selector, t } from 'testcafe';

export class BasePage {

    getLoginFormTitle() {
        return Selector('div').textContent;
    }

    getCloudbreakTitle() {
        return ClientFunction(() => document.title);
    }
}