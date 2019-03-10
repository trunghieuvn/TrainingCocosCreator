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

// import BallControll from './ballcontroll';

@ccclass
export default class GameController extends cc.Component {

    // @property(cc.Label) label: cc.Label = null;
    @property(cc.Prefab) ball : cc.Prefab = null;


    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        for(var i = 0; i < 3; i++) {
            var obj_ball = cc.instantiate(this.ball);
            obj_ball.x = 100 * i;
            obj_ball.y = 10 * i;
            this.node.addChild(obj_ball);
        }
    }

    start () {

    }

    
    update (dt) {
        
        
    }

}
