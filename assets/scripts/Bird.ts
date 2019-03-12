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
export default class NewClass extends cc.Component {
    @property(cc.Node) gameWorld: cc.Node = null;
    @property bounceForce: number = 0;

    private myBody: cc.RigidBody;
    private anim;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.gameWorld.on(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this));
        this.myBody = this.node.getComponent(cc.RigidBody);
    }

    start () {
    }

    update (dt) {
        // this.move();
    }

    // public move () {
    //     if (this.myBody.linearVelocity.y > 0) {
    //         let angle = 0;
    //         angle = this.lerp(0, 90, this.myBody.linearVelocity.y / 7);
    //         this.node.rotation = angle;
    //         console.log('angle: ' + angle);
    //     }
    // }

    public onTouchStart () {
        this.myBody.linearVelocity = new cc.Vec2(this.myBody.linearVelocity.x, this.bounceForce);
    }

    public lerp (start: number, end: number, amt: number) {
        return (1 - amt) * start + amt * end;
    }
}
