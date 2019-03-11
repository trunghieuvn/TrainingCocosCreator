const {ccclass, property} = cc._decorator;

@ccclass
export default class GameSetting extends cc.Component {

    @property([cc.Prefab]) levels = [];

    @property PLAYER_SPEED: number = 300;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {}

    start () {

    }

    // update (dt) {}
}