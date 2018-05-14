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
        prefab: {
            default: null,
            type: cc.Prefab,
        },
        groud:{
            default: null,
            type: cc.Node
        },
        player:{
            default:null,
            type: cc.Node
        },
        circle:{
            default: null,
            type: cc.Prefab
        },
        scoreLabel:{
            default: null,
            type:cc.Label
        },
        highestScore:{
            default:null,
            type:cc.Label
        },
        screen:{
            default: null,
            type: cc.Node
        },
        jumpAudio:{
            default:null,
            url:cc.AudioClip
        },
        gameAudio:{
            default:null,
            type:cc.AudioSource
        },
        jumpDistance: 0,
        speed: 0,
        time:0,
        
        blockList:[],
        circleList:[]
        
    },

    onLoad(){
        //cc.audioEngine.play(this.gameAudio, false, 1);
        this.maxScore = 0;
        this.score = 0;
        this.listColor = ["#FD3E2F","#F7BC2A","#C7E62F","#7DFA51","#51FAB7","#51DBFA","#625EF7","#9F66F8","#BA5AF8","#E258F0","#EC4780"]
        this.currentColor = "#22FE7C"
        this.GroupX = 0;
        this.GroupY = 180;
        this.CurrentX = 0;
        this.CurrentY = 0;
        this.reset();
        this.positionIndex = 0
        let readyJump = false;
    },
    start () {
        this.current = cc.audioEngine.play(this.gameAudio, false, 1);
        cc.director.pause();
    },

    update (dt) {
        this.time += dt;
        if (this.readyJump){
            this.jumpDistance += this.speed * dt;
        }
        if(this.time>2){
            this.time = 0;
            this.spawnBlock();
        }

        for(let prefab of this.circleList){
            var distanceCircle = cc.pDistance(this.player.position,prefab.position)
            if(distanceCircle<30){
                prefab.destroy();
                this.score++;
                this.scoreLabel.string = "Score: "+this.score;
                break;
            }
        }
    },
    startGame() {  
        cc.director.resume()
        this.screen.active = false;
        this.scoreLabel.node.active = true
        this.gameAudio.play();
        let highest = cc.sys.localStorage.getItem("score")
        if (highest!="null")
        {
            this.highestScore.string = "Highest: 0";
        }else{
            this.highestScore.string = highest
        }
    },
    overGame(){
        this.gameAudio.play();
        cc.audioEngine.stop(this.gameAudio);
        cc.director.loadScene('gamePlay2');
        if(this.score>this.highestScore){
            console.log("đã save")
            this.highestScore.string="Highest: "+this.maxScore;
            cc.sys.localStorage.setItem("score",this.highestScore);
        }
    },
    exitGame(){
        cc.game.end();
    },
    reset(){
        
        let block = cc.instantiate(this.prefab);
        block.parent = this.groud;
        let ps = 0;
        block.position = new cc.v2(this.player.x,this.player.y-12);
        var color = this.listColor[Math.floor(cc.random0To1()*(this.listColor.length-1))];
        block.color = cc.hexToColor(color)
        this.player._children[0].color = cc.hexToColor(color)
        let isJump = false;
        this.node.on(cc.Node.EventType.TOUCH_START,()=>{
            this.readyJump = true;
            let action = cc.scaleTo(1,1,0.5)
            this.player.runAction(action)
        },this)
        this.node.on(cc.Node.EventType.TOUCH_END,()=>{
                this.readyJump = false;
                
                if(!isJump){
                    cc.audioEngine.playEffect(this.jumpAudio, false);
                    this.player.stopAllActions();
                    let action = cc.scaleTo(0.4,1,1);
                    isJump = true;
                    let actionJump = cc.jumpTo(0.5,cc.v2(this.player.x+this.jumpDistance,
                        this.blockList[0]["prefab"].y + 14),200,1)
                    let finish = cc.callFunc(()=>{
                        let checkvalue = this.player.x;
                        var prefab = this.blockList[0]["prefab"];
                        var lastPS = this.blockList[0]["start"];
                        
                        if(checkvalue > prefab.x-prefab.width/2 && checkvalue < prefab.x + prefab.width/2){
                            prefab.stopAllActions();
                            isJump = false;
                            this.player._children[0].color = cc.hexToColor(this.currentColor)
                            this.blockList.splice(0, 1);
                            this.score++;
                            this.scoreLabel.string = "Score: "+this.score;
                        }
                        else{
                            
                            let actionFall = cc.jumpTo(0.3,cc.v2(this.player.x+50,this.player.y-550),20,1)
                            this.player.runAction(cc.sequence(actionFall,cc.callFunc(()=>{
                                this.overGame()
                                isJump = false;
                            })))
                        }
                    
                    })
                    this.player.runAction(action)
                    this.player.runAction(cc.sequence(actionJump,finish))
                }
                this.jumpDistance = 150;
            
            },this)
            this.spawnBlock();

    },

    spawnBlock: function(){
        this.spwanCircle()

        let block = cc.instantiate(this.prefab);
        block.parent = this.groud;
   
        var color = this.listColor[Math.floor(cc.random0To1()*(this.listColor.length-1))];
        this.currentColor = color
        block.color = cc.hexToColor(color)
        let rdx = cc.random0To1()*150+100;
        let rdy = (cc.random0To1()*150) + 30 ;

        if(this.blockList.length>0){
            block.position = new cc.v2(this.blockList[this.blockList.length-1]["prefab"].x+rdx, - (this.CurrentY+rdy));
        }
        else
        {
            block.position = new cc.v2(this.CurrentX+rdx, - (this.CurrentY+rdy));          
        }
        let action = cc.moveTo(7,cc.v2(700 + block.x,-(this.CurrentY+rdy)),this)
        block.runAction(action);

        var pre = {}
        pre["prefab"] = block;
        pre["start"] = this.CurrentX;
        pre["type"]= 1;
        this.blockList.push(pre)

        this.GroupX = Math.abs(block.x - this.CurrentX) - 100
        this.CurrentX += (this.GroupX) 
        this.CurrentY += this.GroupY

        this.groud.runAction(cc.moveBy(3, -this.GroupX,this.GroupY))

        if (this.blockList.length>3)
        {
            this.blockList.splice(0, 1);
       }

    },
    spwanCircle: function(){
      
        let circle = cc.instantiate(this.circle);
        let x = cc.random0To1()*200 + this.player.x + 50;
        let y = - cc.random0To1()*this.GroupY + this.player.y + 50;
        this.cir
        circle.position = cc.v2(x,y);
        circle.parent = this.groud;
        this.circleList.push(circle)
        if (this.circleList.length>3)
        {
            this.circleList.splice(0, 1);
       }
 
    },

    getRandomeBlock(){
        return cc.randomMinus1To1()*(this.positionIndex+50)+40;
    }

});
