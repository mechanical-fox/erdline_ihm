
import {TestBed} from '@angular/core/testing';
import {EndpointCreationComponent} from '../../script/component/EndpointCreationComponent';
import {Helper} from './helper/Helper';
import {MessageUtil} from '../../script/util/MessageUtil';
import { Provider } from '../../script/app/Provider';
import Fetch_Options from '../../script/data/util/Fetch_Options';
import { FetchMock } from './helper/FetchMock';
import API_Response from '../../script/data/util/API_Response';
import APIUtil from '../../script/util/APIUtil';

let errors : string[] = [];

describe('EndpointCreationComponent Tests',()=>{

    beforeAll(()=>{
        Provider.mockFetch((url : string, options : Fetch_Options)=>FetchMock.fetch(url,options));
    });

    test(`Pour l'url /error, il est retourné hasFailed = true et status = 500`, async()=>{
        
        let answer : API_Response<unknown> = await APIUtil.get<unknown>("/error");
        expect(answer.hasFailed).toBe(true);
        expect(answer.status).toBe(500);
    
    });

});