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

import {BallController} from './BallController';

@ccclass
export default class GameController extends cc.Component {

    @property(cc.Prefab) ball_prefab : cc.Prefab = null;

    onLoad () {
        for(var i = 0 ; i< 3; i++){
            var obj_ball = cc.instantiate(this.ball_prefab);
            obj_ball.x = -900 + 300 * i;
            this.node.addChild(obj_ball);
        }

        for(var i = 0 ; i< 3; i++){
            //khoi tao node
            var obj_ball = cc.instantiate(this.ball_prefab);
            //get  component trong node
            var ball = obj_ball.getComponent(BallController);
            ball.speed = -100;

            obj_ball.x = -900 + 300 * i;

            //add node vao node khac
            this.node.addChild(obj_ball);
        }
    }

    start () {

    }

    update (dt) {
        
    }
}
