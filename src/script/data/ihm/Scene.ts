
import { Message} from "./Message";


export class Scene{

    id : string;
    name : string;
    backgroundId : string;
    messages : Message[];

    constructor(id : string, name : string, backgroundId : string){
        this.id = id;
        this.name = name;
        this.backgroundId = backgroundId;
        this.messages = [];
    }

}