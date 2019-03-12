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
// import Player from './Player';

@ccclass
export default class CameraControl extends cc.Component {
    // ================================= Properties ========================
    @property(cc.Node) player: cc.Node = null;
    public distanceTrigger: number = 200;
    // public speed: number = 100;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt) {
        // this.node.y = this.player.y;
        if (this.player.y < this.node.y - this.distanceTrigger) {
            return false;
        }
        this.node.y = this.player.y;
    }
}
