// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {
    
    @property(cc.Label)  label: cc.Label = null;

    isStart : boolean;
    totalTime: number = 0;
    
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        
    }

    start () {
        this.totalTime = 0;
        this.isStart = false;
    }

    update (dt) {

        if (this.isStart == false)
            return;

        if(Math.floor(this.totalTime) > 5)
            return;

        this.totalTime += dt;
        this.label.string = Math.floor(this.totalTime).toString();
    }

    // GUI
    btnPlay() {
        this.isStart = true;
    }
    btnExit() {
        cc.game.end();
    }
}
