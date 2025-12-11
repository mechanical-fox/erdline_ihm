

export class Helper{


    /** This function allow to sleep the number of milliseconds specified. But the function must be called with await to
    * function correctly.*/
    static async sleep(duration_ms : number) : Promise<void>{
        return new Promise(resolve => setTimeout(resolve, duration_ms));
    }
    
}