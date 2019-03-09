import BirdControll from "./BirdControll";

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


enum BirdState {
    Ready, Rise, FreeFall, Drop, Dead
}
@ccclass
export default class Game extends cc.Component {


    @property(cc.Canvas) canvas : cc.Canvas = null;
    @property(cc.Node) readly : cc.Node = null;

    @property(cc.Node) bird : cc.Node = null;
    // PRIVATE 
    isPlayed : boolean = false;

    
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.canvas.node
        .on(cc.Node.EventType.TOUCH_START, 
                    this.onTouchStart.bind(this));
    }
    onTouchStart() {
        cc.log("PLAY ..");
        this.isPlayed = true;
        this.readly.active = false;

        this.bird.getComponent(BirdControll).rise();
    }
    start () {
        
    }

    update (dt) {}

}
