

export class Helper{

    /** Return an array of all the nodes matching this selector  */
    static queryAll(compiled : HTMLElement, selector : string) : HTMLElement[]{
        let rawNodes : NodeListOf<HTMLElement> = compiled.querySelectorAll("#color-3");
        let nodes : HTMLElement[] = [];

        for(let node of rawNodes)
            nodes.push(node);

        return nodes;
    }

    /** This function allow to sleep the number of milliseconds specified. But the function must be called with await to
    * function correctly.*/
    static async sleep(duration_ms : number) : Promise<void>{
        return new Promise(resolve => setTimeout(resolve, duration_ms));
    }

    /** If an html element with the selector given exist, this function will click on it. 
     * Else, nothing will happen.*/
    static click(compiled : HTMLElement, selector : string){
        let node : HTMLSelectElement | null = compiled.querySelector(selector);

        if(node)
            node.click();
        else
            console.log(`\nHelper.click: The node "${selector}" doesn't exist\n`);
    }

    /** If an input element with the selector given exist, this function will filled the input will the value given.
     * No pause is performed.*/
    static input(compiled : HTMLElement, selector : string, text : string){
        let node : HTMLSelectElement | null = compiled.querySelector(selector);

        if(node){
            node.value = text;
            node.dispatchEvent(new Event('input'));
            node.dispatchEvent(new Event('change'));
        }
        else
            console.log(`\nHelper.input: The node "${selector}" doesn't exist\n`);
    }

    /** If a select element with the selector given exist, this function will change the value of this element. The parameter
     * value given, must reflect the value of a balise "option" that exist.*/
    static select(compiled : HTMLElement, selector : string, value : string){
        let node : HTMLSelectElement | null = compiled.querySelector(selector);

        if(node){
            node.value = value;
            node.dispatchEvent(new Event('change'));
        }
        else
            console.log(`\nHelper.input: The node "${selector}" doesn't exist\n`);
    }
    
}