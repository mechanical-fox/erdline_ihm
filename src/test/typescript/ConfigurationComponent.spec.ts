
import {TestBed} from '@angular/core/testing';
import {ConfigurationComponent} from '../../script/component/edition_menu/ConfigurationComponent';
import {Helper} from './helper/Helper';
import { Provider } from '../../script/app/Provider';
import { Fetch_Options } from '../../script/data/util/Fetch_Options';
import { FetchMock } from './helper/FetchMock';
import { Util } from '../../script/util/Util';


describe('ConfigurationComponent Tests',()=>{

    beforeEach(()=>{
        Util.deleteAllVariables();
        Provider.mockFetch((url : string, options : Fetch_Options)=>FetchMock.fetch(url,options));
    });


    test(`Je peux ajouter une couleur`, async()=>{
        
        TestBed.configureTestingModule({imports: [ConfigurationComponent]}).compileComponents();
        const fixture = TestBed.createComponent(ConfigurationComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;

        await Helper.sleep(300);
        Helper.input(compiled, "#color-4-name", "Vert");
        Helper.input(compiled, "#color-4-firstGradient", "#2cb304");
        Helper.input(compiled, "#color-4-secondGradient", "#3cf805");
        await Helper.sleep(300);
        Helper.click(compiled, "#configuration-save-button");
        await Helper.sleep(300);

        let bodySend : string | null = FetchMock.getLastBodySend();
        expect(bodySend).not.toBe(null);
        expect(bodySend).not.toBe(undefined);

        if(bodySend){
            let body = JSON.parse(bodySend);
            expect(FetchMock.getLastMethodCalled()).toBe("POST");
            expect(FetchMock.getLastUrlCalled()?.endsWith("/color")).toBe(true);
            expect(body.name).toBe("Vert");
            expect(body.firstGradient).toBe("#2cb304");
            expect(body.secondGradient).toBe("#3cf805");
        }

    });

    test(`Je peux modifier une couleur`, async()=>{
        
        TestBed.configureTestingModule({imports: [ConfigurationComponent]}).compileComponents();
        const fixture = TestBed.createComponent(ConfigurationComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;

        await Helper.sleep(300);
        Helper.input(compiled, "#color-3-name", "Vert");
        Helper.input(compiled, "#color-3-firstGradient", "#2cb304");
        Helper.input(compiled, "#color-3-secondGradient", "#3cf805");
        await Helper.sleep(300);
        Helper.click(compiled, "#configuration-save-button");
        await Helper.sleep(300);

        let bodySend : string | null = FetchMock.getLastBodySend();
        expect(bodySend).not.toBe(null);
        expect(bodySend).not.toBe(undefined);

        if(bodySend){
            let body = JSON.parse(bodySend);
            expect(FetchMock.getLastMethodCalled()).toBe("PUT");
            expect(FetchMock.getLastUrlCalled()?.endsWith("/color/3")).toBe(true);
            expect(body.name).toBe("Vert");
            expect(body.firstGradient).toBe("#2cb304");
            expect(body.secondGradient).toBe("#3cf805");
        }

    });

});