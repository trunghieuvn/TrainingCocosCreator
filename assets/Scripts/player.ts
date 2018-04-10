const {ccclass, property} = cc._decorator;

@ccclass
export default class player extends cc.Component {

    @property(cc.Canvas) canvas: cc.Canvas = null;

    @property minX = 0;
    @property maxX = 0;

    posX: number;

    prePosX: number;
    
    onLoad() {
        // init logic
        this.canvas.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this));
        this.canvas.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove.bind(this));
    }

    onTouchStart (touch, event) {
        this.prePosX = touch.getLocation().x;
    }

    onTouchMove (touch, event) {
        if(this.node.x >= this.minX && this.node.x <= this.maxX)
        {
            this.posX = touch.getLocation().x;
            if (this.posX > this.prePosX) {
                this.node.x += this.posX - this.prePosX;
                this.prePosX = this.posX;
            } else if (this.posX < this.prePosX) {
                this.node.x -= this.prePosX - this.posX;
                this.prePosX = this.posX;
            }
        }
        
        
    }

    update (dt) {
        if (this.node.x <= this.minX) {
            this.node.x = this.minX;
        }
        if (this.node.x >= this.maxX - 1) {
            this.node.x = this.maxX;
        }
    }
}
