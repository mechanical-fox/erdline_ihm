

export class Example{

    json_backgrounds : string | null;
    json_characters : string | null;
    json_scenes : string | null;

    constructor(json_backgrounds : string | null, json_characters : string | null, json_scenes : string | null){
        this.json_backgrounds = json_backgrounds;
        this.json_characters = json_characters;
        this.json_scenes = json_scenes;
    }

}