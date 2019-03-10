// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import Background from './background';
const {ccclass, property} = cc._decorator;

@ccclass
export default class Play extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Sprite)
    sprite: cc.Sprite = null;

    @property(cc.Canvas)
    canvas: cc.Canvas = null;

    totalTime = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      cc.log('onload')
      // this.node.active = false;
        // this.node.scale = 4
      this.canvas.node.on(cc.Node.EventType.TOUCH_END, this._onCanvasTouchStart2.bind(this))

	}

    start () {
		  cc.log('onstart')
    }

    update (dt) {
      cc.log("GameManager update dt:" + dt);
      this.totalTime += dt;
      this.label.string = Math.floor(this.totalTime).toString();
    }

    _onCanvasTouchStart2() {
      cc.log("_onCanvasTouchStart2");
      // event.
      this.totalTime = 0;
    }

    onTouchStart2(event) {
      cc.log("GameManager onTouchStart " + event);
      // event.
      this.totalTime = 0;
    }

}
