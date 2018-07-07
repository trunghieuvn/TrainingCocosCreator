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
        animal : {
            default : [],
            type : cc.Prefab
        },
    },


    control : function(){
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan : function(touch,event){
                var touchBegan = true;
                self.touching = touchBegan;
                var pointx = touch.getLocation().x;
                self.locationx = pointx;
                return true;
            },
            onTouchEnded : function(touch,event){
                var f = false;
                self.touching = f; 
                return false;
            },
        },self.node);
    },

     onLoad () {
         this.control();
         cc.director.getCollisionManager().enabled = true;
     },
     onCollisionEnter(animal,self){
         cc.log("do something");
     },

    start () {
        var ani = this.getComponent(cc.Animation);
        ani.play();
    },

     update (dt) {
         if(this.right){
             this.node.x +=10;
             if(this.node.x > 1050){
                 this.right = false;
                 this.left = true;
             }
         }
         if(this.left){
            this.node.x -=10;
            if(this.node.x < 30){
                this.right = true;
                this.left = false;
            }
         }

         
     },
});
