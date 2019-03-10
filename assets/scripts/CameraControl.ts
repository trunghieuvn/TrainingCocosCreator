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
import Player from './Player';

@ccclass
export default class CameraControl extends cc.Component {
    // ====================== Properties ======================
    @property(cc.Node) player: cc.Node = null;

    // ====================== Members ==========================
    private isMoving: boolean = false;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt) {
        this.moveUp();
    }

    // ======================= Methods ==========================
    public moveUp () {
        if (this.isMoving) return;
        if (!this.player) return;
        if (this.player.getComponent(Player).isMoving) return;
        if (this.player.y <= this.node.y - 300) return;

        let actionMoveTo = cc.moveTo(0.5, new cc.Vec2(0, this.player.y + 300));
        let moveEnd = cc.callFunc(() => {
            this.isMoving = false;
        });

        this.isMoving = true;
        this.node.runAction(cc.sequence(actionMoveTo, moveEnd));
    }
}
