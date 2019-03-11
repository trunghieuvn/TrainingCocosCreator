

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // socket : WebSocket;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

        var self = this;

        var ws = new WebSocket("ws://192.168.1.64:8080");
        
        ws.onopen = function (event) {
            console.log("Send Text WS was opened.");
        };
        ws.onmessage = function (event) {
            console.log("response text msg: " + event.data);
            self.label.string = event.data;
        };
        ws.onerror = function (event) {
            console.log("Send Text fired an error");
        };
        ws.onclose = function (event) {
            console.log("WebSocket instance closed.");
        };
    }
    

    // update (dt) {}

    btnTestAPI() { 

    }
    btnTestSocket() {
        
    }
}
