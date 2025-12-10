



import {TestBed} from '@angular/core/testing';
import {GenerationComponent} from '../../script/component/GenerationComponent';
import {Helper} from './helper/Helper';



describe('GenerationComponent Tests',()=>{


    test(`Si je charge l'exemple, alors je vois 5 endpoints`, async()=>{
        
        TestBed.configureTestingModule({imports: [GenerationComponent]}).compileComponents();
        const fixture = TestBed.createComponent(GenerationComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;

        await Helper.sleep(300);

        let nodeButtonExample : HTMLElement = compiled.querySelector("#button_example") as HTMLElement;
        nodeButtonExample?.click();
        await Helper.sleep(300);

        const items : NodeListOf<HTMLElement> = compiled.querySelectorAll(".container_center_line");
        expect(items.length).toBe(5);

    });


    test(`Si je charge l'exemple, alors je vois l'endpoint "/report/{id}" `, async()=>{
        
        TestBed.configureTestingModule({imports: [GenerationComponent]}).compileComponents();
        const fixture = TestBed.createComponent(GenerationComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;

        await Helper.sleep(300);

        let nodeButtonExample : HTMLElement = compiled.querySelector("#button_example") as HTMLElement;
        nodeButtonExample?.click();
        await Helper.sleep(300);
        
        const items : NodeListOf<HTMLElement> = compiled.querySelectorAll(".container_center_line");
        let urlFound : boolean = false;

        for(let item of items){
            if(item?.textContent.includes("/report/{id}"))
                urlFound = true;
        }

        expect(urlFound).toBe(true);

    });


    test(`Si je charge l'exemple et ouvre le 1er onglet, présence du status 400`, async()=>{
        
        TestBed.configureTestingModule({imports: [GenerationComponent]}).compileComponents();
        const fixture = TestBed.createComponent(GenerationComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;

        await Helper.sleep(300);

        let nodeButtonExample : HTMLElement = compiled.querySelector("#button_example") as HTMLElement;
        nodeButtonExample?.click();
        await Helper.sleep(300);

        let items = compiled.querySelectorAll(".div_clickable_tab") as NodeListOf<HTMLElement>;

        if(items.length > 0)
            items[0].click();

        let items2 = compiled.querySelectorAll(".status");
        let status_found : boolean = false;

        for(let item of items2){
            if(item?.textContent.trim() == "400")
                status_found = true
        }

        expect(status_found).toBe(true);

    });


    test(`Si je charge l'exemple et ouvre le 1er onglet, présence du body attendu`, async()=>{
        
        TestBed.configureTestingModule({imports: [GenerationComponent]}).compileComponents();
        const fixture = TestBed.createComponent(GenerationComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;

        await Helper.sleep(300);

        let nodeButtonExample : HTMLElement = compiled.querySelector("#button_example") as HTMLElement;
        nodeButtonExample?.click();
        await Helper.sleep(300);

        let items = compiled.querySelectorAll(".div_clickable_tab") as NodeListOf<HTMLElement>;

        if(items.length > 0)
            items[0].click();

        let tabText = compiled.querySelector(".tab_text");

        expect(tabText).toBeDefined();
        expect(tabText?.textContent).toBeDefined();
        expect(tabText?.textContent).toContain(`"2025-07-18T08:45:42.053Z"`);

    });


    test(`Si je charge l'exemple et ouvre le 1er onglet, présence du paramètre "environment (Path)"`, async()=>{
        
        TestBed.configureTestingModule({imports: [GenerationComponent]}).compileComponents();
        const fixture = TestBed.createComponent(GenerationComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;

        await Helper.sleep(300);

        let nodeButtonExample : HTMLElement = compiled.querySelector("#button_example") as HTMLElement;
        nodeButtonExample?.click();
        await Helper.sleep(300);

        let items = compiled.querySelectorAll(".div_clickable_tab") as NodeListOf<HTMLElement>;

        if(items.length > 0)
            items[0].click();

        let items2 = compiled.querySelectorAll(".text_gen2");
        let parameter_found : boolean = false;

        for(let item of items2){
            if(item?.textContent.trim() == "environment (Path)")
                parameter_found = true
        }

        expect(parameter_found).toBe(true);

    });


    // Creation d'un endpoint, et l'on vérifie juste nom url crée (Peu vérification - beaucoup coverage)

    



});