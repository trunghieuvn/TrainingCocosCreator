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

import BallControll from './BallControll';

@ccclass
export default class GameController extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'Va chạm:';

    @property count : number = 0;




    @property (cc.Canvas) canvas : cc.Canvas = null;

    @property(cc.Prefab) ball_prefab : cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //this.label.string = 'xin chao 1'; 
    }

    touchEnd(customerData : cc.Event.EventCustom) {

    }

    countTouch() {
        this.label.string = 'Va chạm:' + (this.count+ 1);
    }

    start () {

        //this.canvas.node.on(cc.Node.EventType.TOUCH_END,this.touchEnd.bind(this));
        for(var i =0; i < 2; i++) {
            var obj_ball = cc.instantiate(this.ball_prefab);
            obj_ball.x = -200 + 300 * i;
            var ball = obj_ball.getComponent(BallControll);
            if (i % 2)
                ball.changeDir();
            this.node.addChild(obj_ball);
            ball.callbackCollider = this.countTouch.bind(this);
        }
    }

    // update (dt) {}
}
