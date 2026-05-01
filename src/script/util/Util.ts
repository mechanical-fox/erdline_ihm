



export class Util {

    static memory : Map<String, any> = new Map<String, any>();

    /** Return the value of the variable asked, or null if not initialized */
    static getVariable(name: string) : any{
        return this.memory.get(name);
    }

    /** Set the value for the variable given */
    static setVariable(name: string, value : any) : void{
        this.memory.set(name, value);
    }

    /** Delete the value for the variable given */
    static deleteVariable(name: string) : void{
        if(this.memory.get(name))
            this.memory.delete(name);
    }

    /** This function allow to sleep the number of milliseconds specified. But the function must be called with await to
    * function correctly.*/
    static async sleep(duration_ms : number) : Promise<void>{
        return new Promise(resolve => setTimeout(resolve, duration_ms));
    }


}