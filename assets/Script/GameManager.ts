// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import {GameState} from './GameDefine'
import {Ball} from './Ball'

const {ccclass, property} = cc._decorator;


@ccclass
export default class GameManager extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Canvas)
    canvas: cc.Canvas = null;

    @property(cc.Button)
    button: cc.Button = null;

    @property(cc.Button)
    buttonExit: cc.Button = null;

    @property(cc.Sprite)
    sprite: cc.Sprite = null;

    @property(cc.Prefab)
    prefab: cc.Prefab = null;

    text: string = 'hello';

    totalTime: number = 0;

    num: number = 0;

    state: GameState;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.log("GameManager onLoad");
        this.label.string = 'Hello, World'
        this.totalTime = new Date().getTime()
        this.canvas.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd.bind(this))
    }

    onTouchEnd(event) {
        this.totalTime = new Date().getTime()
        this.start()
    }

    start () {
        cc.log("GameManager start")
        for(var i = 0; i < 5; i++) {
            var obj = cc.instantiate(this.prefab)
            obj.x = -100 + i * 100
            obj.y = i * 30
            this.node.addChild(obj)

            var ball = obj.getComponent(Ball)
            ball.setSpeed(i * 100 + 50)
            ball.moveObj()

            var obj = cc.instantiate(this.prefab)
            obj.x = -100 + i * 100
            obj.y = this.canvas.node.height - (i * 30)
            this.node.addChild(obj)

            var ball = obj.getComponent(Ball)
            ball.setSpeed((i * 100 + 50) * -1)
            ball.moveObj()
        }
    }

    btPlay() {
        this.state = GameState.InGame
        this.totalTime = new Date().getTime()
        this.button.node.active = false
        this.sprite.node.rotation = 0
    }

    btExit() {
        this.state = GameState.End
        cc.game.end()
    }

    update (dt) {
        // cc.log("GameManager update dt:" + dt);
        switch (this.state) {
            case GameState.Start:
                break

            case GameState.InGame:
                this.num = Math.floor((new Date().getTime() - this.totalTime)/1000)
                this.label.string = this.num.toString()
                if (this.num == 6) {
                    this.totalTime = new Date().getTime()
                    this.state = GameState.End
                    this.button.node.active = true
                    this.sprite.node.rotation = 180
                }
                break

            case GameState.End:
                break
        }
        
    }
}
