import { Selector, t } from 'testcafe';

export default class LoginPage {
    public loginForm = Selector('div.login-wrapper form');
    public userNameInput = this.loginForm.find('#username');
    public passwordInput = this.loginForm.find('#password');
    public loginButton = this.loginForm.find('#loginBtn');
    public errorMessage = Selector('div.error');

    async login () {
        const userName = process.env.USERNAME || 'admin@example.com';
        const password = process.env.PASSWORD || 'cloudbreak';

        await t
            .typeText(this.userNameInput, userName)
            .typeText(this.passwordInput, password)
            .click(this.loginButton);
    }

    async invalidLogin () {
        await t
            .typeText(this.userNameInput, 'valami')
            .typeText(this.passwordInput, ' ')
            .click(this.loginButton);
    }
}