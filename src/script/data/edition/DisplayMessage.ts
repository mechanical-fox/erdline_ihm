


export class DisplayMessage{

    position : number;
    style : string;
    characterName : string | null;
    expressionName : string | null;
    isTransition : boolean;
    text : string;

    constructor(position : number, style : string, characterName : string | null, expressionName : string | null, text: string,
        isTransition : boolean){
        this.position = position;
        this.style = style;
        this.characterName = characterName;
        this.expressionName = expressionName;
        this.isTransition = isTransition;
        this.text = text;
    }
}