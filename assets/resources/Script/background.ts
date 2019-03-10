// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import Play from './play';
const {ccclass, property} = cc._decorator;

@ccclass
export default class Background extends cc.Component {

    canvas : cc.Canvas;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      cc.log('onload')
      this.canvas = this.getComponent(cc.Canvas)
      this.canvas.node.on(cc.Node.EventType.TOUCH_END, this._touchEnd.bind(this))
    }

    start () {
      cc.log('onstart')
    }

    _touchEnd() {
      
    }
    // update (dt) {}
}
