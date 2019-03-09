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
    @property(cc.Canvas) canvas: cc.Canvas =null;
    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
         cc.log("onloead nè");
        // this.node.scale=4;
        //this.node
        this.last=(new Date()).getTime();
        this.canvas.node.on(cc.Node.EventType.TOUCH_END,this.onClick.bind(this);

    }

    start () {
        cc.log("start nè");
    }
    @property
    count: number = 0;
    @property
    last: number = 0;
    @property
    _isRunning: Boolean = false;
    update (dt) {
        if(!this._isRunning){
            return;
        } 
         this.count=(new Date()).getTime();
         //cc.log(dt);
         var c=(this.count-this.last)/1000;
         if(c>10){
            this.label.string="Bạn đã thua";
            this._isRunning=false;
         }else{
        
            this.label.string=parseInt(c+"")+"";
         }
         
    }
    onClick(){
        this.last=(new Date()).getTime();
    }
    onStart(){
        this.last=(new Date()).getTime();
        this._isRunning=true;
    }
}
