
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
    cc.director.getCollisionManager().enabled = true;
  }

  start () {
    // this.speed = 0;
  }

  name : null;
  setName(name) {
    this.name = name;
  }

  public setSpeed(speed) {
    this.speed = speed;
  }

  public MoveObj() {
    cc.log("MoveObj");
    this.isMove = true;
  }

  addCollistionCallback(collistionCallback) {
    this.collistionCallback = collistionCallback;
  }

  collistionCallback = null;

  onCollisionEnter(nodeOther, nodeSelf) {
    if (this.handledBallCollision) {
      this.handledBallCollision = false;
      return;
    }
    cc.log("Ball onCollisionEnter " + this.name);
    this.setSpeed(this.speed * -1);

    var ballOther = nodeOther.node.getComponent(Ball);
    ballOther.onCollisionOther(this);
    // nodeOther.setSpeed(this.speed * -1);
    this.collistionCallback(this);
  }

  handledBallCollision = false;
  onCollisionOther(ballOther) {
    this.handledBallCollision = true;
    ballOther.setSpeed(ballOther.speed * -1);
  }


  update(dt) {
    // cc.log(this.isMove + " update : " + dt);
    if (this.isMove == false) {
        return;
    }
    // cc.log("Ball update spped:" + this.speed);
    var y = this.node.y;
    // if (this.moveUp) {
      this.node.y = y + this.speed * dt;
    // } else {
    //   this.ballSprite.node.y = y - this.speed * dt;
    // }
    
  }

}