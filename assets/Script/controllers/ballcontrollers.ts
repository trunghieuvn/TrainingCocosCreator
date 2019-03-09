import BallControls from '../components/ballcontrols';

const {ccclass, property} = cc._decorator;

@ccclass
export default class BallController extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Prefab) ball: cc.Prefab = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var ball1 = cc.instantiate(this.ball);
        ball1.name = 'ball1';
        ball1.x = -245;
        ball1.y = 220;
        this.node.addChild(ball1);

        var ball2 = cc.instantiate(this.ball);
        ball2.name = 'ball2';
        ball2.x = 230;
        ball2.y = 220;
        ball2.getComponent(BallControls).serRotate(-1);
        this.node.addChild(ball2);
    }

    start () {

    }

    // update (dt) {}
}
