import React from 'react';
import './index.scss';
import {ApiSearchResult} from "../../custom";
import AudioControl from "../../popup/AudioControl";
import {getSelectText} from "../util";

interface AppState {
    searchResult: ApiSearchResult.RootObject | null,
    key: string,
    show: boolean,
}

const ctrlKey = 17;
const escKey = 27;
const cmdKey = 91;

class App extends React.Component<object, AppState> {

    protected timer: number = 0;
    private currentMouseDom: HTMLElement | null = null;
    private timeoutHandlerCtrl: any = 0;
    private timeoutHideTip: any = 0;
    state: AppState = {
        searchResult: null,
        key: '',
        show: false,
    }

    constructor(props: object) {
        super(props);
        // @ts-ignore
        window.contentApp = this;
    }

    async componentDidMount() {
        document.addEventListener('mouseover', ev => {
            this.currentMouseDom = ev.target as HTMLElement;
        })
        document.addEventListener('keydown', e => {
            if (e.keyCode === escKey) {
                this.setState({show: false})
            }
            if (e.keyCode == ctrlKey || e.keyCode == cmdKey) {
                // console.log("ctrl ")
                clearTimeout(this.timeoutHandlerCtrl);
                this.timeoutHandlerCtrl = setTimeout(this.handlerCtrl, 300);
            } else {
                clearTimeout(this.timeoutHandlerCtrl);
            }
        })

        document.addEventListener("mouseup", () => {
            const selection = getSelectText();
            if (selection) {
                chrome.runtime.sendMessage({
                    type: "select",
                    data: selection
                });
            }
        });
    }

    handleMessageResponse(response: any, key: string) {
        const {data, translation} = response;
        this.setState({
            show: true,
            key,
            searchResult: data as ApiSearchResult.RootObject
        })

        clearTimeout(this.timeoutHideTip);
        const prevTime = 150 * Math.max(translation.length, key.length);
        this.timeoutHideTip = setTimeout(() => {
            this.setState({
                show: false
            });
            this.timeoutHideTip = 0
        }, Math.min(30 * 1000, Math.max(2 * 1000, prevTime)));
    }

    handlerCtrl = () => {
        const dom = this.currentMouseDom as HTMLElement;
        const key = (getSelectText() || (dom && dom.innerText || dom.getAttribute('title'))) || "";
        console.log('key', key);
        chrome.runtime.sendMessage({
            type: "search_and_add_dom",
            data: key
        }, (response) => {
            console.log('sendMessage response', response);
            // console.log("response:", response)
            this.handleMessageResponse(response, key);
        });
    }

    render() {
        const {searchResult, key, show} = this.state;
        console.log('render', searchResult);
        return <div id="com_heiliuer_sdic_tip" className={show ? '' : 'hide'}>
            <span className="close" onClick={() => this.setState({show: false})}>X</span>
            {searchResult && <div>
                <p>{key}</p>
                <p>{searchResult.translation && searchResult.translation.join(' ')}</p>
                <p>{searchResult.basic && searchResult.basic.phonetic}</p>
            </div>}
            <AudioControl keyStr={[key, ...(searchResult && searchResult.translation || [])]}></AudioControl>
        </div>
    }
}

export default App;
