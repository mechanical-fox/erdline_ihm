
export class ValidityResponse{

    creationPossible : boolean;
    sessionAlreadyExisting : boolean;
    atLeastSixCharacters : boolean;
    includeLowercaseCharacters : boolean;
    includeUppercaseCharacters: boolean;
    includeDigits : boolean;

    constructor(creationPossible : boolean, sessionAlreadyExisting : boolean, atLeastSixCharacters : boolean,
    includeLowercaseCharacters : boolean, includeUppercaseCharacters: boolean, includeDigits : boolean){
        this.creationPossible = creationPossible;
        this.sessionAlreadyExisting = sessionAlreadyExisting;
        this.atLeastSixCharacters = atLeastSixCharacters;
        this.includeLowercaseCharacters = includeLowercaseCharacters;
        this.includeUppercaseCharacters = includeUppercaseCharacters;
        this.includeDigits = includeDigits;
    }

}
