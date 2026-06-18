import { Color } from "../api/Color";


export class ColorIHM{

    databaseID: string;
    ihmID : string;
    name : string;
    firstGradient : string;
    secondGradient : string;

    constructor(color : Color){
        this.databaseID = color.id;
        this.ihmID = `color-${color.id}`;
        this.name = color.name;
        this.firstGradient = color.firstGradient;
        this.secondGradient = color.secondGradient;
    }
}