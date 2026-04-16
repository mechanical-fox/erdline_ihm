
import { Component, WritableSignal, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Util} from '../util/Util';
import {Storage} from '../util/Storage';
import { Message } from '../data/ihm/Message';
import { DisplayMessage } from '../data/ihm/DisplayMessage';
import { EPosition } from '../data/ihm/EPosition';


@Component({
    selector: 'Scene',
    imports : [FormsModule],
    templateUrl: '../../html/scene.html',
    styleUrls: ['../../css/scene.css', '../../css/viewList.css']
})
export class SceneComponent {

    counter : number;
    errorMessage : WritableSignal<string | null>;
    newMessageCharacter: WritableSignal<string>;
    newMessageExpression: WritableSignal<string>;
    newMessageText: WritableSignal<string>;
    sceneName: WritableSignal<string>;
    messages: WritableSignal<Message[]>;
    messagesIHM : WritableSignal<DisplayMessage[]>;
    scenes : WritableSignal<any>;
    characters : any[];
    availableExpressions : WritableSignal<any[]>;
    storage : Storage;

    constructor(){

        this.errorMessage = signal(null);
        this.characters = this.getCharacters();
        this.availableExpressions = signal([]);
        this.newMessageCharacter = signal("empty");
        this.newMessageExpression = signal("empty");
        this.newMessageText = signal("");
        this.sceneName = signal("");

        if(Util.getVariable("scenes") != null){
            this.scenes = signal(Util.getVariable("scenes"));
            this.storage = Util.getVariable("scenes-storage");
            this.counter = Util.getVariable("scenes-counter");
            this.messages = signal(Util.getVariable("scenes-messages"));
            this.messagesIHM = signal(Util.getVariable("scenes-messagesIHM"));
            this.flushAndSave();
        }
        else{
            this.scenes = signal([]);
            this.storage = new Storage();
            this.counter = 1;
            this.messages = signal([]);
            this.messagesIHM = signal([]);
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
        Util.setVariable("scenes-counter", this.counter);
        Util.setVariable("scenes-messages", this.messages());
        Util.setVariable("scenes-messagesIHM", this.messagesIHM());
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

        if(character == "empty")
            this.errorMessage.set("Le champ Personnage est obligatoire");
        else if(character != "narration" && expression == "empty")
            this.errorMessage.set("Le champ Expression est obligatoire");
        else if(text.trim() == "")
            this.errorMessage.set("Le champ Message est obligatoire");
        else{
            let convertedExpression = character == "narration" ? null : expression;
            let message : Message = new Message(character, convertedExpression, text);
            let valueMessage = this.messages();
            valueMessage.push(message);
            this.messages.set(valueMessage);
            this.messagesIHM.set(this.convertMessage(this.messages()));
            this.flushAndSave();
        }
    }

    /** Convert a list of Message, in a list of DisplayMessage. Will convert the identifiers of the character, in the actual
     * names characters by example. It's necessary to retain the identifier of each character, because the name of the character
     * could be changed. And it must be managed in a non-connected way. Because a client has no obligation to be connected to
     * a session, to use the website. */
    convertMessage(messages : Message[]) : DisplayMessage[]{
        let displayMessages : DisplayMessage[] = [];
        let messageLeft : boolean = true;

        for(let message of messages){

            let character : string | null = null;
            let expression : string | null = null

            if(message.characterId != "narration"){
                for(let c of this.characters){
                    if(message.characterId == c.id){
                        for(let e of c.expressions){
                            if(message.expressionId == e.id){
                                character = c.name;
                                expression = e.name; 
                            }
                        }
                    }
                }
            }

            let id = `message-${this.counter}`;
            this.counter++;
            let style = messageLeft ? "scene-message-background-left" : "scene-message-background-right";
            messageLeft = !messageLeft;
            let displayMessage = new DisplayMessage(id, style, character, expression, message.text);
            displayMessages.push(displayMessage);
            this.newMessageCharacter.set("empty");
            this.newMessageExpression.set("empty");
            this.newMessageText.set("");
            this.errorMessage.set(null);
        }

        return displayMessages;
    }

}