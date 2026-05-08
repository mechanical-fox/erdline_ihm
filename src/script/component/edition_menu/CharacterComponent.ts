import { Component, WritableSignal, signal, Signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Util } from '../../util/Util';
import { Storage } from '../../util/Storage';
import { Sprite } from '../../data/ihm/Sprite';
import { Character } from '../../data/ihm/Character';
import { Expression } from '../../data/ihm/Expression';

@Component({
    selector: 'Character',
    imports : [FormsModule],
    templateUrl: '../../../html/edition_menu/character.html',
    styleUrls: ['../../../css/edition_menu/character.css', '../../../css/others/viewList.css']
})
export class CharacterComponent {

    
    spritePreview : WritableSignal<string | null>;
    sprites : Sprite[];
    characterName: WritableSignal<string>;
    characters : WritableSignal<Character[]>;
    storage : Storage;
    counter : number;

    constructor(){

        this.sprites = CharacterComponent.listSprites();
        this.spritePreview = signal("images/default.png");
        this.characterName = signal("");

        if(Util.getVariable("characters") != null){
            
            this.characters = signal(Util.getVariable("characters"));
            this.storage = Util.getVariable("characters-storage");
            this.counter = Util.getVariable("characters-counter");
            this.flushAndSave();
        }
        else{
            this.characters = signal([]);
            this.storage = new Storage();
            this.counter = 1;
            this.addCharacter();
        }
 
    }


    /** Update the informations on screen, with the information matching the item currently selected. After this the function will 
     * save the state of the component. This allow to quit the tab, return to the tab, and don't lost data beetween this actions.*/
    flushAndSave(){

        let selected = this.storage.selected();

        if(selected != null)
            this.characterName.set(selected);

        Util.setVariable("characters", this.characters());
        Util.setVariable("characters-storage", this.storage);
        Util.setVariable("characters-counter", this.counter);
    }

    /** Add a new character, with a generic name like #1, #2... And if the number of actual character is 0, will select 
     * the new background.*/
    addCharacter(){
        let charactersValue = this.characters();
        let newName  = this.storage.add();
        let id = `character-${this.counter}`;

        let expr1 = new Expression("expr-1", 1, "", null);
        let expr2 = new Expression("expr-2", 2, "", null);
        let expr3 = new Expression("expr-3", 3, "", null);
        let newCharacter = new Character(id,newName,[expr1, expr2, expr3]); 
        charactersValue.push(newCharacter);
        this.characters.set(charactersValue);
        this.counter++;
        this.flushAndSave();
    }

    /** Select the character with the name indicated */
    selectCharacter(name : string){

        this.storage.select(name);
        this.flushAndSave();
        
    }

    /** Update the name of the current character.*/
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

    /** Update the name of an expression, for the current character.*/
    updateExpressionName(expression_id : string, event : any){
        let charactersValue = this.characters();

        for(let character of charactersValue){
            if(character.name == this.storage.selected() && event.target.value.trim().length > 0){

                for(let expression of character.expressions){
                    if(expression.id == expression_id){
                        expression.name =  event.target.value;
                        this.characters.set(charactersValue);
                    }
                }
            }
        }

        this.flushAndSave();
    }

    /** Update the sprite of an expression, for the current character.*/
    updateExpressionSprite(expression_id : string, event : any){
        let charactersValue = this.characters();

        for(let character of charactersValue){
            if(character.name == this.storage.selected() && event.target.value.trim().length > 0){

                for(let expression of character.expressions){
                    if(expression.id == expression_id){
                        let value = event.target.value == "empty" ? null : event.target.value;
                        expression.sprite_id =  value;
                        this.characters.set(charactersValue);
                    }
                }
            }
        }

        this.flushAndSave();
    }

    /** Delete the current character, and switch the character selected. If the user happen to delete all the characterss,
     * the character selected will be null.*/
    deleteCurrentCharacter(){

        let newCharactersValue : Character[] = [];

        for(let item of this.characters()){
            if(item.name != this.storage.selected())
                newCharactersValue.push(item);
        }

        this.storage.deleteSelected();
        this.characters.set(newCharactersValue);
        this.flushAndSave();
    }

    /** Change the preview of the sprite, by the sprite indicated. */
    updateSpritePreview(event : any){

        if(event.target.value == "empty")
            this.spritePreview.set("images/default.png");
        else{
            for(let sprite of this.sprites){
                if(sprite.id == event.target.value){
                    this.spritePreview.set(sprite.image);
                }
            }
        }
            
    }


    /** Returns a list of all the available sprites*/
    static listSprites() : Sprite[]{

        let spriteAdrien = new Sprite("sprite-adrien", "Adrien", "images/Adrien.png");
        let spriteGrace = new Sprite("sprite-grace", "Grace", "images/Grace.png");
        let sprites = [spriteAdrien, spriteGrace];

        return sprites;
    }

}