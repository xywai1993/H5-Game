import { Falert, setUrlQuery } from './common.js';

export function httpRequest(url, params = {}) {
    console.log('params', params);

    if (params.method) {
        params.method = params.method.toUpperCase();
    }

    let myHeaders = new Headers();
    myHeaders.append('Access-Token', window.localStorage.getItem('token'));

    const parasmdata = Object.assign(
        {
            //credentials: 'include',
            //mode: 'no-cors'
            method: 'POST',
            headers: myHeaders
            // headers: {
            //     Authorization: window.localStorage.getItem('token')
            // }
        },
        params
    );
    console.log(parasmdata);

    if (parasmdata.method === 'GET') {
        url = setUrlQuery(url, parasmdata.body);
        delete parasmdata.body;
    }

    return new Promise((resolve, reject) => {
        fetch(url, parasmdata)
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (data.error_code == 401) {
                    console.log(1222);
                    //FIXME:
                    location.href = '/login.html';
                    resolve();
                }
                if (data.error_code == 2) {
                    resolve(data.data);
                } else {
                    Falert(data.msg);
                    reject(data);
                }
            })
            .catch(e => reject(e));
    });
}
