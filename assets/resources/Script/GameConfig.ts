export enum GameState {
    None,
    MainMenuGame,
    InGame,
    EndGame
}

export enum BallDirection {
    LEFT_TOP,
    RIGHT_TOP,
    LEFT_BOTTOM,
    RIGHT_BOTTOM
}

export interface BallDelegate { 
    onReady();
    onMoving();
    onDie();
}