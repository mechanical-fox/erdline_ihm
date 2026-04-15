
import { Component, WritableSignal, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Util} from '../util/Util';
import {Storage} from '../util/Storage';
import { Message } from '../data/ihm/Message';
import { EPosition } from '../data/ihm/EPosition';


@Component({
    selector: 'Scene',
    imports : [FormsModule],
    templateUrl: '../../html/scene.html',
    styleUrls: ['../../css/scene.css', '../../css/viewList.css']
})
export class SceneComponent {

    newMessageCharacter: WritableSignal<string>;
    newMessageExpression: WritableSignal<string>;
    newMessageText: WritableSignal<string>;
    sceneName: WritableSignal<string>;
    messages: WritableSignal<Message[]>;
    scenes : WritableSignal<any>;
    characters : any[];
    availableExpressions : WritableSignal<any[]>;
    storage : Storage;

    constructor(){

        this.characters = this.getCharacters();
        this.availableExpressions = signal([]);
        this.newMessageCharacter = signal("empty");
        this.newMessageExpression = signal("empty");
        this.newMessageText = signal("");
        this.sceneName = signal("");
        this.messages = signal([]);

        console.log(`characters: ${JSON.stringify(this.characters, null, 4)}`);

        if(Util.getVariable("scenes") != null){
            this.scenes = signal(Util.getVariable("scenes"));
            this.storage = Util.getVariable("scenes-storage");
            this.flushAndSave();
        }
        else{
            this.scenes = signal([]);
            this.storage = new Storage();
            this.addScene();
        }
 
    }


    /** Update the informations on screen, with the information matching the item currently selected. After this the function will 
     * save the state of the component. This allow to quit the tab, return to the tab, and don't lost data beetween this actions.*/
    flushAndSave(){

        let selected = this.storage.selected();

        if(selected != null)
            this.sceneName.set(selected);

        Util.setVariable("scenes", this.scenes());
        Util.setVariable("scenes-storage", this.storage);
    }

    /** Add a new scene, with a generic name like #1, #2... And if the number of actual scene is 0, will select 
     * the new scene.*/
    addScene(){
        let scenesValue = this.scenes();
        let newName  = this.storage.add();

        scenesValue.push({
            "name" : newName,
            "color-id" : "radio-orange"
        });

        this.scenes.set(scenesValue);
        this.flushAndSave();
    }

    /** Select the scene with the name indicated */
    selectScene(name : string){

        this.storage.select(name);
        this.flushAndSave();
        
    }

    /** Update the name of the current scene.*/
    updateSceneName(event : any){
        let scenesValue = this.scenes();

        for(let background of scenesValue){
            if(background.name == this.storage.selected() && event.target.value.trim().length > 0){
                background.name = event.target.value;
                this.scenes.set(scenesValue);
                this.storage.updateSelected(event.target.value);
            }
        }

        this.flushAndSave();
    }

    /** Delete the current scene, and switch the scene selected. If the user happen to delete all the scenes,
     * the scene selected will be null.*/
    deleteCurrentScene(){

        let newScenesValue = [];

        for(let item of this.scenes()){
            if(item.name != this.storage.selected())
                newScenesValue.push(item);
        }

        this.storage.deleteSelected();
        this.scenes.set(newScenesValue);
        this.flushAndSave();
    }

    /** Return the list of all the characters, and their expressions. If a character have an expression where the name is "",
     * or if the expression has no sprite, the expression isn't included. If a character has no expression, the character isn't
     * included. */
    getCharacters() : any[]{
        let characters = Util.getVariable("characters");
        let result = [];

        if(characters == null)
            return [];
        
        for(let character of characters){
            let added : any = {
                id : character.id,
                name : character.name,
                expressions : []
            };

            for(let expression of character.expressions){
                if(expression.name.trim() != "" && expression["sprite-id"] != null)
                    added.expressions.push(expression);
            }

            if(added.expressions.length > 0 && added.name.trim() != "")
                result.push(added);
        }

        return result;
    }

    /** Update the list of available expressions, for the current character + reset the expression list. This function is 
     * called, when the character used to write a new text, is changed.*/
    updateAvailableExpressions(event : any){

        this.newMessageExpression.set("empty");
        let found = false;

        for(let character of this.characters){
            
            console.log(`event.target.value: ${JSON.stringify(event.target.value)}, character.id : ${JSON.stringify(character.id)}`);
            console.log(`Egalité:  ${character.id == event.target.value}`);
            if(character.id == event.target.value){
                let expressions = character.expressions;
                this.availableExpressions.set(expressions);
                found = true;
            }
        }

        if(found == false)
            this.availableExpressions.set([]);
    }


    /** Add a new Message to the scene.*/
    addMessage(){
        let text = this.newMessageText();
        let character = this.newMessageCharacter();
        let expression = this.newMessageExpression();

        /** Character et expression selectionné sont fait par id. Donc ici, récupérer les valeurs non d'id, mais
         * la valeur texte correspondante.*/
    }

}