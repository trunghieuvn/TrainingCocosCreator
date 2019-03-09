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
export default class VuongshitController extends cc.Component {

    @property(cc.Node) gameover: cc.Node = null;
    @property(cc.Label) label: cc.Label = null;
    @property(cc.Label) gameovertxt: cc.Label = null;
    @property(cc.Node) play: cc.Node = null;

    canvas: cc.Canvas;
    // @property(cc.Canvas)
    // canvas: cc.Canvas = null;

    @property
    text: string = 'hello';
    ranhroi: number = 0;
    time: number = 0;
    rachua: number = 1;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.canvas = this.getComponent(cc.Canvas);
        this.label.string = "12345";
        this.canvas.node.on(cc.Node.EventType.TOUCH_END, this._touchEnd.bind(this));

    }

    start () {
        
    }

    update (dt) {
        this.updatetime();
        if (this.time >= 10) {
            cc.log(this.gameover.name);
            if (this.gameover.name == "gameover"){
                this.gameovertxt.node.active = true;
                this.gameover.active = true;
                this.rachua = 1;
                // this.canvas.node.active = false;
            }
        }
    }

    updatetime () {
        cc.log("updatetime: " + this.rachua);
        if (this.rachua == 0) {
            this.ranhroi++;
            if (this.ranhroi == 60) {
                this.time++;
                this.ranhroi = 0;
                this.label.string = this.time;
            }
        }
    }

    btplay () {
        this.rachua = 0;
        this.play.active = false;
    }

    btpause () {
        this.rachua = 1;
    }

    _touchEnd() {
        cc.log("touch");
        this.time = 0;
        this.label.string = this.time;
    }
}
