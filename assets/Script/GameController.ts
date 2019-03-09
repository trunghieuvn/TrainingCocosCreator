// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import Ball from './ball';

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameController extends cc.Component {

  @property(cc.Prefab)
  prefabBall : cc.Prefab = null;

  @property(cc.Canvas) canvas : cc.Canvas = null;

  // LIFE-CYCLE CALLBACKS:
  onLoad () {
      cc.log('onload')

      this.canvas.node.on(cc.Node.EventType.TOUCH_START, this.onCanvasTouchStart.bind(this));

      // this.node.active = false;
        // this.node.scale = 4
      // this.canvas.node.on(cc.Node.EventType.TOUCH_END, this._onCanvasTouchStart2.bind(this))
      for(var i = 0; i < 5; i ++ ){
        var obj =  cc.instantiate(this.prefabBall);
        obj.x = i * 30;
        obj.y = i * 30;
        this.node.addChild(obj);
        
        var ball = obj.getComponent(Ball);
       //  ball.MoveObj();
       //  ball.setSpeed(i * 100);     
     }
 
	}

  onCanvasTouchStart () {
    var obj =  cc.instantiate(this.prefabBall);
    obj.x = 30;
    obj.y = 30;
    this.node.addChild(obj);
  }
  // start () {
    // this.totalTime = 0;
    // this.gameState = GameState.Started;
    // for(var i = 0; i < 5; i ++ ){
    //    var obj =  cc.instantiate(this.prefabBall);
    //    obj.x = i * 30;
    //    obj.y = i * 30;
    //    this.node.addChild(obj);
       
    //    var ball = obj.getComponent(Ball);
    //   //  ball.MoveObj();
    //   //  ball.setSpeed(i * 100);     
    // }
// }
// update (dt) {
//     switch(this.gameState) {
//         case GameState.Started:
//         {
//             break;
//         }
//         case GameState.InGame:
//         {
//             this.totalTime += dt;           
//             break;
//         }
//         case GameState.GameOver:
//         {
//             break;
//         }
//     }    
//     this.label.string = Math.floor(this.totalTime).toString();
// }


}
