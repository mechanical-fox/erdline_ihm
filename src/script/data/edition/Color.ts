

export class Color{
    id: string;
    name : string;
    firstGradient : string;
    secondGradient : string;

    constructor(id : string, name : string, firstGradient : string, secondGradient : string){
        this.id = id;
        this.name = name;
        this.firstGradient = firstGradient;
        this.secondGradient = secondGradient;
    }
}