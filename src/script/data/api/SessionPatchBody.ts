
export class SessionPatchBody{

    json_backgrounds : string | null;
    json_characters : string | null;

    constructor(json_backgrounds : string | null, json_characters : string | null){
        this.json_backgrounds = json_backgrounds;
        this.json_characters = json_characters;
    }
}