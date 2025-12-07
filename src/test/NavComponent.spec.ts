
import {TestBed} from '@angular/core/testing';
import {NavComponent} from '../script/component/NavComponent';
import {Helper} from './Helper';


describe('NavComponent Tests',()=>{


    it(`Par défaut je vois la page d'accueil`, async()=>{
        
        TestBed.configureTestingModule({imports: [NavComponent]}).compileComponents();
        const fixture = TestBed.createComponent(NavComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;

        await Helper.sleep(300);
        expect(compiled.querySelector("#first_paragraph")?.textContent).toContain("Erdline est un site vitrine, qui");
    
    });
    

});