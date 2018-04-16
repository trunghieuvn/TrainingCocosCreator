const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    @property(cc.Canvas)
    canvas:cc.Canvas = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
       
    }

    start () {

    }

    // update (dt) {}
}