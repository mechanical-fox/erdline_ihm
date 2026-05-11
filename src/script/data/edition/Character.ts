
import { Expression } from "./Expression";

export class Character{
    id : string;
    name: string;
    expressions : Expression[];

    constructor(id : string, name : string, expressions : Expression[]){
        this.id = id;
        this.name = name;
        this.expressions = expressions;
    }
}