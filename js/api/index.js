import { httpRequest } from '../until/fetch.js';
const host = 'http://game.dev.douba.cn';
const createUrl = api => {
    return host + api;
};

/**
 * 获取用户信息
 */
export function getUserInfo() {
    return httpRequest(createUrl('/api/user/show'), {
        method: 'GET'
    }).catch(e => e);
}

/**
 * 登录
 */
export function login(email, password) {
    const formdata = new FormData();
    formdata.append('email', email);
    formdata.append('password', password);
    return httpRequest(createUrl('/api/user/login'), {
        method: 'POST',
        body: formdata
    });
}

/**
 * 提交分数
 * @param {number} score
 */
export function commitScore(score) {
    const formdata = new FormData();
    formdata.append('score', score);
    return httpRequest(createUrl('/api/game/commit-score'), {
        body: formdata
    });
}

/**
 * 检查邮箱
 * @param {string} email email
 */
export function checkEmail(email) {
    return httpRequest(createUrl('/api/user/check-email'), {
        method: 'GET',
        body: { email: email }
    });
}

/**
 * 注册用户
 * @param {string} email
 * @param {string} password
 * @param {string} nickname
 */
export function registerUser(email, password, nickname) {
    const formdata = new FormData();
    formdata.append('email', email);
    formdata.append('password', password);
    formdata.append('nickname', nickname);
    return httpRequest(createUrl('/api/user/register'), {
        body: formdata
    });
}

/**
 * 下单
 */
export function payment() {
    const formdata = new FormData();
    formdata.append('product_id', 1);
    formdata.append('quantity', 10);
    return httpRequest(createUrl('/api/payment/pay'), {
        body: formdata
    });
}

/**
 * 减命
 */
export function lifeDecrement() {
    return httpRequest(createUrl('/api/user/life-decrement'));
}

/**
 * 排行
 */
export function rankList() {
    return httpRequest(createUrl('/api/game/rank'), {
        method: 'get',
        body: { page: 1 }
    });
}

export function logout() {
    return httpRequest(createUrl('/api/user/logout'));
}

export function updateUserInfo(nickname) {
    const formdata = new FormData();
    formdata.append('nickname', nickname);
    return httpRequest(createUrl('/api/user/update-user-info'), {
        body: formdata
    });
}
