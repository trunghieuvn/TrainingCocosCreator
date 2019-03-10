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
import Player from './Player';
import Tower, {BridgeState} from './Tower';



@ccclass
export default class GameWorld extends cc.Component {
    @property(cc.Prefab) prefTower: cc.Prefab = null;
    @property(cc.Node) camera: cc.Node = null;
    @property(cc.Node) player: cc.Node = null;

    // =========================== Members ================================
    private headTower: cc.Node = null;
    private tailTower: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // init event touch listener
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd.bind(this));
    }

    start () {
        this.spawnTower();
    }

    // update (dt) {}

    // =========================== Methods =================================
    private createTower (x: number, y:number) :cc.Node {
        let tower = cc.instantiate(this.prefTower);
        tower.x = x;
        tower.y = y;
        tower.zIndex = -1;
        this.node.addChild(tower);
        return tower;
    }

    public spawnTower () {
        // random position
        let newTower: cc.Node = null;
        let x, y;

        if (this.tailTower === null) {
            newTower = this.createTower(-200, -100);
            let worldPos = newTower.convertToWorldSpaceAR(newTower.getChildByName('Top').position);
            let nodePos = this.node.convertToNodeSpaceAR(worldPos);
            this.player.setPosition(nodePos);
        } else {
            if (this.tailTower.x < 0) {
                x = Math.random() * 50 + 150;
            } else {
                x = Math.random() * -50 - 150;
            }
            y = Math.random() * 100 + 200 + this.tailTower.y;

            newTower = this.createTower(x, y);

            // flip tower
            newTower.scaleX = x < 0? 1 : -1;
        }
        this.headTower = this.tailTower;
        this.tailTower = newTower;
        this.tailTower.zIndex = this.headTower.zIndex - 1;
    }

    public onTouchStart (touch: cc.Event.EventTouch) {
        let headTowerComponent = this.headTower.getComponent(Tower);
        if (headTowerComponent.bridgeState === BridgeState.None) {
            headTowerComponent.bridgeState = BridgeState.Bridging;
            headTowerComponent.vector = new cc.Vec2(this.tailTower.x - this.headTower.x, this.tailTower.y - this.headTower.y);
        }
    }

    public onTouchEnd (touch: cc.Event.EventTouch) {
        if (this.headTower.getComponent(Tower).bridgeState === BridgeState.Bridging) {
            this.headTower.getComponent(Tower).bridgeState = BridgeState.Bridge;

            let worldPos = this.tailTower.convertToWorldSpaceAR(this.tailTower.getChildByName('Top').position);
            let nodePos = this.node.convertToNodeSpaceAR(worldPos);
    
            this.scheduleOnce(() => {
                this.player.getComponent(Player).move(nodePos.x, nodePos.y);
            }, 1);
        }
    }
}
