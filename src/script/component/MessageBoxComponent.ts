

import { Component, WritableSignal, signal, output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Util} from '../util/Util';
import {Message} from '../data/ihm/Message';


@Component({
    selector: 'MessageBox',
    imports : [FormsModule],
    templateUrl: '../../html/messageBox.html',
    styleUrl: '../../css/messageBox.css'
})
export class MessageBoxComponent {

    createdMessage = output<Message>();
    errorMessage : WritableSignal<string | null>;
    newMessageCharacter: WritableSignal<string>;
    newMessageExpression: WritableSignal<string>;
    newMessageText: WritableSignal<string>;
    availableExpressions : WritableSignal<any[]>;
    characters : any[];

    constructor(){
        this.errorMessage = signal(null);
        this.availableExpressions = signal([]);
        this.newMessageCharacter = signal("empty");
        this.newMessageExpression = signal("empty");
        this.newMessageText = signal("");
        this.characters = this.getCharacters();
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
            this.createdMessage.emit(message);
            this.newMessageCharacter.set("empty");
            this.newMessageExpression.set("empty");
            this.newMessageText.set("");
            this.errorMessage.set(null);
        }
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