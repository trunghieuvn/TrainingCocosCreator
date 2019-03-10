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
import BallControl from "./BallControl";

@ccclass
export default class GameController extends cc.Component {

    @property(cc.Prefab) ball_prefab: cc.Prefab = null;
    @property(cc.Label) label: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        // this.node.getComponent
    }

    start () {

        var selt = this;
        for (let index = 0; index < 3; index++) {
            
            var obj_ball = cc.instantiate(this.ball_prefab);
            obj_ball.x = -200 + (200*index);
            var ball = obj_ball.getComponent(BallControl);
            ball.setCallbackCollider(function(text){
                selt.label.string = text;
            });
            if(index%2 ==0){
                
                ball.changeDir();
            }
            this.node.addChild(obj_ball);
        }
    }
}
