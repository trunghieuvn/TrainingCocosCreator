const {ccclass, property} = cc._decorator;

@ccclass
export default class GameController extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    @property(cc.AudioClip) audio_button_play = null;

    onLoad () {}

    start () {

    }

    update (dt) {}


    //Event
    btnPlay(){
        cc.log("play");
        cc.audioEngine.play(this.audio_button_play, false, 1);
    }
}
