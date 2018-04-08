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
        spriteList: {
            default : [],
            type : [cc.SpriteFrame]
        },
        gameScript : {
            default: null,
            serializable: false

        },
        audioCollect : {
            default: null,
            url: cc.AudioClip
        },
        audioBomb : {
            default: null,
            url: cc.AudioClip
        }
    },
    onLoad(){
        this.bom = false;
        var sprite = this.getComponent(cc.Sprite);
        var randomInt = Math.floor(Math.random() * this.spriteList.length)
        if(randomInt>=9){
            this.bom = true;
        }
        sprite.spriteFrame = this.spriteList[randomInt];
//      var moveTo = cc.moveTo(2, cc.p(0, 0));
        var moveTo = cc.moveTo(1.5, cc.p(320, -1000));
        this.node.runAction(moveTo);

    },
    getDistance : function(){
        // console.log(this.gameScript.recycleBin.node.getPosition());
        // console.log(this.node.position);
        // console.log(this.node.getPosition());
        var dist = cc.pDistance(this.gameScript.recycleBin.node.getPosition(),this.node.getPosition());
        console.log(dist);
        return dist;
    },
    update(dt) {
        if(this.getDistance()<50)
        {
            if(this.bom)
            {
                console.log("gameover")
                cc.audioEngine.playEffect(this.audioBomb,false);
                this.gameScript.recycleBin.node.stopAllActions();
                //this.gameScript.recycleBin.node.destroy();
                cc.director.loadScene('GameOver');
            }else
            {
                this.gameScript.score += 1;
                console.log(this.gameScript.score);
                this.gameScript.scoreLabel.string = "Score: "+this.gameScript.score;
                cc.audioEngine.playEffect(this.audioCollect, false);
                this.node.destroy();
            }
        }
    },
    start () {

    },

    // update (dt) {},
});
