import BrickControl from './BrickControl';

const {ccclass, property} = cc._decorator;

@ccclass
export default class Level extends cc.Component {

    @property(cc.Prefab)
    levelNode : cc.Prefab = null;
  
    @property(cc.Prefab)
    brickLevel1 : cc.Prefab = null;

    @property
    numRows: number = 2;

    @property
    numBrickPerRow: number = 4;

    @property
    padding: number = 10;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        if (this.levelNode != null) {
            return;
        }
        this.init();
    }

    init() {
        var spaceEachBrick = Math.floor(
            (cc.winSize.width - this.brickLevel1.data.width * this.numBrickPerRow - this.padding * 2) 
                / (this.numBrickPerRow -1));

        var x = this.padding + this.brickLevel1.data.width / 2;
        var y = cc.winSize.height - this.padding - this.brickLevel1.data.height / 2;
        for (var i = 0; i < this.numRows; i++) {
            for (var j = 0; j < this.numBrickPerRow; j++) {
                this.addBrick(x, y);
                x += this.brickLevel1.data.width + spaceEachBrick;
            }
            x = this.padding;
            y -= this.brickLevel1.data.height + this.padding;
            
        }
    }

    collisionCallback: () => void
    setCollisionCallback(collisionCallback) {
        this.collisionCallback = collisionCallback;
    }

    addBrick(x, y) {
        var objP =  cc.instantiate(this.brickLevel1);
        objP.x = x;
        objP.y = y;
    
        var brick = objP.getComponent(BrickControl);
        brick.setCollisionCallback(this.collisionCallback);
        this.node.addChild(objP);
    }
    // update (dt) {}
}
