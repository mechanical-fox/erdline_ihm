import { Component, WritableSignal, signal, Signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Util} from '../util/Util';
import {Storage} from '../util/Storage';



@Component({
    selector: 'Character',
    imports : [FormsModule],
    templateUrl: '../../html/character.html',
    styleUrls: ['../../css/character.css', '../../css/viewList.css']
})
export class CharacterComponent {

    sprites : any[];
    characterName: WritableSignal<string>;
    spriteSelectedName : WritableSignal<string>;
    spriteSelectedImage : WritableSignal<string>;
    characters : WritableSignal<any>;
    storage : Storage;

    constructor(){

        this.sprites = this.listSprites();
        this.characterName = signal("");
        this.spriteSelectedName = signal("");
        this.spriteSelectedImage = signal("");

        if(Util.getVariable("characters") != null){
            this.characters = signal(Util.getVariable("characters"));
            this.storage = Util.getVariable("characters-storage");
            this.flushAndSave();
        }
        else{
            this.characters = signal([]);
            this.storage = new Storage();
            this.addCharacter();
        }
 
    }


    /** Update the informations on screen, with the information matching the item currently selected. After this the function will 
     * save the state of the component. This allow to quit the tab, return to the tab, and don't lost data beetween this actions.*/
    flushAndSave(){

        let selected = this.storage.selected();

        for(let character of this.characters()){
            if(character.name == selected && selected != null){
                this.characterName.set(selected);
                
                for(let sprite of this.sprites){
                    if(sprite.id == character["sprite-id"]){
                        this.spriteSelectedName.set(character.name);
                        this.spriteSelectedImage.set(sprite.image);
                    }
                }
            }
        }

        Util.setVariable("characters", this.characters());
        Util.setVariable("characters-storage", this.storage);
    }

    /** Add a new character, with a generic name like #1, #2... And if the number of actual character is 0, will select 
     * the new background.*/
    addCharacter(){
        let charactersValue = this.characters();
        let newName  = this.storage.add();

        charactersValue.push({
            "name" : newName,
            "expressions" : [
                {
                    "counter" : 1,
                    "name" : "",
                    "nullAvailable" : false,
                    "sprite-id" : "sprite-adrien"
                },
                {
                    "counter" : 2,
                    "name" : "",
                    "nullAvailable" : true,
                    "sprite-id" : null
                },
                {
                    "counter" : 3,
                    "name" : "",
                    "nullAvailable" : true,
                    "sprite-id" : null
                }
            ]
        });

        this.characters.set(charactersValue);
        this.flushAndSave();
    }

    /** Select the character with the name indicated */
    selectCharacter(name : string){

        this.storage.select(name);
        this.flushAndSave();
        
    }

    /** Update the name of the character, in the list of characters.*/
    updateCharacterName(event : any){
        let charactersValue = this.characters();

        for(let character of charactersValue){
            if(character.name == this.storage.selected() && event.target.value.trim().length > 0){
                character.name = event.target.value;
                this.characters.set(charactersValue);
                this.storage.updateSelected(event.target.value);
            }
        }

        this.flushAndSave();
    }

    /** Delete the current character, and switch the character selected. If the user happen to delete all the characterss,
     * the character selected will be null.*/
    deleteCurrentCharacter(){

        let newCharactersValue = [];

        for(let item of this.characters()){
            if(item.name != this.storage.selected())
                newCharactersValue.push(item);
        }

        this.storage.deleteSelected();
        this.characters.set(newCharactersValue);
        this.flushAndSave();
    }

    /** Change the color of the color preview, by the color with the color id given, if the target of the event 
     * indicate "checked".  */
    /*colorChange(id: string, event : any){

        let ind = -1;
        let backgroundsValue = this.backgrounds();

        for(let i in backgroundsValue){
            if(event.target.checked && backgroundsValue[i].name == this.storage.selected()){
                ind = parseInt(i);
                backgroundsValue[ind]["color-id"] = id;
                this.backgrounds.set(backgroundsValue);
                this.flushAndSave();
            }       
        }
    }*/

    /** Returns a list of all the available expressions*/
    listExpressions() : string[]{

        let expressions = ["Expression 1", "Expression 2"];

        return expressions;
    }

    /** Returns a list of all the available sprites*/
    listSprites() : any[]{

        let sprites = [
            {
                id: "sprite-adrien",
                image: "images/Adrien.png",
                defaultChecked : true
            },
            {
                id: "sprite-grace",
                image: "images/Grace.png",
                defaultChecked : false
            }
        ];

        return sprites;
    }

}