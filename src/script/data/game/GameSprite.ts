
export class GameSprite{

    character : string;
    expression :string;
    htmlElement : HTMLVideoElement | null;

    constructor(character : string, expression : string, htmlElement : HTMLVideoElement | null){
        this.character = character;
        this.expression = expression;
        this.htmlElement = htmlElement;
    }
}