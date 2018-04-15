const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    gameManager:cc.Node  = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var game = this.gameManager.getComponent("GameManager");
        game.canvas.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this));
        game.canvas.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove.bind(this));
        game.canvas.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd.bind(this));
    }

    start () {

    }

    // update (dt) {}

    //========================================
    
    onTouchStart (touch:cc.Event.EventTouch, event) {
        this.aim(touch.getLocation());
    }

    onTouchMove (touch:cc.Event.EventTouch, event) {
        this.aim(touch.getLocation());
    }

    onTouchEnd (touch, event) {

    }

    aim (touchLoc:cc.Vec2) {
        touchLoc = this.gameManager.getComponent("GameManager").canvas.node.convertToNodeSpaceAR(touchLoc);
        var v1 = new cc.Vec2(touchLoc.x - this.node.x, touchLoc.y - this.node.y).normalize();
        var v2 = new cc.Vec2(1, 0); //Ox axis
        var angle = 90 - (v1.angle(v2) * 180 / Math.PI);
        this.node.rotation = angle;
    }
}
