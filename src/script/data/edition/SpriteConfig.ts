
import { WritableSignal, signal } from "@angular/core";
import { Sprite } from "../api/Sprite";

export class SpriteConfig{

    counter : number;
    databaseID : number | null;
    name : string;
    filename : WritableSignal<string>;
    data : string | null;

    constructor(sprite : Sprite, counter : number){
        this.counter = counter;
        this.databaseID = sprite.id
        this.name = sprite.name;
        this.filename = signal(sprite.filename);
        this.data = sprite.data;
    }
}