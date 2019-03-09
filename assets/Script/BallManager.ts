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
import BallControl from './BallControl';
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Prefab)
    prefabBall: cc.Prefab = null;

    @property(cc.Canvas)
    canvas:cc.Canvas = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.canvas.node.on(cc.Node.EventType.TOUCH_END,
            this.onTouchEnd.bind(this));
           
    }
    onTouchEnd(event){
        this.start();
    }
    start () {
        for(var i =0; i<3;i++){
            var objBall = cc.instantiate(this.prefabBall);
            objBall.x = -60 + (i * 60); 
            if(i%2 == 0)
            {
                var obj = objBall.getComponent(BallControl);
                obj.setDirection();
            }
            this.node.addChild(objBall);
        }
    }

    update (dt) {
        
    }
}
