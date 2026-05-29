import {TestBed} from '@angular/core/testing';
import {BackgroundComponent} from '../../script/component/edition_menu/BackgroundComponent';
import {Helper} from './helper/Helper';
import { Provider } from '../../script/app/Provider';
import { Fetch_Options } from '../../script/data/util/Fetch_Options';
import { FetchMock } from './helper/FetchMock';
import { Util } from '../../script/util/Util';


describe('BackgroundComponent Tests',()=>{

    beforeEach(()=>{
        Util.deleteAllVariables();
        Provider.mockFetch((url : string, options : Fetch_Options)=>FetchMock.fetch(url,options));
    });

    test(`Par défaut, la couleur selectionnée est orange`, async()=>{
        
        TestBed.configureTestingModule({imports: [BackgroundComponent]}).compileComponents();
        const fixture = TestBed.createComponent(BackgroundComponent);
        fixture.autoDetectChanges();  
        const component : BackgroundComponent = fixture.componentInstance;

        await Helper.sleep(300);
        expect(component.gradient()).toBe("linear-gradient(180deg, rgb(240, 138, 22), rgb(231, 195, 36))");
    });


    test(`Si je selectionne la couleur bleue, la Preview se met à jour`, async()=>{
        
        TestBed.configureTestingModule({imports: [BackgroundComponent]}).compileComponents();
        const fixture = TestBed.createComponent(BackgroundComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;
        const component : BackgroundComponent = fixture.componentInstance;

        await Helper.sleep(300);
        let node : HTMLElement | null = compiled.querySelector("#color-3");

        if(node)
            node.click();
        await Helper.sleep(300);

        expect(component.gradient()).toBe("linear-gradient(180deg, rgb(21, 59, 226), rgb(44, 141, 206))");
    });


});