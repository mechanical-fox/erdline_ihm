


export class Message{

    characterId : string;
    expressionId : string | null;
    text : string;
    nextSceneId : string | null;

    constructor(characterId : string, expressionId : string | null, text: string, nextSceneId : string | null){
        this.characterId = characterId;
        this.expressionId = expressionId;
        this.text = text;
        this.nextSceneId = nextSceneId;
    }
}