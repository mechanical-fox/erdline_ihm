
export class PartialSession{

    session: string;
    password : string;

    constructor(session :string, password : string){
        this.session = session;
        this.password = password;
    }
}