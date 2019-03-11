const {ccclass, property} = cc._decorator;

@ccclass
export default class GameSetting extends cc.Component {

    @property([cc.Prefab]) levels = [];

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
