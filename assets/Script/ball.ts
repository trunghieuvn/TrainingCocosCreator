
const {ccclass, property} = cc._decorator;
@ccclass
export default class Ball extends cc.Component {
  @property speed : number = 0;
  @property moveUp : number = 0;
  
  isMove : boolean;

  // @property(cc.Sprite)
  // ballSprite: cc.Sprite = null;

  // LIFE CYCLE CALLBACKS:
  onLoad () {
    this.isMove = true;
    this.speed = 50;
  }

  start () {
    // this.speed = 0;
  }

  public setSpeed(speed ) {
    this.speed = speed;
  }

  public MoveObj() {
    cc.log("MoveObj");
    this.isMove = true;
  }

  update(dt) {
    cc.log(this.isMove + " update : " + dt);
    if(this.isMove == false) {
        return;
    }
    cc.log("Ball update spped:" + this.speed);
    var y = this.node.y;
    // if (this.moveUp) {
      this.node.y = y + this.speed * dt;
    // } else {
    //   this.ballSprite.node.y = y - this.speed * dt;
    // }
    
  }

}