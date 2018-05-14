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
        star: {
            default: null,
            type:cc.Prefab
        },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.time = 0;
    },

    start () {

    },
    fly(vec2){
        let st = cc.instantiate(this.star)
        st.parent = this.node;
        st.position = vec2//vec2;
        console.log("sssssssssssss")
        let action = cc.jumpTo(1,cc.v2(vec2.x-200,vec2.y-1000),20,1)

        st.runAction(cc.sequence(action,cc.callFunc(()=>{
            console.log("sssssssssssss")
            //st.destroy()
        })));
    },
    update (dt) {
        this.time += dt;
        if(this.time > 1.5)
        {
            this.time = 0
            let px = cc.random0To1()*700
            this.fly(cc.v2(px,500))
        }
    },
});
