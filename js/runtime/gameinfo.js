const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

let atlas = new Image();
atlas.src = 'images/Common.png';

export default class GameInfo {
    renderGameScore(ctx, score) {
        ctx.fillStyle = '#ffffff';
        ctx.font = '20px Arial';

        ctx.fillText(score, 10, 30);
    }

    renderGameLife(ctx, life) {
        ctx.fillStyle = '#ffffff';
        ctx.font = '20px Arial';

        ctx.fillText('复活币：', 10, 60);
        ctx.fillText(life, 90, 60);
    }

    renderNickname(ctx, name) {
        ctx.fillStyle = '#ffffff';
        ctx.font = '20px Arial';
        const text = ctx.measureText(name);
        //console.log(text);

        ctx.fillText(name, screenWidth - text.width - 10, 30);

        this.nicknameBtn = {
            startX: screenWidth - text.width - 10,
            startY: 20,
            endX: screenWidth - 10,
            endY: 50
        };
    }

    renderGameOver(ctx, score) {
        ctx.drawImage(atlas, 0, 0, 119, 108, screenWidth / 2 - 150, screenHeight / 2 - 100, 300, 300);

        ctx.fillStyle = '#ffffff';
        ctx.font = '20px Arial';

        ctx.fillText('游戏结束', screenWidth / 2 - 40, screenHeight / 2 - 100 + 50);

        ctx.fillText('得分: ' + score, screenWidth / 2 - 40, screenHeight / 2 - 100 + 130);

        ctx.drawImage(atlas, 120, 6, 39, 24, screenWidth / 2 - 60, screenHeight / 2 - 140 + 180, 120, 40);
        ctx.fillText('复活', screenWidth / 2 - 20, screenHeight / 2 - 140 + 205);

        ctx.drawImage(atlas, 120, 6, 39, 24, screenWidth / 2 - 60, screenHeight / 2 - 80 + 180, 120, 40);
        ctx.fillText('重新开始', screenWidth / 2 - 40, screenHeight / 2 - 80 + 205);

        /**
         * 复活按钮区域
         * 方便简易判断按钮点击
         */
        this.btnResurgence = {
            startX: screenWidth / 2 - 40,
            startY: screenHeight / 2 - 140 + 180,
            endX: screenWidth / 2 + 50,
            endY: screenHeight / 2 - 140 + 255
        };

        /**
         * 重新开始按钮区域
         * 方便简易判断按钮点击
         */
        this.btnArea = {
            startX: screenWidth / 2 - 40,
            startY: screenHeight / 2 - 80 + 180,
            endX: screenWidth / 2 + 50,
            endY: screenHeight / 2 - 80 + 255
        };
    }
}
