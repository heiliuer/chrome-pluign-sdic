import Chrome from 'chrome';

declare module '*.svg' {
    const content: any;
    export default content;
}

declare module '*.css' {
    const content: any;
    export default content;
}

declare module '*.png';

declare namespace ApiSearchResult {

    export interface Basic {
        'uk-speech': string;
        'us-phonetic': string;
        'speech': string;
        'phonetic': string;
        'uk-phonetic': string;
        'us-speech': string;
        'explains': string[];
    }

    export interface Web {
        value: string[];
        key: string;
    }

    export interface RootObject {
        translation: string[];
        basic: Basic;
        query: string;
        errorCode: number;
        web: Web[];
    }

}

declare global {
    const chrome: Chrome;

    interface Window {
        selectData: string;
    }
}
