


export class DisplayMessage{

    id : string;
    style : string;
    characterName : string | null;
    expressionName : string | null;
    text : string;

    constructor(id : string, style : string, characterName : string | null, expressionName : string | null, text: string){
        this.id = id;
        this.style = style;
        this.characterName = characterName;
        this.expressionName = expressionName;
        this.text = text;
    }
}