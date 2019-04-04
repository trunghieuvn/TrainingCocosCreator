
export class PlayerData implements DataSocket{ 
    id : string;
    x : number;
    key : string;
    type : string;
    
    node : cc.Node;
}

export interface DataSocket {
    id : string;
    x : number;
    key : string;
    type : string;
}
export class WebSocketPack {
    key : string;
    data : PlayerData;
}

export const KEY_CONNECTED = 'connected';
export const KEY_READY = 'ready';
export const KEY_INGAME = 'ingame';