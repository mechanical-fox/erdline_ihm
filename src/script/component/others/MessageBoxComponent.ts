

import { Component, WritableSignal, signal, input, output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Util} from '../../util/Util';
import {Message} from '../../data/ihm/Message';
import {Scene} from '../../data/ihm/Scene';
import { Character } from '../../data/ihm/Character';

@Component({
    selector: 'MessageBox',
    imports : [FormsModule],
    templateUrl: '../../../html/others/messageBox.html',
    styleUrl: '../../../css/others/messageBox.css'
})
export class MessageBoxComponent {


    indMessageToEdit = input<number>(-1);
    fastLoad = input<boolean>(false);
    editedMessage = output<Message>();
    createdMessage = output<Message>();
    deletedMessage = output<undefined>();
    initialized : WritableSignal<boolean>;
    editingTransition : WritableSignal<boolean>;
    errorMessage : WritableSignal<string | null>;
    newMessageCharacter: WritableSignal<string>;
    newMessageExpression: WritableSignal<string>;
    newMessageText: WritableSignal<string>;
    newMessageNextScene : WritableSignal<string>;
    availableExpressions : WritableSignal<any[]>;
    availableNextScenes : WritableSignal<Scene[]>;
    characters : any[];

    constructor(){

        this.errorMessage = signal(null);
        this.initialized = signal(false);
        this.editingTransition = signal(false);
        this.characters = this.getCharacters();
        this.availableExpressions = signal([]);
        this.newMessageCharacter = signal("empty");
        this.newMessageExpression = signal("empty");
        this.newMessageText = signal("");
        this.newMessageNextScene = signal("empty");
        this.availableNextScenes = signal([]);
    }

    /** This method is used to initialize the composant after the constructor. All initialization can't be done in the constructor, 
     * because the input attributes aren't initialized by angular when the constructor is called.  */
    ngOnInit(){

        let scenes = Util.getVariable("scenes");
        let storage = Util.getVariable("scenes-storage");
        let valueAvailableNextScenes = [];
        let fastLoadExist = Util.getVariable("messageBox-characterId") != null &&  Util.getVariable("messageBox-characterId") != undefined;

        for(let scene of scenes){
            if(scene.name != storage.selected())
                valueAvailableNextScenes.push(scene);
        }

        this.availableNextScenes.set(valueAvailableNextScenes);

        if(this.indMessageToEdit() != -1 && !(this.fastLoad() && fastLoadExist)){

            for(let scene of scenes){
                if(scene.name == storage.selected()){
                    let messages = scene.messages;
                    let message = messages[this.indMessageToEdit()];

                    if(message.nextSceneId != null)
                        this.editingTransition.set(true);

                    this.updateAvailableExpressions(message.characterId);
                    this.newMessageCharacter.set(message.characterId);
                    this.newMessageExpression.set(message.expressionId);
                    this.newMessageText.set(message.text);

                    if(message.nextSceneId)
                        this.newMessageNextScene.set(message.nextSceneId);
                    else
                        this.newMessageNextScene.set("empty");
                }
            }
        }
        else if(this.fastLoad() && fastLoadExist){
            let characterId = Util.getVariable("messageBox-characterId");
            let expressionId = Util.getVariable("messageBox-expressionId");
            let text = Util.getVariable("messageBox-text");
            let nextScene = Util.getVariable("messageBox-nextScene");
            let nextSceneParsed = nextScene ? nextScene : "empty";
            let editingTransition = Util.getVariable("messageBox-editingTransition");
            this.updateAvailableExpressions(characterId);
            this.newMessageCharacter.set(characterId);
            this.newMessageExpression.set(expressionId);
            this.newMessageText.set(text);
            this.newMessageNextScene.set(nextSceneParsed);
            this.editingTransition.set(editingTransition);
        }

        Util.setVariable("messageBox-characterId", this.newMessageCharacter());
        Util.setVariable("messageBox-expressionId", this.newMessageExpression());
        Util.setVariable("messageBox-text", this.newMessageText());
        Util.setVariable("messageBox-nextScene", this.newMessageNextScene());
        Util.setVariable("messageBox-editingTransition", this.editingTransition());
        this.initialized.set(true);
    }

    /** Transmit to the parent component, the command to delete the message currently under edition. */
    deleteMessage(){
        this.deletedMessage.emit(undefined);
    }

    /** Add a new Message to the scene, or edit the current message. It depends, if the messageBox is used in edition mode, or
     * not.*/
    validateMessage(){
        
        let character = this.newMessageCharacter();
        let expression = this.newMessageExpression();
        let nextScene = this.newMessageNextScene();
        let text = this.newMessageText();

        if(character == "empty")
            this.errorMessage.set("Le champ Personnage est obligatoire");
        else if(character != "narration" && character != "transition" && expression == "empty")
            this.errorMessage.set("Le champ Expression est obligatoire");
        else if(character != "transition"  && text.trim() == "")
            this.errorMessage.set("Le champ Message est obligatoire");
        else if(character == "transition" && nextScene == "empty")
            this.errorMessage.set("Le champ Transition vers la scène est obligatoire");
        else{
            let convertedExpression = (character == "narration" || character == "transition") ? null : expression;
            let convertedTransition = (character != "transition" || nextScene == "empty") ? null : nextScene; 

            if(character == "transition")
                text = "";

            let message : Message = new Message(character, convertedExpression, text, convertedTransition);
            this.newMessageCharacter.set("empty");
            this.newMessageExpression.set("empty");
            this.newMessageText.set("");
            this.newMessageNextScene.set("empty");
            this.errorMessage.set(null);

            if(this.indMessageToEdit() == -1)
                this.createdMessage.emit(message);
            else
                this.editedMessage.emit(message);
        }
    }

    /** A function called when the character is changed. This function will update the list of available expressions, to match the 
     * expressions accessible to the new character. This function, will save the new value to be able to be fastLoaded too.*/
    characterChanged(event : any){
        Util.setVariable("messageBox-characterId", event.target.value);
        this.updateAvailableExpressions(event.target.value);
    }

    /** A function called when the expression is changed.  This function, will save the new value to be able to be fastLoaded.*/
    expressionChanged(event : any){
        Util.setVariable("messageBox-expressionId", event.target.value);
    }

    /** A function called when the expression is changed.  This function, will save the new value to be able to be fastLoaded.*/
    transitionChanged(event : any){
        Util.setVariable("messageBox-nextScene", event.target.value);
    }

    /**  A function called when the text is changed.  This function, will save the new value to be able to be fastLoaded. */
    textChanged(event: any){
        Util.setVariable("messageBox-text", event.target.value);
    }

    /** Update the list of available expressions, to be the expressions of the character with the Id given.
     * Will also reset the expression list.*/
    updateAvailableExpressions(characterId : string){

        this.newMessageExpression.set("empty");
        let found = false;

        for(let character of this.characters){
            
            if(character.id == characterId){
                let expressions = character.expressions;
                this.availableExpressions.set(expressions);
                found = true;
            }
        }

        if(found == false)
            this.availableExpressions.set([]);
    }


    /** Return the list of all the characters, and their expressions. If a character have an expression where the name is "",
     * or if the expression has no sprite, the expression isn't included. If a character has no expression, the character isn't
     * included. */
    getCharacters() : Character[]{
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
                if(expression.name.trim() != "" && expression.sprite_id != null)
                    added.expressions.push(expression);
            }

            if(added.expressions.length > 0 && added.name.trim() != "")
                result.push(added);
        }

        return result;
    }

}