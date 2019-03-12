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
export default class Bird extends cc.Component {

    @property bounceForce: number = 0;
    speedStart : number = 300;
    currentSpeed : number = 0;
    gravity : number = 1000;

    private myBody: cc.RigidBody;

    // LIFE-CYCLE CALLBACKS: 

    onLoad () {
        this.node.parent.on(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this));
        this.myBody = this.node.getComponent(cc.RigidBody);
        // this.currentSpeed = this.speedStart;
    }

    start () {

    }

    update (dt) {
        this.move(dt);
    }

    // Hàm xử lý trong khi player di chuyển
    public move (dt) {
        this.currentSpeed -= dt * this.gravity;
        this.node.y += dt * this.currentSpeed;
    }

    public onTouchStart () {
        // this.node.runAction(cc.jumpTo(1, new cc.Vec2(0, 20), 20, 15, 1));
        this.currentSpeed = this.speedStart;
        // this.node.runAction(cc.jumpTo(0.5, 0, 60, 60, 1));
        // this.myBody.linearVelocity = cc.v2(this.myBody.linearVelocity.x, 300);
    }

    // public lerp (value1: number, value2: number, amount: number) {
    //     amount = amount < 0 ? 0 : amount;
    //     amount = amount > 1 ? 1 : amount;
    //     return value1 + (value2 - value1) * amount;
    // }
}
