// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import BirdControl from './BirdControl';
import PipeGroup from './PipeGroupControl';

const {ccclass, property} = cc._decorator;

@ccclass
export default class InGameController extends cc.Component {

    @property(cc.Label) lbl_Score: cc.Label = null;

    @property(cc.Prefab) prfab_PipeGroup : cc.Prefab = null;
    birdCtr : BirdControl; 

    pipeGroups : Array<Node> = [];
    POOL_SIZE = 8;

    // LIFE-CYCLE CALLBACKS:

    random(min , max : number) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
    onLoad () {
        this.node.parent.on(cc.Node.EventType.TOUCH_START, 
            this.onTouchStart.bind(this));
        
        this.birdCtr = this.node.getChildByName("bird")
        .getComponent(BirdControl);

        
        var dis = 250;
        var x = 10, y = 10;
        for( var i = 0; i < this.POOL_SIZE; i ++ ) {
            var group = cc.instantiate(this.prfab_PipeGroup);
            group.active = true;
            // random pos
            x = i * 220;
            y = this.random(-200, 200);

            // 
            group.x = x;
            group.getComponent(PipeGroup)
            .setDisAndLoadPositionY(dis, y)
            .sayHi();

            Math.random()
    
            this.node.addChild(group);
        }
       

        // pipeGroups.
       
    }
    onTouchStart() { 
        this.birdCtr.fly();
    }

    start () {

    }

    // update (dt) {}
}
