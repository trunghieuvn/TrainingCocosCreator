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
      // this.canvas.node.on('touchmove', function (event) {
      //   event.
      //   var delta = event.touch.getDelta();

      //   this.x += delta.x;
      //   this.y += delta.y;

      // }, this.node);

      // this.node.active = false;
      // this.node.scale = 4
      // this.canvas.node.on(cc.Node.EventType.TOUCH_END, this._onCanvasTouchStart2.bind(this))
    //   for(var i = 0; i < 5; i++) {
    //     var obj =  cc.instantiate(this.prefabBall);

    //     var ball = obj.getComponent(Ball);
    //     var dir = i;
    //     if (dir % 2 == 0) {
    //       dir *= -1;
    //     }
    //     obj.x = dir * 80;//ball.node.width;
    //     obj.y = dir * 80;//ball.node.width;
        
    //     ball.setSpeed(dir * 100);
    //     this.node.addChild(obj);
    //  }
	}

  onCanvasTouchStart(event: cc.Event.EventCustom) {
    // touch.
    // event.touch
    cc.log(event);
    cc.log(event.touch._point.x + " " + event.touch._point.y);
    
    var obj =  cc.instantiate(this.prefabBall);

    //obj.convertToNodeSpace(this.canvas.node.getPosition());

    obj.x = event.touch._point.x;
    obj.y = event.touch._point.y;
    var newPos = obj.convertToNodeSpace(this.node.position);
    obj.x = newPos.x;
    obj.y = newPos.y;
    // new cc.Vec2(event.touch._point.x, event.touch._point.y)

    var ball = obj.getComponent(Ball);
    ball.addCollistionCallback(this.collistionCallback.bind(ball));

    this.totalBall += 1;
    ball.setName('ball ' + this.totalBall)
    this.node.addChild(obj);
  }

  totalBall = 0;

  collistionCallback(ball) {
    cc.log("collistionCallback");
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
