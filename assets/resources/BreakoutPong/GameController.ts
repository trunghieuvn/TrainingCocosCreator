import {GameState} from './GameDefine';
import BallControl from './BallControl';

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameController extends cc.Component {

  @property(cc.Prefab)
  prefabBall : cc.Prefab = null;

  guiNode : cc.Node = null;

  layer_MainMenu : cc.Node;
  layer_Playing : cc.Node;

  state : GameState = GameState.None;
  
  // LIFE-CYCLE CALLBACKS:
  onLoad () {
      cc.log('onload')
  }
  
  winSizeW: number = 0;
  winSizeH: number = 0;

  start() {
    this.winSizeW = cc.winSize.width;
    this.winSizeH = cc.winSize.height;

    this.guiNode = this.node.parent.getChildByName("GUIManager");
    this.layer_MainMenu = this.guiNode.getChildByName("MainMenu");
    this.layer_Playing = this.guiNode.getChildByName("PlayNode");
    this.init ();
  }

  init() {
    this.layer_MainMenu.active = true;  
    this.layer_Playing.active = false;
    this.state = GameState.MainMenuGame;
    this.layer_MainMenu.getChildByName("btnPlay").on(cc.Node.EventType.TOUCH_START, this.startGame.bind(this));
  }

  startGame() {
    this.layer_MainMenu.active = false;  
    this.layer_Playing.active = true;

    var obj =  cc.instantiate(this.prefabBall);
    obj.x = this.winSizeW/2;
    obj.y = 5;

    var ball = obj.getComponent(BallControl);
    // ball.addCollistionCallback(this.collistionCallback.bind(ball));
    this.node.addChild(obj);
  }  

}