


export class DisplayMessage{

    position : number;
    style : string;
    characterName : string | null;
    expressionName : string | null;
    text : string;

    constructor(position : number, style : string, characterName : string | null, expressionName : string | null, text: string){
        this.position = position;
        this.style = style;
        this.characterName = characterName;
        this.expressionName = expressionName;
        this.text = text;
    }
}