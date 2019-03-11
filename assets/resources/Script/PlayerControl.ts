const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerControl extends cc.Component {

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
    }

    start () {

    }

    update (dt) {}

    onCollisionEnter(other, self) {
        //cc.log("Cham vaio bar layer");
    }
}
