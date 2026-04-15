import { EPosition } from "./EPosition";


export class Message{

    position : EPosition;
    character : string;
    emotion : string;
    text : string;

    constructor(position : EPosition, character : string, emotion : string, text: string){
        this.position = position;
        this.character = character;
        this.emotion = emotion;
        this.text = text;
    }
}