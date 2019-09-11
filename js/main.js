import Player from './player/index.js';
import Enemy from './npc/enemy.js';
import BackGround from './runtime/background.js';
import GameInfo from './runtime/gameinfo.js';
import Music from './runtime/music.js';
import DataBus from './databus.js';
import { commitScore, payment, lifeDecrement, rankList, logout, updateUserInfo } from './api/index.js';
import { formatDate, Falert } from './until/common.js';

import Gorecharge from './gorecharge.js';

const canvas = document.getElementById('game_canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const speed = 6;
const go = () => {
    payment().then(data => {
        // window.open(data.approval_url);
        window.localStorage.setItem('score', databus.score);
        window.localStorage.setItem('goRecharge', 'true');
        location.href = data.approval_url;
    });
};

const databus = new DataBus();

const gorecharge = new Gorecharge(' 复活币为0，去充值', go);

const V = new Vue({
    el: '#mine',
    data: {
        rank: [],
        show: true,
        active: 'a',
        userData: {},
        edit: false
    },
    mounted() {
        rankList().then(data => {
            this.rank = data.rank_list;
        });
    },
    methods: {
        logout() {
            logout().then(data => {
                Falert('登出成功');
                setTimeout(() => {
                    location.href = location.href;
                }, 2000);
            });
        },
        update() {
            updateUserInfo(this.userData.nickname).then(data => {
                this.edit = false;
            });
        }
    },
    filters: {
        formatDate(date) {
            return formatDate(date * 1000);
        }
    }
});

export default class Main {
    constructor(data) {
        this.aniId = 0;
        this.life = data.life;
        this.nickname = data.nickname;
        V.userData = data;
        this.restart();
        //FIXME: 假如是充值回来的，接上上一次的分数
        if (localStorage.getItem('goRecharge') === 'true') {
            databus.score = Number(window.localStorage.getItem('score'));
            databus.gameOver = true;
            localStorage.setItem('goRecharge', 'false');
        }
    }

    restart() {
        databus.reset();
        canvas.removeEventListener('touchstart', this.touchHandler);

        this.bg = new BackGround(ctx);
        this.player = new Player(ctx);
        this.gameinfo = new GameInfo();
        this.music = new Music();

        this.bindLoop = this.loop.bind(this);
        this.hasEventBind = false;

        window.cancelAnimationFrame(this.aniId);

        this.aniId = window.requestAnimationFrame(this.bindLoop, canvas);

        //localStorage.setItem('goRecharge', 'false');
    }

    // 复活
    resurgence() {
        console.log('点我复活');
        // databus.life = 4;
        if (this.life > 0) {
            lifeDecrement().then(data => {
                this.life--;
                databus.gameOver = false;
            });
        } else {
            // Falert('复活币为零，无法复活');
            gorecharge.openRecharge();
            //openRecharge();
        }
    }

    enemyGenerate() {
        if (databus.frame % 30 === 0) {
            let enemy = databus.pool.getItemByClass('enemy', Enemy);

            const _sp = Math.floor(databus.score / 11);
            enemy.init(speed + _sp);

            databus.enemys.push(enemy);
        }
    }

    collisionDetection() {
        const self = this;

        databus.bullets.forEach(bullet => {
            for (let i = 0, il = databus.enemys.length; i < il; i++) {
                const enemy = databus.enemys[i];

                if (!enemy.isPlaying && enemy.isCollideWith(bullet)) {
                    enemy.playAnimation();
                    self.music.playExplosion();

                    bullet.visible = false;
                    databus.score += 1;

                    break;
                }
            }
        });

        for (let i = 0, il = databus.enemys.length; i < il; i++) {
            let enemy = databus.enemys[i];

            if (this.player.isCollideWith(enemy)) {
                databus.gameOver = true;
                databus.enemys.splice(i, 1);
                //提交分数
                commitScore(databus.score).then(console.log);
                break;
                // if (databus.life > 1) {
                //     databus.life--;
                //     databus.enemys.splice(i, 1);
                //     break;
                // } else {
                //     databus.gameOver = true;
                //     commitScore(databus.score).then(console.log);
                //     break;
                // }
            }
        }
    }

    touchEventHandler(e) {
        e.preventDefault();

        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;

        let area = this.gameinfo.btnArea;
        let resurgenceBtn = this.gameinfo.btnResurgence;
        const nicknameBtn = this.gameinfo.nicknameBtn;

        //点击重新开始
        if (x >= area.startX && x <= area.endX && y >= area.startY && y <= area.endY) {
            this.restart();
        }

        //点击复活
        if (
            x >= resurgenceBtn.startX &&
            x <= resurgenceBtn.endX &&
            y >= resurgenceBtn.startY &&
            y <= resurgenceBtn.endY
        ) {
            this.resurgence();
        }

        console.log(
            `x:${x >= nicknameBtn.startX},xend:${x <= nicknameBtn.endX},y:${y >= nicknameBtn.startY},endY:${y <=
                nicknameBtn.endY}`
        );
        //点击个人中心
        if (x >= nicknameBtn.startX && x <= nicknameBtn.endX && y >= nicknameBtn.startY && y <= nicknameBtn.endY) {
            console.log(2323232323);

            V.show = true;
        }
    }

    render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.bg.render(ctx);

        databus.bullets.concat(databus.enemys).forEach(item => {
            item.drawToCanvas(ctx);
        });

        this.player.drawToCanvas(ctx);

        databus.animations.forEach(ani => {
            if (ani.isPlaying) {
                ani.aniRender(ctx);
            }
        });

        this.gameinfo.renderGameScore(ctx, databus.score);
        this.gameinfo.renderGameLife(ctx, this.life);
        this.gameinfo.renderNickname(ctx, '个人中心');

        if (databus.gameOver) {
            this.gameinfo.renderGameOver(ctx, databus.score);

            if (!this.hasEventBind) {
                this.hasEventBind = true;
                this.touchHandler = this.touchEventHandler.bind(this);
                canvas.addEventListener('touchstart', this.touchHandler);
            }
        }
    }

    update() {
        if (databus.gameOver) {
            return;
        }

        this.bg.update();

        databus.bullets.concat(databus.enemys).forEach(item => {
            item.update();
        });

        this.enemyGenerate();

        this.collisionDetection();

        if (databus.frame % 20 === 0) {
            this.player.shoot();
            this.music.playShoot();
        }
    }

    loop() {
        databus.frame++;

        this.update();
        this.render();

        this.aniId = window.requestAnimationFrame(this.bindLoop, canvas);
    }
}
