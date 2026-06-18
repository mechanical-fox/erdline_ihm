
import { GameBackground } from "./GameBackground";
import { GameMessage } from "./GameMessage";
import { GameSprite } from "./GameSprite";

export class GameInformation{

    leftSprite : GameSprite | null;
    rightSprite : GameSprite | null;
    gameBackground : GameBackground | null;
    messages : GameMessage[];
    messageNumber : number;

    text : string;
    isUserMessage : boolean;
    isNarration : boolean;
    characterName : string | null;
    drawNameInLeft : boolean | null;
    

    constructor(leftSprite : GameSprite | null, rightSprite : GameSprite | null, gameBakcground : GameBackground | null, messages : GameMessage[],
    messageNumber : number, text : string, isUserMessage : boolean, isNarration : boolean, characterName : string | null, drawNameInLeft : boolean | null){

        this.leftSprite = leftSprite;
        this.rightSprite = rightSprite;
        this.gameBackground = gameBakcground;
        this.messages = messages;
        this.messageNumber = messageNumber;

        this.text = text;
        this.isUserMessage = isUserMessage;
        this.isNarration = isNarration;
        this.characterName = characterName;
        this.drawNameInLeft = drawNameInLeft;
    }

}