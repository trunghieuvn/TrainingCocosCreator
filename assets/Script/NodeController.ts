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

import DotController from "./DotController";

enum NodeState {
    Init,
    Move,
    Rotate,
    Done
}

@ccclass
export default class NodeController extends cc.Component {

    @property(cc.Node) dot: cc.Node = null;
    @property(cc.Node) line: cc.Node = null;

    SpeedRotate : number = 1.3;
    SpeedMove : number = 0.15;
    public state : NodeState = NodeState.Init;
    
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.state = NodeState.Init;
    }
    public MoveTo() {
        this.node.runAction(cc.sequence(
            cc.moveTo(this.SpeedMove, new cc.Vec2(0, 0)),
            cc.callFunc(this.MoveDone.bind(this))
        ));
    }
    MoveDone() {
        this.line.active = true;
        this.state = NodeState.Rotate;
    }
    async start () {
        this.MoveTo();
    }

    update (dt) {
        if(NodeState.Rotate == this.state) {
            var rotate = this.node.rotation + this.SpeedRotate;
            this.node.rotation = rotate;
        }
    }
}
