

export class GameMessage{
    
    characterName: string;
    expressionName : string | null;
    dataBase64: string | null;
    text : string;
    nextSceneId : string | null;

    constructor(characterName : string, expressionName : string | null, dataBase64: string | null, text  : string, nextSceneId : string | null){
        this.characterName = characterName;
        this.expressionName = expressionName;
        this.dataBase64 = dataBase64;
        this.text = text;
        this.nextSceneId = nextSceneId;
    }
}