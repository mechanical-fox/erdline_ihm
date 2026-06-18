
export class Session{

    session: string;
    password : string;
    json_backgrounds : string | null;
    json_characters : string | null;
    json_scenes : string | null;

    constructor(session :string, password : string, json_backgrounds : string | null, json_characters : string | null, 
    json_scenes : string | null){
        this.session = session;
        this.password = password;
        this.json_backgrounds = json_backgrounds;
        this.json_characters = json_characters;
        this.json_scenes = json_scenes;
    }
}