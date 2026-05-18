
import { Component, WritableSignal, signal} from '@angular/core';
import { ColorConfig } from '../../data/edition/ColorConfig';
import { BackgroundComponent } from './BackgroundComponent';
import { ColorIHM } from '../../data/edition/ColorIHM';
import { ColorBody } from '../../data/api/ColorBody';
import { API_Util } from '../../util/APIUtil';
import { Util } from '../../util/Util';
import { API_Response } from '../../data/util/API_Response';
import { Sprite } from '../../data/api/Sprite';
import { SpriteConfig } from '../../data/edition/SpriteConfig';
import { SpriteBody } from '../../data/api/SpriteBody';


@Component({
    selector: 'Configuration',
    templateUrl: '../../../html/edition_menu/configuration.html',
    styleUrl: '../../../css/edition_menu/configuration.css'
})
export class ConfigurationComponent {

    static MESSAGE_DURATION_MS = 6000;

    isLoaded : WritableSignal<boolean>;
    initialColors  : WritableSignal<ColorConfig[]>;
    internColors : ColorConfig[];
    modifiedColors : boolean[];
    initialSprites : WritableSignal<SpriteConfig[]>;
    internSprites : SpriteConfig[];
    modifiedSprites : boolean[];
    message : WritableSignal<string>;
    showMessage : WritableSignal<boolean>;
    isErrorMessage : WritableSignal<boolean>;

    constructor(){
        this.isLoaded = signal(false);
        this.initialColors = signal([]);
        this.internColors = [];
        this.modifiedColors = [];
        this.initialSprites = signal([]);
        this.internSprites = [];
        this.modifiedSprites = [];
        this.message = signal("");
        this.showMessage = Util.createTimer("showMessage", true);
        this.isErrorMessage = signal(false);
    }

    /** Initialiaze the colors in the configuration component, with a ColorIHM array. In the configuration component, some
     * "empty" colors are added, to let create colors. And a counter is added, to display in the graphic interface "Couleur 1",
     * "Couleur 2", ....*/
    initColors(colors : ColorIHM[]) : void{

        let parsedColors : ColorConfig[] = [];
        let i = 1;

        for(let color of colors){
            let parsedColor = new ColorConfig(color, i);
            i++;
            parsedColors.push(parsedColor);
        }

        while(i <= 4){
            let newColor : ColorConfig= {
                counter : i, 
                databaseID : null, 
                name : "", 
                firstGradient : "rgb(157,157,157)", 
                secondGradient : "rgb(157,157,157)"
            };
            i++;
            parsedColors.push(newColor); 
        }

        this.initialColors.set(parsedColors);
        let copy = JSON.parse(JSON.stringify(parsedColors));
        this.internColors = copy;
    }

    /** Initialiaze the sprites in the configuration component, with a Sprite array. In the configuration component, some
     * "empty" sprites are added, to let create sprites. And a counter is added, to display in the graphic interface "Sprite 1",
     * "Sprite 2", ....*/
    initSprites(sprites : Sprite[]) : void{

        let parsedSprites : SpriteConfig[] = [];
        let i = 1;

        for(let sprite of sprites){
            let parsedSprite = new SpriteConfig(sprite, i);
            i++;
            parsedSprites .push(parsedSprite);
        }

        while(i <= 4){
            let newSprite : SpriteConfig= {
                counter : i, 
                databaseID : null, 
                name : "", 
                filename : signal(" -- en attente --"), 
                data : null
            };
            let copy : SpriteConfig= {
                counter : i, 
                databaseID : null, 
                name : "", 
                filename : signal(" -- en attente --"), 
                data : null
            };
            i++;
            parsedSprites.push(newSprite); 
            this.internSprites.push(copy);
        }

        this.initialSprites.set(parsedSprites);
    }

    /** A lifecycle happening after the content has been initialized. Will initialize the colors to display, the sprites to display,
     * and the datas in intern. */
    async ngAfterContentInit(){

        let colors : ColorIHM[] = await BackgroundComponent.listColors();
        let sprites : Sprite[] = await ConfigurationComponent.listSprites();
        this.initColors(colors);
        this.initSprites(sprites);

        let i = 0, x = 0;

        while(i < this.initialColors.length){
            this.modifiedColors.push(false);
            i++;
        }

        while(x < this.initialSprites.length){
            this.modifiedSprites.push(false);
            x++;
        }
            
        this.isLoaded.set(true);
    }


    /** Change the attribute "firstGradient" about the color matching the counter in intern. Will be saved in the database, if the
     * user click on the button "Enregistrer". */
    firstColorChange(counter : number, event : any){

        for(let color of this.internColors){
            if(color.counter == counter)
                color.firstGradient = event.target.value;
        }

        this.modifiedColors[counter - 1] = true;
    }

    /** Change the attribute "secondGradient" about the color matching the counter in intern. Will be saved in the database, if the
     * user click on the button "Enregistrer". */
    secondColorChange(counter : number, event : any){

        for(let color of this.internColors){
            if(color.counter == counter)
                color.secondGradient = event.target.value;
        }

        this.modifiedColors[counter - 1] = true;
    }

