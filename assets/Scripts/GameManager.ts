const {ccclass, property} = cc._decorator;
import Ball from './Ball';
@ccclass
export default class GameManager extends cc.Component {

    @property(cc.Prefab) ball: cc.Prefab = null;
    @property(cc.Label) labelScore: cc.Label = null;
    @property(cc.AudioClip) scoreAudio: cc.AudioClip = null;

    @property spawnY = 0;
    @property maxX = 0;

    timer: number;
    score: number;

    onLoad() {
        // init logic
         // cc.director.getWinSize(): lay kich thuoc cua so
        var Ball = cc.instantiate(this.ball);
        Ball.setPosition(cc.randomMinus1To1() * cc.rand() % this.maxX, this.spawnY);
        this.node.addChild(Ball);    
        this.timer = 0;
    }

    start() {
        this.score = 0;
    }

    public gainScore() {
        this.score += 1;
        this.labelScore.string = 'Score: ' + this.score.toString();
        cc.audioEngine.playEffect(this.scoreAudio, false);
    }

    update(dt) {
        this.timer += dt;
        if (this.timer > 1) {
            this.timer = 0;
            var TraiBanh = cc.instantiate(this.ball);
            TraiBanh.setPosition(cc.randomMinus1To1() * cc.rand() % this.maxX, this.spawnY);
            this.node.addChild(TraiBanh);
            var _ball = TraiBanh.getComponent(Ball);
            _ball.setMovex(cc.randomMinus1To1() * 300);
            _ball.setMaxX(this.maxX);
            _ball.callBack = this.gameOver.bind(this);
        }
    }

    gameOver() {

    }
}
