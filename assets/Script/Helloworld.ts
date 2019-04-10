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

    @property(cc.Canvas) canvas : cc.Canvas = null;

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        console.log("GameManager onLoad");
        this.canvas.node.on(cc.Node.EventType.TOUCH_START, 
            this.onTouchStart.bind(this));
        this.canvas.node.on(cc.Node.EventType.TOUCH_END, 
            this.onTouchEnd.bind(this));
    }

    // TouchEvent
    onTouchStart(event) {
        console.log("GameManager onTouchStart " + event);
    }

    // TouchEnd
    onTouchEnd(event) {
        console.log("GameManager onTouchEnd");
    }

    start () {

    }

    update (dt) {}
}
