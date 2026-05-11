

export class Expression{
    id :string;
    counter : number;
    name : string; 
    sprite_id : string | null;
    

    constructor(id : string, counter : number, name : string, sprite_id : string | null){
        this.id = id;
        this.counter = counter;
        this.name = name;
        this.sprite_id = sprite_id;
    }
}