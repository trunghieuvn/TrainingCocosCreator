const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerState extends cc.Component {

    currentLevel: number = 1;
    currentScore: number = 0;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}

    score(scoreAdded) : number {
        this.currentScore += scoreAdded;
        return this.currentScore;
    }
}
