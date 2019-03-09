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
export class Ball extends cc.Component {

    @property speed: number = 100
    isMove: boolean

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    public setSpeed(speed) {
        this.speed = speed
    }

    public moveObj() {
        this.isMove = true
    }

    update (dt) {
        if (!this.isMove) {
            return
        }
        var y = this.node.y
        this.node.y = y + this.speed * dt
    }
}
