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
export default class Ball extends cc.Component {

    public speed : number;

    isMove : boolean;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.isMove = false;
    }

    start () {
        // this.speed = 0;
    }
    public setSpeed(speed ) {
        this.speed = speed;
    }
    public MoveObj() {
        cc.log("MoveObj");
        this.isMove = true;
    }
    update (dt) {
        cc.log(this.isMove + " update : " + dt);
        if(this.isMove == false) {
            return;
        }

        cc.log("Ball update spped:" + this.speed);
        var y = this.node.y;
        this.node.y = y + this.speed * dt;
    }
}
