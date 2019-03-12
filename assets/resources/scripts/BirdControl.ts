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
export default class BirdControl extends cc.Component {

    @property speedStart: number = 300;
    @property gravity: number = 1000;

    currentSpeed: number = 0 ;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {}

    start () {
        
    }

    update (dt) {
        this.currentSpeed -= dt * this.gravity;
        this.node.y += dt * this.currentSpeed;
        cc.log("updae: " + this.node.y);
    }

    fly(){
        this.currentSpeed = this.speedStart;
    }
}
