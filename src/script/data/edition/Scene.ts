
import { Message} from "./Message";


export class Scene{

    createdAt : number;
    counter : number;
    id : string;
    name : string;
    backgroundId : string;
    messages : Message[];

    constructor(counter : number, id : string, name : string, backgroundId : string){
        let now = new Date();
        this.createdAt = now.valueOf();
        this.counter = counter;
        this.id = id;
        this.name = name;
        this.backgroundId = backgroundId;
        this.messages = [];
    }

}