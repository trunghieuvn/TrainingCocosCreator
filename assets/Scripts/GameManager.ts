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
export default class GameManager extends cc.Component {

    @property(cc.Label)     label: cc.Label = null;
    @property               text: string = 'hello';

    @property(cc.Node) btnPlay: cc.Node = null;
    @property(cc.Node) btnRetry: cc.Node = null;
    totalTime : number = 0;
    isPlay : boolean = false;

    @property(cc.Canvas) canvas : cc.Canvas = null;
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.canvas.node.on(cc.Node.EventType.TOUCH_START, 
            this.ontouchStart.bind(this));
            this.canvas.node.on(cc.Node.EventType.TOUCH_MOVE, 
                this.ontouchMove.bind(this));
            this.canvas.node.on(cc.Node.EventType.TOUCH_END, 
                this.ontouchEnd.bind(this));
    }
    ontouchStart() {
        cc.log("onTOUCHSTART");
    }
    ontouchEnd() {
        cc.log("ontouchEnd");
        this.totalTime = 0;
    }
    ontouchMove() {
        cc.log("onTOuchMove")
    }
    start () {
        // this.totalTime = 0;
    }

    update (dt) {
        if (this.isPlay == true)
        {
            this.totalTime += dt;
            this.label.string = Math.floor(this.totalTime).toString();     
            
            if(Math.floor(this.totalTime) >= 6)
            {
                this.isPlay = false;
                this.btnRetry.active = true;
            }
        }   
            
    }

    clickBtnPlay() {
        cc.log("cilck btnPlay");
        this.isPlay = true;

        this.btnPlay.active = false;
    }

    clickBtnRetry() {
        cc.log("click retry");
        this.totalTime = 0;
        this.isPlay = true;
        this.btnRetry.active = false;
    }
}
