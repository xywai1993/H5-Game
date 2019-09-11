import { $$ } from './until/common.js';

export default class goRecharge {
    constructor(message, callback) {
        this.domRecharge = $$('#recharge');
        this.closeBtn = $$('#closeBtn');
        this.go = $$('#go');
        this.domMessage = $$('#message');
        this.message = message;
        this.callback = callback;

        this.closeBtn.addEventListener('click', () => {
            this.closeRecharge();
        });

        this.go.addEventListener('click', () => {
            this.callback();
        });
    }

    openRecharge() {
        this.closeRecharge();
        this.domMessage.innerHTML = this.message;
        this.domRecharge.style.display = 'block';
    }

    closeRecharge() {
        this.domRecharge.style.display = 'none';
    }

    changeMessage(message) {
        this.domMessage.innerHTML = message;
    }

    changeGoMessage(message) {
        this.go.innerHTML = message;
    }

    changeCallback(callback) {
        this.callback = callback;
    }
}
