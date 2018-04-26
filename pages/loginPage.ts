import { BASE_URL } from '../environment/environment';
import { ClientFunction, Selector, Role } from 'testcafe';

export default class LoginPage {
    public loginForm = Selector('div.login-wrapper form');
    public userNameInput = this.loginForm.find('#username');
    public passwordInput = this.loginForm.find('#password');
    public loginButton = this.loginForm.find('#loginBtn');
    private userName = process.env.USERNAME || 'admin@example.com';
    private password = process.env.PASSWORD || 'cloudbreak';

    public defaultUser = Role(BASE_URL, async t => {
        await t
            .typeText(this.userNameInput, this.userName)
            .typeText(this.passwordInput, this.password)
            .click(this.loginButton)
    }, { preserveUrl: true });

    getLoginFormTitle() {
        return this.loginForm.textContent;
    }

    getCloudbreakTitle() {
        return ClientFunction(() => document.title);
    }
}