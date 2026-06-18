import fs from 'fs';
import {Fetch_Options} from '../../../script/data/util/Fetch_Options'
import {Fetch_Response} from '../../../script/data/util/Fetch_Response';
import Fetch_Response_Impl from './Fetch_Response_Impl';
import { PartialSession } from '../data/PartialSession';
import { AuthResponse } from '../data/AuthResponse';

export class FetchMock {

    private static mocks = JSON.parse(fs.readFileSync('src/test/resources/fetch_mock.json').toString());

    private static lastMethodCalled: string | null;
    private static lastUrlCalled: string | null;
    private static lastBodySend: string | null;
    private static allMethodsCalled: string[] = [];
    private static allUrlsCalled : string[] = [];
    private static allBodiesSend: (string | null)[] = [];


    /** Mock fetch during the tests */
    static async fetch(url: string, options: Fetch_Options): Promise<Fetch_Response> {

        FetchMock.lastMethodCalled = options.method;
        FetchMock.allMethodsCalled.push(options.method);
        FetchMock.lastUrlCalled = url;
        FetchMock.allUrlsCalled.push(url);

        if (options.body){
            FetchMock.lastBodySend = options.body;
            FetchMock.allBodiesSend.push(options.body)
        }
        else{
            FetchMock.lastBodySend = null;
            FetchMock.allBodiesSend.push(null);
        }
            

        if(url.endsWith("/auth") && options.method == "POST")
            return FetchMock.mock_authentification(options);
        else{
            for (const mock of FetchMock.mocks) {

                if (url.endsWith(mock.url) && mock.method == options.method) {
                    const answer = new Fetch_Response_Impl(mock.status, JSON.stringify(mock.data), {});
                    return answer;
                }
            }

            console.warn(`\nThere is no FetchMock for the method ${options.method} url ${url}`);
            throw new Error(`There is no FetchMock for the method ${options.method} url ${url}`);
        }
    }


    /** Return all the urls called */
    static getAllUrlsCalled(): string[] {
        return FetchMock.allUrlsCalled;
    }

    /** Return all the methods called */
    static getAllMethodsCalled(): string[]{
        return FetchMock.allMethodsCalled;
    }

    /** Return all the bodies send */
    static getAllBodiesSend(): (string | null)[] {
        return FetchMock.allBodiesSend;
    }

    /** Return the last url called */
    static getLastUrlCalled(): string | null {
        return FetchMock.lastUrlCalled;
    }

    /** Return the last method called */
    static getLastMethodCalled(): string | null {
        return FetchMock.lastMethodCalled;
    }

    /** Return the body given at the last url called */
    static getLastBodySend(): string | null {
        return FetchMock.lastBodySend;
    }


    /** A custom function is used to mock the authentification, because mocking some specific urls is not always easy.
    * A json file with the urls, wasn't enough here, because the unit tests will call the same url "/auth", but one 
    * time with a bad password. One time with a good password. And the answer must vary, by taking account the body. */
    private static mock_authentification(options : Fetch_Options) : Fetch_Response{

        if(!options.body)
            return new Fetch_Response_Impl(401, "", {});
        else{

            let session : PartialSession = JSON.parse(options.body);

            
            if(session.session == "MysticalAshes" && session.password == "sKyrIm-4678"){
                let response :AuthResponse = new AuthResponse( "1171660c4f41406d", 3600, "Bearer Authentification", 1, true);
                return new Fetch_Response_Impl(200, JSON.stringify(response), {});
            }
            else if(session.session == "Wolf" && session.password == "wolf"){
                let response :AuthResponse = new AuthResponse( "1171660c4f41406d", 3600, "Bearer Authentification", 2, true);
                return new Fetch_Response_Impl(200, JSON.stringify(response), {});
            }
            else
                return new Fetch_Response_Impl(401, "", {});
        }

    }



}
