// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameController extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.AudioClip) clip_btnPlay = null;

    @property(cc.Node) maskPlayer: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        var action = cc.moveTo(2, 100, 100);
        var logo = cc.find("Canvas/logo");
        logo.runAction(action);

        var action_slow = cc.scaleTo(2, 2, 2);
        action_slow.easing(cc.easeIn(3.0));

        logo.runAction(action_slow);

    }

    // update (dt) {}

    btnPlay () {
        cc.log("btnplay");
        // cc.loader.loadRes();
        cc.audioEngine.play(this.clip_btnPlay, false, 1);
        this.maskPlayer.active = true;
        this.maskPlayer.opacity = 0;
        this.maskPlayer.color = cc.Color.BLACK;
        this.maskPlayer.runAction(
            cc.sequence(
                cc.fadeIn(0.2),
                cc.callFunc(()=>{
                    cc.director.loadScene("InGame");
                }, this)
            )
        );
        
    }
}
