

export class AuthResponse{
    token : string;
    expireIn: number;
    authorizationType: string;
    isAdmin: boolean;

    constructor(token : string, expireIn : number, authorizationType : string, isAdmin : boolean){
        this.token = token;
        this.expireIn = expireIn;
        this.authorizationType = authorizationType;
        this.isAdmin = isAdmin;
    }
}