const {ccclass, property} = cc._decorator;

@ccclass
export default class Ball extends cc.Component {

    @property speed = 0;
    @property accel = 0;

    callBack: () => void = null;

    moveX: number;
    maxX: number;

    public setMovex(value) {
        this.moveX = value;
    }
    
    public setMaxX(value) {
        this.maxX = value;
    }

    onLoad() {
        // init logic
    }

    update(dt) {
        this.speed += this.accel * dt;
        this.node.y -= this.speed * dt;
        this.node.x += this.moveX * dt;
        if (this.node.x >= this.maxX || this.node.x <= -this.maxX) {
            this.moveX = -this.moveX;
        }
    }


}
