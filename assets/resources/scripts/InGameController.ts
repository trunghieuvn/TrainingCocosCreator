import BirdControl from "./BirdControl";
import PipeGroup from "./PipeGroup";

const {ccclass, property} = cc._decorator;


@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    @property(cc.Label) lblScore : cc.Label = null;

    @property(cc.Prefab) prefab_pipeGroup : cc.Prefab = null;

    birdControl : BirdControl = null;

    onLoad () {
        this.node.parent.on(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this));
        this.birdControl = this.node.getChildByName("bird1").getComponent(BirdControl);
        
        var pipeGroup = cc.instantiate(this.prefab_pipeGroup);
        pipeGroup.getComponent(PipeGroup).setDisAndY(50, 100);
        this.node.addChild(pipeGroup);
    }

    start () {

    }

    // update (dt) {}

    onTouchStart(){
        this.birdControl.fly();
    }
}
