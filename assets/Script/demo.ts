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

@ccclass
export default class DemoController extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property
    num: number = 0;
    second: number = 0;
    check: number = 0;

    @property 
    is_run : boolean = false;

    @property (cc.Node) 
    Start: cc.Node = null;

    // @property(cc.Canvas) canvas: cc.Canvas = null;

    canvas: cc.Canvas;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.log("onLoad");
        // this.node.scaleX=4;
        this.canvas = this.getComponent(cc.Canvas);
        this.label.string = "00000";
        this.canvas.node.on(cc.Node.EventType.TOUCH_END,
            this._touchEnd.bind(this));
    }

    _touchEnd(){
        cc.log("touch end");
        if(this.is_run){
            this.num = 0;
            this.gamePlay();
        }
    }

    start () {
        cc.log("start");
    }

    update (dt) {
        // cc.log("dt : " + dt);
        this.second = new Date().getTime();
        
        this.check = parseInt((this.second - this.num)/1000 + "") ;
        cc.log("dt : " + this.check);

        if(this.check < 10) {
            this.label.string = this.check.toString();
            this.is_run = true;
        } else {
            this.gameStop();
        }
        
    }

    gamePlay() {
        cc.log("nhan nut play ne");
        this.num = new Date().getTime();
        this.Start.active = false;
    }

    gameStop(){
        cc.log("game ngung roi ne");
        this.num = 0;
        this.is_run = false;
        this.label.string = "Game end";
    }
}
