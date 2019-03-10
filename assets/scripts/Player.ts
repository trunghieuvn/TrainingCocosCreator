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
export default class Player extends cc.Component {
    // ========================= Members ==============================
    public isMoving: boolean = false;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}

    // ========================== Methods ==============================
    public move (x: number, y: number) {
        let actionMoveTo = cc.moveTo(1, x, y);
        let actionFlip = cc.callFunc(() => {
            this.node.scaleX *= -1;
            this.isMoving = false;
        });
        let sequence = cc.sequence(actionMoveTo, actionFlip);

        this.isMoving = true;
        this.node.runAction(sequence);
    }
}
