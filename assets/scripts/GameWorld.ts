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
import CameraControl from './CameraControl';
import Player from './Player';


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

    private spawnTower () {
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
            y = Math.random() * 100 + 400 + this.tailTower.y;

            newTower = this.createTower(x, y);
        }
        this.headTower = this.tailTower;
        this.tailTower = newTower;
    }

    public onTouchStart (touch: cc.Event.EventTouch) {
        this.spawnTower();
        let worldPos = this.tailTower.convertToWorldSpaceAR(this.tailTower.getChildByName('Top').position);
        let nodePos = this.node.convertToNodeSpaceAR(worldPos);
        this.player.getComponent(Player).move(nodePos.x, nodePos.y);
    }
}
