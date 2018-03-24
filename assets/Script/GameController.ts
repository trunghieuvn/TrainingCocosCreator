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

import NodeController from './NodeController';
import DotController from "./DotController";
import GameSettings from "./GameSettings";
// import SpawnNode

@ccclass
export default class GameController extends cc.Component {

    @property(cc.Prefab) nodePrefab : cc.Prefab = null;
    @property(cc.Node) SpawNodeController : cc.Node = null;
    
    @property (GameSettings) gameSetting : GameSettings = null;

    callBackEndGame : () => void = null;

    listNode : Array<cc.Node> = new Array<cc.Node>();
    created : boolean = true;
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        cc.log("HieuLog GameController onLoad");
    }

    start () {
        cc.log("HieuLog GameController start");
    }

    update (dt) {
        if(this.created == false)
             return;
        this.listNode.forEach(element => {
            element.getComponent(NodeController).OnUpdate(dt);
        });
    }

    public async createNode() {
        cc.log("GameController createNode"); 

        var obj = cc.instantiate(this.nodePrefab);
        obj.setPosition(this.gameSetting.PosBegin);
        this.SpawNodeController.addChild(obj);

        var node = obj.getComponent(NodeController);
        node.SpeedMove = this.gameSetting.SpeedMove;
        node.SpeedRotate = this.gameSetting.SpeedRotate;

        var dot = node.dot.getComponent(DotController);
        dot.callback = this.callbackCollision.bind(this);

        this.listNode.push(obj);
        cc.log("size: " + this.listNode.length);
        this.created = true;
    }

    callbackCollision() {
        cc.log("GameController callbackCollision");

        if(this.callBackEndGame != null) {
            this.callBackEndGame();
        }
        cc.log("size: " + this.listNode.length);
        var length = this.listNode.length;
        for(var i = 0; i < length; i ++)  {
            this.listNode[i].getComponent(NodeController).EndGame();
        }
    }

    loadLevel(level, numberDot) {
        for(var i = 0; i < level; i++) {
            var obj = cc.instantiate(this.nodePrefab);
            obj.rotation =  i * ( 360 / level);
            obj.setPosition(0, 0);
            this.SpawNodeController.addChild(obj);

            var node = obj.getComponent(NodeController)
            node.SpeedMove = this.gameSetting.SpeedMove;
            node.SpeedRotate = this.gameSetting.SpeedRotate;
            node.StateMoveDone(); 
        }

    }

    Reset() {
        var length = this.listNode.length;
        for(var i = 0; i < length; i ++)  {
            this.listNode.pop();
        }
        this.SpawNodeController.removeAllChildren();
    }
}
