const {ccclass, property} = cc._decorator;

@ccclass
export default class GameSetting extends cc.Component {

    @property([cc.Prefab]) levels = [];

    @property
    speed : number = 500;

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
