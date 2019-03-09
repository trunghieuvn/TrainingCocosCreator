
const { ccclass, property } = cc._decorator;
@ccclass
export default class Ball extends cc.Component {
    @property public speed: number = 300;
    isMove: boolean;
    chayLenTren: number = 1;
    // LIFECYCLE CALLBACKS:
    onLoad() {
        // this.isMove = false;
    }
    start() {
        // this.speed = 0;
    }

    setHuong() {
        this.chayLenTren *= -1;
    }
    update(dt) {
       
            this.node.rotation += this.chayLenTren *this.speed* dt;
            this.node.y += this.chayLenTren *this.speed* dt;
    }
}