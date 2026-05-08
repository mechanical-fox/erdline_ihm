

export class GameMessage{
    spriteFilename: string | null;
    characterName: string;
    text : string;
    nextSceneId : string | null;

    constructor(spriteFilename : string | null, characterName : string, text  : string, nextSceneId : string | null){
        this.spriteFilename = spriteFilename;
        this.characterName = characterName;
        this.text = text;
        this.nextSceneId = nextSceneId;
    }
}