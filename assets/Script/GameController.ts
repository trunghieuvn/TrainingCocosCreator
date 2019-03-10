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

import {BallController} from './BallController';

@ccclass
export default class GameController extends cc.Component {

    @property(cc.Prefab) ball_prefab : cc.Prefab = null;

    @property(cc.Label) count : cc.Label = null;

    nodeBall : cc.Node = null;

    onLoad () {
        
        
    }

    start () {
        this.nodeBall = cc.instantiate(this.ball_prefab);
        this.nodeBall.x = 380 ;
        this.nodeBall.y = 500;

        var ball = this.nodeBall.getComponent(BallController);
        ball.dir *= -1;

        this.node.addChild(this.nodeBall);
    }

    update (dt) {
        var ss = this.nodeBall.getComponent(BallController).sovacham;
        this.count.string = ss.toString();
    }

    onCollisionEnter(other, self) {
        cc.log("ansbdjnsbdfhjbsdhjbfhjsbdfhjbsdhjfbhjb");
    }
}
