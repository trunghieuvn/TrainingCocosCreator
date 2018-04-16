const {ccclass, property} = cc._decorator;
const ESTIMATE_POOL_SIZE = 100;

@ccclass
export default class Player extends cc.Component {

    @property(cc.Node)
    gameManager:cc.Node  = null;

    @property(cc.Node)
    prepareBullet:cc.Node = null;

    @property(cc.Prefab)
    bulletPrefab:cc.Prefab = null;

    @property(cc.Label)
    bulletCountLabel:cc.Label = null;

    game = null;
    bulletSpeed:number = 0;
    poolNode:cc.NodePool = null;
    bulletCount:number = 0;
    accumulationBullet:number = 0;
    direction:cc.Vec2 = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //set touch event
        this.game = this.gameManager.getComponent("GameManager");
        this.game.canvas.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this));
        this.game.canvas.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove.bind(this));
        this.game.canvas.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd.bind(this));
        
        //hide prepareBullet
        this.prepareBullet.active = false;

        //init pool of bullet prefabs
        this.poolNode = new cc.NodePool();
        for (let i = 0; i < ESTIMATE_POOL_SIZE; i++) {
            var bullet = cc.instantiate(this.bulletPrefab);
            this.poolNode.put(bullet);
        }
    }

    start () {
        this.bulletSpeed = 500;
        this.accumulationBullet = 5;
        this.bulletCount = this.accumulationBullet;
        this.bulletCountLabel.string = "x" + this.bulletCount.toString(); 
    }

    // update (dt) {}

    //========================================
    
    onTouchStart (touch:cc.Event.EventTouch) {
        this.aim(touch.getLocation());
    }

    onTouchMove (touch:cc.Event.EventTouch) {
        this.aim(touch.getLocation());
    }

    onTouchEnd (touch:cc.Event.EventTouch) {
        this.schedule(this.shoot, 0.5, this.bulletCount - 1, 0);
    }

    aim (touchLoc:cc.Vec2) {
        touchLoc = this.game.canvas.node.convertToNodeSpaceAR(touchLoc);
        touchLoc.y = touchLoc.y < this.node.y ? this.node.y : touchLoc.y;

        var v1 = new cc.Vec2(touchLoc.x - this.node.x, touchLoc.y - this.node.y).normalize();
        var v2 = new cc.Vec2(1, 0); //Ox axis
        var angle = 90 - (v1.angle(v2) * 180 / Math.PI);

        //limit the rotation angle
        if (Math.abs(angle) > 80) {
            angle = 80 * angle / Math.abs(angle);
        }
        this.node.rotation = angle;
        
        //Set direction to shoot
        //tan(a) = opposite / adjacent
        var adjacent = 1; //optional
        var opposite = adjacent * Math.tan(angle * Math.PI / 180);
        var p = new cc.Vec2(this.node.x + opposite, this.node.y + adjacent);
        this.direction = p.sub(this.node.position).normalize();
    }

    //shoot bullet
    shoot () {
        var newBullet = this.createBullet(this.game.canvas.node);

        var bulletWorldPos = this.prepareBullet.parent.convertToWorldSpaceAR(this.prepareBullet.position);
        newBullet.setPosition(this.game.canvas.node.convertToNodeSpaceAR(bulletWorldPos));

        newBullet.getComponent("Bullet").velocity = this.direction.mul(this.bulletSpeed);

        //update bullet count
        this.bulletCount--;
        this.bulletCountLabel.string = "x" + this.bulletCount.toString();

        //reset bullet count
        if (this.bulletCount <= 0) {
            this.bulletCount = this.accumulationBullet;
        }
    }

    createBullet (parentNode:cc.Node) : cc.Node {
        var bullet = null;
        if (this.poolNode.size() > 0) {
            bullet = this.poolNode.get();
        } else {
            bullet = cc.instantiate(this.bulletPrefab);
        }

        bullet.parent = parentNode;
        bullet.getComponent("Bullet").gameManager = this.game;
        return bullet;
    }

}
