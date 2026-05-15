import { ColorIHM } from "./ColorIHM";


export class ColorConfig{

    counter : number;
    databaseID: string;
    name : string;
    firstGradient : string;
    secondGradient : string;

    constructor(color : ColorIHM, counter : number){
        this.counter = counter;
        this.databaseID = color.databaseID;
        this.name = color.name;
        this.firstGradient = color.firstGradient;
        this.secondGradient = color.secondGradient;
    }
}