// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
import Ball from './ball';
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Prefab) prefab_CaiTrung: cc.Prefab = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var obj_ball = cc.instantiate(this.prefab_CaiTrung);
        obj_ball.x = 100;
        obj_ball.y = 400;
        this.node.addChild(obj_ball);

        var obj_ball = cc.instantiate(this.prefab_CaiTrung);

        var ball = obj_ball.getComponent(Ball);
        ball.setHuong();

        obj_ball.y = -400;
        this.node.addChild(obj_ball);
    }

    start() {

    }

    // update (dt) {}
}
