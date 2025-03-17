import {ApiResponse, NewsData, SourcesData} from '../app/Interfaces/interfaces';

/*global console, fetch */
class Loader {
    private baseLink: string;
    public options: Record<string, string>; 


    constructor(baseLink: string, options: Record<string, string>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: {
            endpoint: string;
            options?: Record<string, string>
        },
        callback = (data: any) => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Record<string, string>, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });
        console.log(url.slice(0, -1));
        return url.slice(0, -1);
    }

    private load(
        method: string, 
        endpoint: string, 
        callback: (data: any) => void, 
        options: Record<string, string> = {}
    ) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
