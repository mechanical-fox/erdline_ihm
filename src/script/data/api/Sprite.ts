

export class Sprite{
    id : number;
    name : string;
    filename :string;
    data : string;

    constructor(id: number, name : string, filename : string, data : string){
        this.id = id;
        this.name = name;
        this.filename = filename;
        this.data = data;
    }
}