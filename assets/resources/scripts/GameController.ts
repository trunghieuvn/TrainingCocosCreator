const { ccclass, property } = cc._decorator;

@ccclass
export default class GameController extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    @property(cc.AudioClip) audio_button_play = null;
    @property(cc.Node) maskPlayer: cc.Node = null;

    onLoad() { }

    start() {
        cc.find("Canvas/game_name").runAction(cc.moveTo(2, cc.p(0, 100)));
    }

    update(dt) {
        
    }


    //Event
    btnPlay() {
        cc.log("play");
        cc.audioEngine.play(this.audio_button_play, false, 1);

        this.maskPlayer.active = true;
        this.maskPlayer.opacity = 0;
        this.maskPlayer.color = cc.Color.BLACK;
        this.maskPlayer.runAction(cc.sequence(cc.fadeIn(0.5), cc.callFunc(() => {
            cc.director.loadScene("ready");
            cc.log("chuyenman");
        }, this)));

    }
}
