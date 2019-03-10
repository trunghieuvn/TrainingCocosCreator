const {ccclass, property} = cc._decorator;
import BallControll from './BallControll';
@ccclass
export default class GameController extends cc.Component {

    @property(cc.Prefab) ball_prefab : cc.Prefab = null;

    @property(cc.Canvas) canvas : cc.Canvas = null;

    // design pattern 

    // state design patter 
    // object pool 
    
    // LIFE-CYCLE CALLBACKS:
    onLoad () {

        cc.director.getCollisionManager().enabled = true;

        this.canvas.node.on(cc.Node.EventType.TOUCH_END, 
            this.touchEnd.bind(this));

        for(var i = 0; i < 3; i++ ) {
            var obj_ball = cc.instantiate(this.ball_prefab);
            obj_ball.x = -300 + 300 * i;

            var ball = obj_ball.getComponent(BallControll);
            ball.setCallBackABC(this.callbackABC.bind(this));
            if(i % 2 == 0 )
                ball.changeDir();
                
            this.node.addChild(obj_ball);
        }
     
    }
    callbackABC() { 
            
    }
        
    touchEnd(customData :  cc.Event.EventCustom) {
        cc.log(customData);
    }

    start () {

    }

    // update (dt) {}
}
