// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import BallControll from './BallControll';

@ccclass
export default class GameController extends cc.Component {
    
    @property(cc.Prefab) ball_prefab: cc.Prefab = null;

    @property(cc.Label) label: cc.Label = null;

    @property text: string = 'hello';

    @property totalCount : number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    }

    setTotal() {
        cc.log("total:" + this.totalCount);
        // this.label.string = "Count: " + text;
    }

    start () {
        for(var i = 0; i < 3; i++) {
            var ball_obj = cc.instantiate(this.ball_prefab);
            ball_obj.x = -200 + 200 * i;
            var ball = ball_obj.getComponent(BallControll);
            ball.setCallBackController(this.setTotal.bind(this));
            if(i % 2 == 0)

                ball.changeDir();
            this.node.addChild(ball_obj); 
            this.totalCount += ball.count;
        }
    }

    update (dt) {
        

        // this.label.string = "Count: " + this.totalCount;
    }
}
