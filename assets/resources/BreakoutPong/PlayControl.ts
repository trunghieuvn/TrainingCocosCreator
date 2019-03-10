const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayControl extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
    }

    _preTouchMovePointX: number = 0;
    start () {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onMouseMove.bind(this));
    }

    update (dt) {
        if (this._preTouchMovePointX == 0) {
            return;
        }
        this.node.x = this._preTouchMovePointX;
    }

    collisionCallback: () => void
    setCollisionCallback(collisionCallback) {
        this.collisionCallback = collisionCallback;
    }

    onCollisionEnter(nodeOther, nodeSelf) {
        if (this.collisionCallback != null) {
            this.collisionCallback();
        }
    }

    onMouseMove(event: cc.Event.EventCustom) {
        this._preTouchMovePointX = event.touch._point.x;
    }
}
