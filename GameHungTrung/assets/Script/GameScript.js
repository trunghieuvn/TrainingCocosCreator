// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        // canvas : {
        //     default: null,
        //     type: cc.Canvas
        // },
        recycleBin: {
            default: null,
            type: cc.Sprite
        },
        prefab :{
            default : null,
            type: cc.Prefab
        },
        scoreLabel: {
            default: null,
            type: cc.Label
        },
        time : 0,
        score: 0,
    },
    addSpawn : function(){
        var icon = cc.instantiate(this.prefab);
        icon.parent = this.node;
//        this.node.addChild(icon);
        icon.position = this.getRandomPosition();
        icon.getComponent("PrefabNode").gameScript = this;
        //icon.position = cc.p(0,480);
    },
    updatePosition : function(event){
        var pX = event.getDelta().x;
        if(this.recycleBin.node.x > 270)
        {
            this.recycleBin.node.x = 270;
        }
        else if(this.recycleBin.node.x < -270)
        {
            this.recycleBin.node.x = -270;
        }
        else{
            this.recycleBin.node.x +=  pX;        
        } 
        var ppX = this.recycleBin.node.x;  
    },
     onLoad () {
        this.addSpawn();
         this.node.on(cc.Node.EventType.MOUSE_MOVE, function (event) {
            this.updatePosition(event);          
        }, this);

     },
     timeSpawn : function(dt){
        this.time += dt;
        if(this.time > 2)
        {
            this.time = 0;
            this.addSpawn();
        }
     },
     update (dt){
        this.timeSpawn(dt);
     },
    start () {

    },

    //function
    getRandomPosition : function(){
       return cc.p(Math.floor(cc.randomMinus1To1()*270),480);
    }
});
