
export class SessionResponse{

    id : number;
    session: string;
    password : string;
    isAdmin : boolean;
    json_backgrounds : string | null;
    json_characters : string | null;

    constructor(id: number, session :string, password : string, isAdmin : boolean, json_backgrounds : string | null, 
    json_characters : string | null){
        this.id = id;
        this.session = session;
        this.password = password;
        this.isAdmin = isAdmin;
        this.json_backgrounds = json_backgrounds;
        this.json_characters = json_characters;
    }
}