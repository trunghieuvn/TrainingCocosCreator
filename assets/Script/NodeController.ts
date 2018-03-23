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
    state : NodeState = NodeState.Init;
    
    // callBackNodeController : () => void;
    
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.state = NodeState.Init;
    }
    MoveTo() {
        // this.node.runAction( cc.moveTo(Math.abs((this.dot.getPositionY())) / this.SpeedMove, cc.Vec2.ZERO));
        this.node.runAction(cc.sequence(
            cc.moveTo(Math.abs((this.dot.getPositionY())) / this.SpeedMove, cc.Vec2.ZERO),
            cc.callFunc(this.StateMoveDone.bind(this))
        ));
    }

    EndGame() {
        this.state = NodeState.Done;
    }
   
    StateMoveDone() {
        this.line.active = true;
        this.state = NodeState.Rotate;
    }
    async start () {
        this.MoveTo();
    }

    OnUpdate (dt) {
        if(this.state == NodeState.Rotate) {
            var rotate = this.node.rotation + this.SpeedRotate * dt;
            this.node.rotation = rotate;
        }
    }
}
