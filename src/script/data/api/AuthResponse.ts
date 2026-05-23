

export class AuthResponse{
    token : string;
    expireIn: number;
    authorizationType: string;
    sessionId : number;
    isAdmin: boolean;

    constructor(token : string, expireIn : number, authorizationType : string, sessionId : number, isAdmin : boolean){
        this.token = token;
        this.expireIn = expireIn;
        this.authorizationType = authorizationType;
        this.sessionId = sessionId;
        this.isAdmin = isAdmin;
    }
}