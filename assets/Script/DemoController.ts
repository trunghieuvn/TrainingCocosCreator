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

    @property(cc.Button) btStart:cc.Button;
    @property(cc.Button) btStop:cc.Button;

    
    text: string = 'hello';
    flag: number = 0;
    totalTime: number = 0;
    totalSecond: number = 0;
    

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    }

    btnStart(){
        this.flag  = 1;
        var n = Date.now();
        this.totalTime = n;
        this.btStart.node.active = false;
        this.btStop.node.active = false;
        //this.btStart.
        //this.btStop.enabled = false;
    }

    countTime(){
        if(this.flag==1){
            var sp = Date.now() - this.totalTime;
            sp = Math.floor(sp/1000);
            this.label.string = sp.toString();
            if(sp>=12) {
                this.label.string= "Game Over";
                this.flag = 0;
            }
        }
    }

    start () {
        cc.log("start");
    }

    

    update (dt) {
         //this.countTime();
    }
}
