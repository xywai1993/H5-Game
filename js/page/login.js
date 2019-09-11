import { login } from '../api/index.js';
import { $$ } from '../until/common.js';

window.onload = function() {
    const oEmail = $$('#email');
    const oPassword = $$('#password');
    const loginBtn = $$('#btn');

    loginBtn.addEventListener('click', () => {
        if (!oEmail.value || !oPassword.value) {
            return;
        }

        login(oEmail.value, oPassword.value)
            .then(data => {
                console.log(data);
                window.localStorage.setItem('token', data.access_token);
                //FIXME:
                location.href = '/index.html';
            })
            .catch(console.log);
    });
};
