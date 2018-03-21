// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

const {ccclass, property} = cc._decorator;

enum  GameState {
    Start,
    InGame,
    EndGame
}


@ccclass
export default class GameManager extends cc.Component {

    // Inspector
    // @property({number}) speed: number = 0;
    @property(cc.Label) label: cc.Label = null;
    @property(cc.Canvas) canvas : cc.Canvas = null;
    @property(cc.Node) MainMenu : cc.Node = null;
    @property(cc.Node) GameOver : cc.Node = null;
    @property(cc.Sprite) cocos : cc.Sprite = null;

    @property(cc.Node) BoardGame : cc.Node = null;
    @property(cc.Prefab) nodePrefab : cc.Prefab = null;
    // private
    totalTime : number;
    state : GameState;

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        cc.log("HieuLog onLoad");
        this.canvas.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this));
        this.canvas.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd.bind(this));
        // this.node.active = true;
        this.loadLevel(20, 6);

        // var obj = cc.instantiate(this.nodePrefab);
        // obj.setPosition(0, -210);
        // this.node.addChild(obj);
    }

    loadLevel(level, numberDot) {
        for(var i = 0; i < level; i++) {
            var obj = cc.instantiate(this.nodePrefab);
            obj.rotation =  i * ( 360 / level);
            this.BoardGame.addChild(obj);
        }

    }
    playGame() {
        this.state = GameState.InGame;
        this.MainMenu.active = false;
        this.totalTime = 0;
        
        this.cocos.node.rotation = 0;
        this.updateUI();
    }
    // TouchEvent
    onTouchStart(event) {
        cc.log("onTouchStart " + event);
    }
    onTouchEnd(event) {
        cc.log("HieuLog onTouchEnd");
        this.playGame();

    }
    // End TouchEvent

    start () {
        cc.log("HieuLog start");
        this.totalTime = 0;
        this.state = GameState.Start;
    }

    update (dt) {
        var rotate = this.BoardGame.rotation + 1.2;
        cc.log("rotate: " + rotate);

        this.BoardGame.rotation = rotate;

        switch(this.state){
            case GameState.Start:
            break;
            case GameState.InGame:
            this.totalTime += dt;

            if(Math.floor(this.totalTime) > 5 ) {
                this.cocos.node.runAction(cc.rotateTo(3, 180));
                this.state = GameState.EndGame;
                this.GameOver.active = true;
            }
            this.updateUI();
            
            break;
            case GameState.EndGame:

            break;
            default:
            break;
        }
       
        
    }
    updateUI() {
        cc.log("updateUI " + this.totalTime.toString());
        this.label.string = Math.floor(this.totalTime).toString();
    }
    btnPlay() {
        this.playGame();
    }
    btnExit() {
        cc.game.end();
    }

    btnClose() {
        this.GameOver.active = false;
        this.state = GameState.Start;
    }

    btnGoToMenu() {
        this.btnClose();
        this.MainMenu.active = true;
    }

    btnRetry() {
        this.btnClose();
        this.playGame();
    }
}
