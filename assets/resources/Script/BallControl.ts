const { ccclass, property } = cc._decorator;

import { GameState, BallDirection } from './GameConfig';

@ccclass
export default class BallControl extends cc.Component {

    @property
    speed: number = 100;

    isMoving: boolean = true;

    dir: BallDirection = null;

    onLoad() { }

    start() {

    }

    update(dt) {
        if (this.isMoving === false) {
            return;
        }
    }
}
