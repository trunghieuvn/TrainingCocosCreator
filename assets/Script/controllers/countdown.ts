const {ccclass, property} = cc._decorator;

@ccclass
export default class CountDownController extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property
    countdown: number = 0;

    @property
    playEvent: boolean = false;

    @property (cc.Button) btnPause: cc.Button;
    @property (cc.Label) btnPauseLabel: cc.Label;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.log("onLoad");
        this.label.string = "Start";
    }

    start () {
        cc.log("Start");
    }

    play () {
        this.playEvent = true;
    }

    pause () {
       if (!this.playEvent)
            cc.game.end();

        this.playEvent = false;
    }

    update (dt) {
        if (!this.playEvent)
            this.btnPauseLabel.string = "Exit";

        if (this.playEvent)
            this.btnPauseLabel.string = "Pause";

        if (this.countdown / 60 >= 10) {
            this.label.string = "Game Over";
            this.countdown = 0;
            this.playEvent = false;
            return;
        }

        if (this.countdown >= 0 && this.playEvent) {
            this.countdown++;
            this.label.string = "Count Down: " + Math.ceil(this.countdown/60);
        }
    }
}
