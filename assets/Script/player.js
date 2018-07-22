// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        left : false,
        right : true,
        
    },


    

     onLoad () {
         cc.director.getCollisionManager().enabled = true;
     },
     onCollisionEnter(){
         cc.log("do something");
     },

    start () {
        var ani = this.getComponent(cc.Animation);
        ani.play();
    },

     update (dt) {
         if(this.right){
             this.node.x +=15;
             if(this.node.x > 1050){
                 this.right = false;
                 this.left = true;
             }
         }
         if(this.left){
            this.node.x -=15;
            if(this.node.x < 30){
                this.right = true;
                this.left = false;
            }
         }

         
     },
});
