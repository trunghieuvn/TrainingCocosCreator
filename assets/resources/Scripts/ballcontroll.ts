
    const {ccclass, property} = cc._decorator;
     @ccclass
     export default class BallControll extends cc.Component {
         public speed : number = 100;
         isMove : boolean = true;
         @property
         dir: number = 1;

         // LIFECYCLE CALLBACKS:
         onLoad () {
            cc.director.getCollisionManager().enabled = true;
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
            // cc.log("Ball update spped:" + this.speed);
            var y = this.node.y;
            this.node.y = y + this.speed * dt * this.dir;
            
        }
        // onCollisionEnter(other, self) {
        //     this.changeDir();
        //     this.count++;
        // }
    
        // onCollisionExit (other, self) {
        //     // cc.log("Ball onCollisionExit");
        // }
        // onCollisionStay (other, self) {
        //     // cc.log("Ball onCollisionStay");
        // }
        
        changeDir() {
            this.dir *= -1;
        }
        }

        
