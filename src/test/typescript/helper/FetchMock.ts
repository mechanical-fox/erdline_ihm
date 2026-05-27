import fs from 'fs';
import {Fetch_Options} from '../../../script/data/util/Fetch_Options'
import {Fetch_Response} from '../../../script/data/util/Fetch_Response';
import Fetch_Response_Impl from './Fetch_Response_Impl';

export class FetchMock {

    private static mocks = JSON.parse(fs.readFileSync('src/test/resources/fetch_mock.json').toString());

    private static lastMethodCalled: string | null;
    private static lastUrlCalled: string | null;
    private static lastBodySend: string | null;

    /** Mock fetch during the tests */
    static async fetch(url: string, options: Fetch_Options): Promise<Fetch_Response> {

        FetchMock.lastMethodCalled = options.method;
        FetchMock.lastUrlCalled = url;

        if (options.body) 
            FetchMock.lastBodySend = options.body;
        else 
            FetchMock.lastBodySend = null;

        for (const mock of FetchMock.mocks) {

            if (url.endsWith(mock.url) && mock.method == options.method) {
                const answer = new Fetch_Response_Impl(mock.status, JSON.stringify(mock.data), {});
                return answer;
            }
        }

        console.warn(`\n\nThere is no FetchMock for the method ${options.method} url ${url}\n\n`);
        throw new Error(`There is no FetchMock for the method ${options.method} url ${url}`);
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



}
