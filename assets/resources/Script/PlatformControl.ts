const { ccclass, property } = cc._decorator;

@ccclass
export default class Platform extends cc.Component {

    @property
    hp: number = 1;

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
    }

    start() {

    }

    update(dt) { 

    }

    onCollisionEnter(other, self) {
        cc.log("Va cham");
    }
}
