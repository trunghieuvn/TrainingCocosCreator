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
export default class BallControll extends cc.Component {

    @property speed : number = 100;
    @property dir: number = 1;
    @property count: number = 0;
    callBackController: () => void = null;

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        cc.log("ssss");
        cc.director.getCollisionManager().enabled = true;
    }

    update (dt) {
        this.node.y += this.dir * this.speed * dt;
        if( this.node.y > 500 ||  this.node.y < -500){
            this.changeDir();
        }
    }

    setCallBackController(callback) {
        this.callBackController = callback;
    }

    changeDir() {
        this.dir *= -1;
        // cc.log(this.count);
    }

    onCollisionEnter(other, self) {
        cc.log("Ball onCollisionEnter");
        this.changeDir();
        this.count += 1;
        // cc.log(this.callBackController);
    }

    onCollisionExit(other, self) {
        cc.log("Ball onCollisionExit");
    }

    onCollisionStay(other, self) {
        cc.log("Ball onCollisionStay");
    }
}
