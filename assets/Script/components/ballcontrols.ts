
const {ccclass, property} = cc._decorator;

@ccclass
export default class BallControls extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property
    rotate: number = 1;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    }

    start () {

    }

    serRotate (rt:number = 1) {
        this.rotate = rt;
    }

    update (dt) {
        this.node.rotation += this.rotate * 10;
    }
}
