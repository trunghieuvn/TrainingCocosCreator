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

import NodeController from "./NodeController";
import DotController from "./DotController";

@ccclass
export default class GameController extends cc.Component {

     // Inspector
     @property Speed : number = 0;
     @property PosBegin : cc.Vec2 = new cc.Vec2();

    @property(cc.Prefab) nodePrefab : cc.Prefab = null;
    @property(cc.Node) BoardGame : cc.Node = null;
     
    // LIFE-CYCLE CALLBACKS:
    onLoad () {}

    start () {

    }

    update (dt) {}

    public createNode() {
        var obj = cc.instantiate(this.nodePrefab);
        obj.setPosition(this.PosBegin);
        this.BoardGame.addChild(obj);
        
        obj.getComponent(NodeController).dot.getComponent(DotController).callback = this.callbackCollision.bind(this);
    }

    callbackCollision() {
        cc.log("GameController callbackCollision");
        this.BoardGame.active = false;
    }

    loadLevel(level, numberDot) {
        for(var i = 0; i < level; i++) {
            var obj = cc.instantiate(this.nodePrefab);
            obj.rotation =  i * ( 360 / level);
            this.BoardGame.addChild(obj);
        }

    }
}