    /** Change the attribute "name" about the color matching the counter in intern. Will be saved in the database, if the
     * user click on the button "Enregistrer". */
    nameColorChange(counter : number, event : any){

        for(let color of this.internColors){
            if(color.counter == counter)
                color.name = event.target.value;
        }

        this.modifiedColors[counter - 1] = true;
    }

    /** Change the attribute "name" about the sprite matching the counter in intern. Will be saved in the database, if the
     * user click on the button "Enregistrer". */
    nameSpriteChange(counter : number, event : any){

        this.internSprites[counter - 1].name = event.target.value;
        this.modifiedSprites[counter - 1] = true;
    }

    /** Change the attributes "filename" and data, about the sprite matching the counter in intern. Will be saved in the database, if the
    * user click on the button "Enregistrer". */
    async fileSpriteChange(counter : number, event : any){
        let sleepTime = 0;
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        while(reader.readyState != FileReader.DONE && sleepTime < 1000){
            await Util.sleep(200);
            sleepTime += 200;
        }

        let filename = event.target.files[0].name;
        let data =`${reader.result}`;

        let value = this.initialSprites();
        value[counter - 1].filename.set(filename);
        this.initialSprites.set(value);
        this.internSprites[counter - 1].filename.set(filename);
        this.internSprites[counter - 1].data = data;
        this.modifiedSprites[counter - 1] = true;
    }


    /** Check if the field filled by the users are correct or not. Return true, if the fields are correctly filled, and false
    * in the others case. Each time at least one field is incorrectly filled, this function will directly display a message to
    * the user.*/
    validate() : boolean{
        let emptyNameField : boolean = false;
        let emptyFileField : boolean = false;

        for(let color of this.internColors){
            
            if(color.databaseID != null && color.name.trim() == "")
                emptyNameField = true;
        }
        for(let sprite of this.internSprites){
            if(sprite.databaseID != null && sprite.name.trim() == "")
                emptyNameField = true;
            if(sprite.databaseID == null && sprite.data != null && sprite.name.trim() == ""){
                console.log("here 55");
                emptyNameField = true;
            }
            if(sprite.databaseID == null && sprite.data == null && sprite.name.trim() != ""){
                console.log("here 56");
                emptyFileField = true;
            }
        }

        if(emptyNameField){
            this.message.set("Le champ Nom est obligatoire");
            this.isErrorMessage.set(true);
            Util.startTimer("showMessage", ConfigurationComponent.MESSAGE_DURATION_MS);
            return false;
        }
        else if(emptyFileField){
            this.message.set("Choisir un Fichier est obligatoire");
            this.isErrorMessage.set(true);
            Util.startTimer("showMessage", ConfigurationComponent.MESSAGE_DURATION_MS);
            return false;
        }
        else
            return true;
    }

    /**Save the change performed by the client, by calling the API */
    async save(){

        let isValid = this.validate();
        
        if(isValid){
            for(let i = 0; i < this.internColors.length; i++){
                let color = this.internColors[i];

                if(this.modifiedColors[i]){
                    let body = new ColorBody(color.name, color.firstGradient, color.secondGradient);

                    if(color.databaseID != null)
                        API_Util.put(`/color/${color.databaseID}`, body);
                    else{
                        let response = await API_Util.post(`/color`, body);
                        this.internColors[i].databaseID = ConfigurationComponent.retriveIdFromLocation(response);
                    }
                    this.modifiedColors[i] = false;
                }
            }

            for(let i = 0; i < this.internSprites.length; i++){
                let sprite = this.internSprites[i];

                if(this.modifiedSprites[i] && sprite.data){
                    let body = new SpriteBody(sprite.name, sprite.filename(), sprite.data);

                    if(sprite.databaseID != null)
                        API_Util.put(`/sprite/${sprite.databaseID}`, body);
                    else{
                        let response = await API_Util.post(`/sprite`, body);
                        let idCreated = ConfigurationComponent.retriveIdFromLocation(response);

                        if(idCreated)
                            this.internSprites[i].databaseID = parseInt(idCreated);
                        
                    }
                    this.modifiedSprites[i] = false;
                }
            }

            this.message.set("Enregistré avec succès");
            this.isErrorMessage.set(false);
            Util.startTimer("showMessage", ConfigurationComponent.MESSAGE_DURATION_MS);
        }
    }

    /** When receving a response from the API, search for the header "Location", and return the id in this header if present. By example
    * if after a POST call the header Location has for value ".../color/4", this function will return "4". This functions returns null, 
    * when the id can't be retrieved.*/
    static retriveIdFromLocation(response : API_Response<unknown>) : string | null {

        if(response.hasFailed || !response.responseHeaders)
            return null;
        
        let location = response.responseHeaders.get("Location");

        if(location && location.includes("/")){
            let parts = location.split("/");
            let id = parts[parts.length - 1].trim();
            return id;
        }
        else
            return null;
                     
    }

    /** Returns a list of all the available sprites. The answer isn't cached, because the admin users can configure the sprites. And a admin can 
     * configure the sprites, and go to this page just after, to see if the change was taked into account... */
    static async listSprites() : Promise<Sprite[]>{

        let answer : API_Response<Sprite[]> = await API_Util.get<Sprite[]>("/sprite");

        if(!answer.hasFailed && answer.data)
            return answer.data;
        else
            return [];
        
    }

}