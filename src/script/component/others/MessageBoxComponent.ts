

import { Component, WritableSignal, signal, input, output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Util} from '../../util/Util';
import {Message} from '../../data/ihm/Message';


@Component({
    selector: 'MessageBox',
    imports : [FormsModule],
    templateUrl: '../../../html/others/messageBox.html',
    styleUrl: '../../../css/others/messageBox.css'
})
export class MessageBoxComponent {

    indMessageToEdit = input<number>(-1);
    editedMessage = output<Message>();
    createdMessage = output<Message>();
    initialized : WritableSignal<boolean>;
    errorMessage : WritableSignal<string | null>;
    newMessageCharacter: WritableSignal<string>;
    newMessageExpression: WritableSignal<string>;
    newMessageText: WritableSignal<string>;
    availableExpressions : WritableSignal<any[]>;
    characters : any[];

    constructor(){

        this.errorMessage = signal(null);
        this.initialized = signal(false);
        this.characters = this.getCharacters();
        this.availableExpressions = signal([]);
        this.newMessageCharacter = signal("empty");
        this.newMessageExpression = signal("empty");
        this.newMessageText = signal("");
    }

    /** This method is used to initialize the composant after the constructor. All initialization can't be done in the constructor, 
     * because the input attributes aren't initialized by angular when the constructor is called.  */
    ngOnInit(){
        if(this.indMessageToEdit() != -1){
            let messages = Util.getVariable("scenes-messages");
            let message = messages[this.indMessageToEdit()];
            this.updateAvailableExpressions(message.characterId);
            this.newMessageCharacter = signal(message.characterId);
            this.newMessageExpression = signal(message.expressionId);
            this.newMessageText = signal(message.text);
        }

        this.initialized.set(true);
    }

    /** Add a new Message to the scene.*/
    validateMessage(){
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
            this.newMessageCharacter.set("empty");
            this.newMessageExpression.set("empty");
            this.newMessageText.set("");
            this.errorMessage.set(null);

            if(this.indMessageToEdit() == -1)
                this.createdMessage.emit(message);
            else
                this.editedMessage.emit(message);
        }
    }

    /** A function called when the character is changed. This function will update the list of available expressions, to match the 
     * expressions accessible to the new character. */
    characterChanged(event : any){

        this.updateAvailableExpressions(event.target.value);
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

}