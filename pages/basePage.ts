import { Selector } from 'testcafe';

export default class BasePage {
    public logoutIcon = Selector('#logoutBtn');
    public confirmation =Selector('button[data-qa="confirmation-yes"]');
}