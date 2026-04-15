import {Fetch_Options} from '../data/util/Fetch_Options';
import {Fetch_Response} from '../data/util/Fetch_Response';


/**
 *  This class provide some functions.
 *  Particulary it will be provide functions than must be mocked during the tests.
 *
 *  And this class allow to replace the functions provided by a mock during the tests.
 */
export class Provider {
    

    private static mockForFetch: ((url: string, options: Fetch_Options) => Promise<Fetch_Response>) | null = null;

    /** Perform the function fetch, like performed in the browser, or use a mock if a mock was declared.*/
    static fetch(url: string, options: Fetch_Options): Promise<Fetch_Response> {

        if (this.mockForFetch == null) 
            return fetch(url, options);

        return this.mockForFetch(url, options);
    }

    /** Replace the use of fetch, by the mock given */
    static mockFetch(mock: (url: string, options: Fetch_Options) => Promise<Fetch_Response>): void {
        this.mockForFetch = mock;
    }

}