const {ccclass, property} = cc._decorator;
import BallControll from './BallControll';
@ccclass
export default class GameController extends cc.Component {

    @property(cc.Prefab) ball_prefab : cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:
    onLoad () {

        for(var i = 0; i < 3; i++ ) {
            var obj_ball = cc.instantiate(this.ball_prefab);
            obj_ball.x = -300 + 300 * i;

            var ball = obj_ball.getComponent(BallControll);
            if(i % 2 == 0 )
                ball.changeDir();
                
            this.node.addChild(obj_ball);
        }
     
    }
    

    start () {

    }

    // update (dt) {}
}
