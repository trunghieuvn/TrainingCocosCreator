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
import BallControll from '../ballcontroll';
@ccclass
export default class Action extends cc.Component {

    @property(cc.Prefab) ball : cc.Prefab = null;

    @property
    count: number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // cc.director.getCollisionManager().enabled = true;
    }

    onCollisionEnter(other, self) {
        // cc.log("Ball onCollisionEnter");
        // var BallCT = other.node.getComponent(BallControll);
        //  BallCT.changeDir();
        // this.count += 1;
        
    }

    // onCollisionExit (other, self) {
    //     cc.log("Ball onCollisionExit");
        
    // }
    // onCollisionStay (other, self) {
    //     cc.log("Ball onCollisionStay");
    // }
    start () {

    }

    update (dt) {
        // cc.log(this.count);
        // this.counttxt.string = this.count;
    }
}
