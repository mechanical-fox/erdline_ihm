import {TestBed} from '@angular/core/testing';
import {NavComponent} from '../../script/component/global/NavComponent';
import {Helper} from './helper/Helper';
import { Provider } from '../../script/app/Provider';
import { Fetch_Options } from '../../script/data/util/Fetch_Options';
import { FetchMock } from './helper/FetchMock';
import { Util } from '../../script/util/Util';


describe('NavComponent Tests',()=>{

    beforeEach(()=>{
        Util.deleteAllVariables();
        Provider.mockFetch((url : string, options : Fetch_Options)=>FetchMock.fetch(url,options));
    });

    test(`Par défaut je vois la page d'accueil`, async()=>{
        
        TestBed.configureTestingModule({imports: [NavComponent]}).compileComponents();
        const fixture = TestBed.createComponent(NavComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;

        await Helper.sleep(300);
        let titles : NodeListOf<HTMLElement> = compiled.querySelectorAll(".background-title");
        let titlesParsed : HTMLElement[] = [];

        for(let title of titles)
            titlesParsed.push(title);

        expect(titlesParsed[0].textContent.trim()).toBe("Paramètres");
        expect(titlesParsed[1].textContent.trim()).toBe("Preview");
    
    });


    test(`Changement de page effectif si je clique sur l'item "A propos"`, async()=>{
        
        TestBed.configureTestingModule({imports: [NavComponent]}).compileComponents();
        const fixture = TestBed.createComponent(NavComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;

        await Helper.sleep(300);
        const items : NodeListOf<HTMLElement> = compiled.querySelectorAll(".item-desactivated");
        let found : boolean = false;

        for(let item of items){
            if(item?.textContent.trim() == "A propos"){
                item.click();
                await Helper.sleep(300);
                found = true;
            }
        }

        expect(found).toBe(true);
        let nodeFirstParagraph = compiled.querySelector("#about_paragraph");
        expect(nodeFirstParagraph).toBeDefined();

        if(nodeFirstParagraph)
            expect(nodeFirstParagraph.textContent).toContain("Page A Propos");
    
    });


});