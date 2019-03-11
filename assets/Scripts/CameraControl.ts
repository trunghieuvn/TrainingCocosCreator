
const {ccclass, property} = cc._decorator;

@ccclass
export default class CameraControl extends cc.Component {

    @property(cc.Node) player : cc.Node = null;

    distanceTrigger : number = 200;
    speed : number = 300;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt) {
        if(this.player.y > this.node.y + this.node.y + this.distanceTrigger) {
            this.node.y += this.speed * dt;
        }
        // if(this.player.y)
    }
}
