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

    @property (cc.Node) maskLayer : cc.Node;
    @property(cc.AudioClip) clip_btnPlay = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        var logo = cc.find("Canvas/logo");
        // logo.runAction(cc.moveTo(2, cc.v2(0, 100)));
        var action = cc.scaleTo(2, 1.5, 1.5);
        action.easing(cc.easeIn(3.0));

        // logo.runAction(action);
        logo.runAction(action.easing(cc.easeIn(3.0)));
        
    }

    // update (dt) {}

    // UI 
    btnPlay () { 
        // cc.loader.loadRes()
        cc.log("GameController btnPlay");
        cc.audioEngine.play(this.clip_btnPlay, false, 1);
        this.maskLayer.active = true;
        this.maskLayer.opacity = 0;
        this.maskLayer.color = cc.Color.BLACK;
        this.maskLayer.runAction(
            cc.sequence(
                cc.fadeIn(0.2),
                cc.callFunc(()=> {
                    cc.director.loadScene('InGame');
                }, this)
            )
        );
    }
    
}
