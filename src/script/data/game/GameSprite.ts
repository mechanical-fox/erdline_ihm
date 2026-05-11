
export class GameSprite{

    character : string;
    source : string;
    data : HTMLVideoElement | null;

    constructor(character : string, source : string, data : HTMLVideoElement | null){
        this.character = character;
        this.source = source;
        this.data = data;
    }
}