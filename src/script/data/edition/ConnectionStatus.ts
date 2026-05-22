

export class ConnectionStatus{

    sessionName: string;
    isAdmin : boolean;

    constructor(sessionName : string, isAdmin : boolean){
        this.sessionName = sessionName;
        this.isAdmin = isAdmin;
    }
}