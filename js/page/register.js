import { login, checkEmail, registerUser } from '../api/index.js';
import { $$, Falert } from '../until/common.js';

window.onload = function() {
    const oEmail = $$('#email');
    const oPassword = $$('#password');
    const oNickname = $$('#nickname');
    const loginBtn = $$('#btn');

    loginBtn.addEventListener('click', () => {
        if (!oEmail.value) {
            return;
        }

        checkEmail(oEmail.value)
            .then(data => {
                if (data.email_state == 2) {
                    Falert('该邮箱已注册');
                } else {
                    return registerUser(oEmail.value, oPassword.value, oNickname.value);
                }
            })
            .then(data => {
                //Falert('注册成功');
                window.localStorage.setItem('token', data.access_token);
                location.href = '/index.html';
            });
    });
};
