
    const {ccclass, property} = cc._decorator;
     @ccclass
     export default class BallControll extends cc.Component {
         public speed : number = 100;
         isMove : boolean = true;
         // LIFECYCLE CALLBACKS:
         onLoad () {
             // this.isMove = false;
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
         update (dt) {
        //  cc.log(this.isMove + " update : " + dt);
        //  if(this.isMove == false) {
        //      return;
        //  }
            cc.log("Ball update spped:" + this.speed);
            var y = this.node.y;
            this.node.y = y + this.speed * dt;
        }
        changeDir() {
        
        }
        }

        
