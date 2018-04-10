const {ccclass, property} = cc._decorator;
import game from "./GameManager"
@ccclass
export default class CollisionManager extends cc.Component {

    @property(cc.Prefab) particle: cc.Prefab = null;

    @property(game) Game: game = null;

    onLoad() {
        // init logic
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;
       
    }

    onCollisionEnter(other) {
        other.node.active = false;
        other.destroy();
        this.Game.gainScore();
    }

}
