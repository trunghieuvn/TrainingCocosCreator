const {ccclass, property} = cc._decorator;

@ccclass
export default class Scroller extends cc.Component {

    @property speed: number = -300;
    @property resetX: number = -300;

    canScroll = false;

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.canScroll = true;
    }

    start () {

    }

    update (dt) {
        if (!this.canScroll) {
            return;
        }
        this.node.x += this.speed * dt;
        if (this.node.x <= this.resetX) {
            this.node.x -= this.resetX;
        }
    }

    stopScroll () {
        this.canScroll = false;
    }

    startScroll() {
        this.canScroll = true;
    }
}
