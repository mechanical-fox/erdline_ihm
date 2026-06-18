import { GameSprite } from "./GameSprite";


export class GameFirstSprites{

    leftSprite : GameSprite | null;
    rightSprite : GameSprite | null;

    constructor(leftSprite : GameSprite | null, rightSprite : GameSprite | null){
        this.leftSprite = leftSprite;
        this.rightSprite = rightSprite;
    }
}