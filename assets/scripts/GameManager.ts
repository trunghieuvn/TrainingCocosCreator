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

//import Egg from "./Egg";

export enum GameState {
    Started,
    InGame,
    GameOver
}

@ccclass
export default class GameManager extends cc.Component {


    @property(cc.Prefab)
    eggPrefab:cc.Prefab = null;

    @property(cc.Canvas)
    canvas:cc.Canvas = null;

    @property(cc.Node)
    player:cc.Node = null;

    @property(cc.Label)
    scoreLabel:cc.Label = null;

    @property(cc.Label)
    heartNumber:cc.Label = null;

    @property(cc.Button)
    btnPlay:cc.Button = null;

    @property(cc.Button)
    btnExit:cc.Button = null;

    @property(cc.Label)
    btnLabel:cc.Label = null;

    @property(cc.Label)
    gameOverLabel:cc.Label = null;

    @property({url: cc.AudioClip})
    scoreAudio:cc.AudioClip = null;

    @property({url: cc.AudioClip})
    lossEggAudio:cc.AudioClip = null;

    @property({url: cc.AudioClip})
    gameOverAudio:cc.AudioClip = null;

    @property(cc.Label)
    levelLabel:cc.Label = null;

    @property(cc.Label)
    levelUpLabel:cc.Label = null;

    @property(cc.Node)
    setting:cc.Node = null;

    maxHeart:number = 0;
    levelUnit:number = 0;
    spawnEggInterval:number = 0;
    intervalFactor:number = 0;



    gameState:GameState;
    level:number;
    score:number;
    heart:number;
    isPlaying:boolean;
    isGameOver:boolean;
    eggPool:cc.NodePool;
    

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.isPlaying = false;
        this.player.active = false;
        this.btnPlay.node.active = true;
        this.btnExit.node.active = false;
        this.gameState = GameState.Started;

        //init pool containt eggs node
        this.eggPool = new cc.NodePool();
        var eggEstimate = 10;
        for (let i = 0; i < eggEstimate; i++) {
            var egg = cc.instantiate(this.eggPrefab);
            this.eggPool.put(egg);
        }
        
        console.log("ON LOAD");
    }

    start () {
        var settingComponent = this.setting.getComponent("Setting");
        this.maxHeart = settingComponent.maxHeart;
        this.levelUnit = settingComponent.levelUnit;
        this.spawnEggInterval = settingComponent.spawnEggInterval;
        this.intervalFactor = settingComponent.intervalFactor;

        this.level = 1;
        this.score = 0;
        this.heart = this.maxHeart;
        this.heartNumber.string = this.heart.toString();
        this.scoreLabel.string = "Score: " + this.score.toString();
        this.levelLabel.string = "Level: " + this.level.toString();    
        this.gameOverLabel.node.active = false;
        this.isGameOver = false;
        console.log("ON START");
    }

    update (dt) {
        switch (this.gameState) {
            case GameState.Started: {

            } break;

            case GameState.InGame: {
                if (this.isPlaying == false) {
                    this.isPlaying = true;
                    this.schedule(this.spawnEgg, this.spawnEggInterval);
                }
                
                if (this.heart <= 0) {
                    this.gameState = GameState.GameOver;
                }

            } break;

            case GameState.GameOver: {
                if (!this.isGameOver) {
                    this.isGameOver = true;
                    //cc.audioEngine.play(this.scoreAudio, false, 1);
                    this.gameOver();
                }
            } break;
        }
        
    }

    onRestart () {
        this.start();
        this.schedule(this.spawnEgg, 1);
    }

    spawnEgg () {
        var egg = null;
        if (this.eggPool.size() > 0) {
            egg = this.eggPool.get();
        } 
        else {
            egg = cc.instantiate(this.eggPrefab);
        }

        this.canvas.node.addChild(egg);
        egg.setPosition(this.getRandomEggPosition(egg));
        egg.getComponent("Egg").gameManager = this;
        egg.getComponent("Egg").canvas = this.canvas;
        egg.getComponent("Egg").setting = this.setting;
    }

    getRandomEggPosition (egg:cc.Node):cc.Vec2 {
        var xPos = cc.randomMinus1To1() * this.canvas.node.width / 2;
        var yPos = this.canvas.node.height / 2 + egg.height / 2;
        return new cc.Vec2(xPos, yPos);
    }

    gainScore () {
        this.score++;
        this.scoreLabel.string = "Score: " + this.score.toString();
        if (this.score >= this.level * this.levelUnit) {
            this.levelUp();
        }
        cc.audioEngine.play(this.scoreAudio, false, 1);
    }

    gainHeart () {
        this.heart++;
        this.heartNumber.string = this.heart.toString();
    }

    lossHeart () {
        this.heart--;
        this.heartNumber.string = this.heart.toString();
        cc.audioEngine.play(this.lossEggAudio, false, 1);
    }

    gameOver () {
        console.log("GAME OVER");
        this.unschedule(this.spawnEgg);
        this.gameOverLabel.node.active = true;
        this.player.active = false;
        this.btnPlay.node.active = true;
        this.btnExit.node.active = true;
        this.btnLabel.string = "Relay";
    }

    levelUp () {
        this.level++;
        this.levelLabel.string = "Level: " + this.level.toString();
        this.spawnEggInterval /= this.intervalFactor;
        this.unschedule(this.spawnEgg);
        this.schedule(this.spawnEgg, this.spawnEggInterval);
        this.levelUpLabel.getComponent("LevelUpEffect").onActive();
    }

}
