export function $$(select) {
    return document.querySelector(select);
}

export const Falert = function(message) {
    const dom = document.querySelector('#toolAlert');
    const debugDom = dom ? dom : createAlertDom();

    console.log(debugDom);
    debugDom.style.display = 'block';
    const messageDom = document.querySelector('#toolmessage');
    messageDom.innerHTML = typeof message === typeof {} ? JSON.stringify(message) : message;
    //debugDom.appendChild(messageDom);

    function createAlertDom() {
        let dom = document.createElement('div');
        dom.id = 'toolAlert';
        dom.style.cssText =
            'display:none;background:rgba(0,0,0,.5);height:100%;width:100%;overflow:auto;position:fixed;left:0;top:0;z-index:99999';
        dom.innerHTML = `
          <div style="width: 88%;margin: 45% auto 0;background:#eeeeee;border-radius: 10px;">
              <h4 id="toolmessage" style="padding: 20px 3px;text-align: center;word-break:break-all;"></h4>
              <p style="text-align: center;padding: 10px 0;border-top:1px solid #a7a7de;">好</p>
          </div>    
  `;
        const ElementBody = document.querySelector('body');
        ElementBody.appendChild(dom);
        dom.addEventListener(
            'click',
            function(ev) {
                if (ev.target.nodeName.toUpperCase() === 'P') {
                    dom.style.display = 'none';
                }
            },
            false
        );
        dom.addEventListener(
            'touchmove',
            function(ev) {
                ev.preventDefault();
                ev.stopPropagation();
                return false;
            },
            false
        );
        //dom.innerHTML = message;
        return dom;
    }
};

/**
 *
 * @param {String} url
 * @param {Object} obj
 * @returns {string}
 */
export const setUrlQuery = function(url, obj = {}) {
    let p = [];
    for (let key in obj) {
        p.push(`${key}=${obj[key]}`);
    }
    return `${url}?${p.join('&')}`;
};

export const formatDate = function(date, fmt = 'YYYY-MM-DD HH:mm:ss') {
    if (typeof date === 'string') {
        date = new Date(date.replace(/-/g, '/'));
    }
    if (typeof date === 'number') {
        date = new Date(date);
    }

    var o = {
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds()
    };

    var week = {
        '0': '\u65e5',
        '1': '\u4e00',
        '2': '\u4e8c',
        '3': '\u4e09',
        '4': '\u56db',
        '5': '\u4e94',
        '6': '\u516d'
    };
    if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + '']
        );
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? String(o[k]) : ('00' + o[k]).substr(('' + o[k]).length)
            );
        }
    }
    return fmt;
};
