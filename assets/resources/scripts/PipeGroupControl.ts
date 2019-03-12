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
export default class PipeGroup extends cc.Component {

    distance : number;
    pos_y : number;

    isMove = false;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {}

    start () {


    }

    sayHi() {

        return this;
    }
    setDisAndLoadPositionY(dis : number, y : number) 
    : PipeGroup {
        var top = this.node.getChildByName("top");
        var bottom = this.node.getChildByName("bottom");
        
        top.y =  y + dis/ 2;
        bottom.y = y - dis / 2;

        return this;
    }


    update (dt) {
        if(this.isMove == false)
            return;

            
    }
}
