import { ClientFunction } from 'testcafe';
import { BASE_URL } from '../environment/environment';

const localStorageSet = ClientFunction((key, val) => localStorage.setItem(key, val));
const localStorageGet = ClientFunction(key => localStorage.getItem(key));

fixture `Cloudbreak Local Storage examples`
    .page(BASE_URL);

test ('Regression | Cloudbreak GUI local storage has been updated successfully | 010', async t => {
    await localStorageSet('teszt', 'elek');

    await t
        .expect(localStorageGet('teszt')).eql('elek', 'check Local Storage contains "elek" value of "teszt" key');
});