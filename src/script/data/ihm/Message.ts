


export class Message{

    characterId : string;
    expressionId : string | null;
    text : string;

    constructor(characterId : string, expressionId : string | null, text: string){
        this.characterId = characterId;
        this.expressionId = expressionId;
        this.text = text;
    }
}