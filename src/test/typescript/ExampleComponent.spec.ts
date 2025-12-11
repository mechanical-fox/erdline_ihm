

import {TestBed} from '@angular/core/testing';
import {ExampleComponent} from '../../script/component/ExampleComponent';
import {Helper} from './helper/Helper';
import {FetchMock} from './helper/FetchMock';
import {Provider} from '../../script/app/Provider';
import Fetch_Options from '../../script/data/util/Fetch_Options';



describe('ExampleComponent Tests',()=>{

    beforeAll(()=>{
        Provider.mockFetch((url : string, options : Fetch_Options)=>FetchMock.fetch(url,options));
    });


    test(`Par défaut je vois les exemples "API FlopBox" et "API Supervision"`, async()=>{
        
        TestBed.configureTestingModule({imports: [ExampleComponent]}).compileComponents();
        const fixture = TestBed.createComponent(ExampleComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;

        await Helper.sleep(300);
        const items : NodeListOf<HTMLElement> = compiled.querySelectorAll(".example_item");

        let found_api_flopbox : boolean = false;
        let found_api_supervision : boolean = false;

        for(let item of items){
            if(item?.textContent.trim() == "API FlopBox")
                found_api_flopbox = true;
            if(item?.textContent.trim() == "API Supervision")
                found_api_supervision = true;
        }

        expect(items.length).toBe(2);
        expect(found_api_flopbox).toBe(true);
        expect(found_api_supervision).toBe(true);
    });



});