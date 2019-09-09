import {Button, Input} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import {ApiSearchResult} from '../../custom';
import AudioControl from '../AudioControl';
import QuickLinks from '../QuickLinks';
import {searchKey} from '../service';
import {isChromeExtensionEnv} from '../util';
import WordCard from '../WordCard';
import './index.scss';

interface AppState {
    searchResult: ApiSearchResult.RootObject | null;
    fetching: boolean;
    key: string;
}

class App extends React.Component<object, AppState> {
    public state: AppState = {
        searchResult: null,
        fetching: false,
        key: '',
    };

    protected textArea: TextArea | null = null;
    protected timer: number = 0;

    public autoInputSelectData() {
        if (!isChromeExtensionEnv) {
            return;
        }
        const backPage = chrome.extension.getBackgroundPage();
        const selectData = backPage!.selectData;
        if (selectData && selectData === this.state.key) {
            this.setState({
                key: selectData,
            });
            this.onInput(selectData);
        }
    }

    public async componentDidMount() {
        this.autoInputSelectData();
    }

    public onInput(key: string) {
        this.setState({
            key,
        });
        this.delaySearch(key);
    }

    public delaySearch(key: string) {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        setTimeout(async () => {
            await this.fetchData(key);
        }, 200);
    }

    public async fetchData(key: string) {
        this.setState({
            fetching: true,
        });
        const searchResult = await searchKey(key);
        this.setState({
            searchResult,
            fetching: false,
        });
    }

    public render() {
        const {searchResult, fetching, key} = this.state;
        return <div className='App'>
            <div className='search-panel'>
                <Input.TextArea
                    value={key}
                    onInput={(event) => this.onInput((event.target as HTMLTextAreaElement).value)}
                    ref={(dom) => this.textArea = (dom as any)}
                    placeholder='输入单词自动搜索' className='key_input'
                    rows={2}/>
                <Button onClick={() => this.fetchData(key)} className='button-search' size={'small'}
                        loading={fetching}>查询</Button>
            </div>
            <AudioControl keyStr={[key, ...(searchResult && searchResult.translation || [])]}/>
            {searchResult && <div className='clearfix'>
                {searchResult.translation && <WordCard title='翻译:' list={searchResult.translation}/>}
                {searchResult.basic && <div>
                    <WordCard title={'发音：'} list={[searchResult.basic.phonetic]}/>
                    <WordCard title={'释义：'} list={searchResult.basic.explains}/>
                </div>}
                {searchResult.web && <WordCard title={'网络释义：'}
                                               list={searchResult.web ? searchResult.web.map((w, i) => <div>
                                                   <b>{w.key}</b> {w.value}</div>) : []}/>}
            </div>}
            <QuickLinks keyStr={key}></QuickLinks>
            <h4 className='copy_right'>Copyright©2015 heiliuer 简词典</h4>
        </div>;
    }
}

export default App;
