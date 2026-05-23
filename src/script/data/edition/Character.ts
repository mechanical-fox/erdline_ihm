
import { Expression } from "./Expression";

export class Character{

    counter: number;
    id : string;
    name: string;
    expressions : Expression[];

    constructor(counter : number, id : string, name : string, expressions : Expression[]){
        this.counter = counter;
        this.id = id;
        this.name = name;
        this.expressions = expressions;
    }
}