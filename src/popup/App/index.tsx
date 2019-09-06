import React from 'react';
import './index.scss';
import {searchKey} from "../service";
import {ApiSearchResult} from "../../custom";
import AudioControl from "../AudioControl";
import QRCodeViewer from "../QRCodeViewer";
import {Button, Input} from 'antd';
import TextArea from "antd/es/input/TextArea";
import WordCard from "../WordCard";


interface AppState {
    searchResult: ApiSearchResult.RootObject | null,
    fetching: boolean,
    key: string
}

class App extends React.Component<object, AppState> {

    protected textArea: TextArea | null = null;
    protected timer: number = 0;
    state: AppState = {
        searchResult: null,
        fetching: false,
        key: ''
    }

    autoInputSelectData() {
        if (!('chrome' in window && 'extension' in window.chrome)) {
            return;
        }
        const backPage = chrome.extension.getBackgroundPage();
        const selectData = backPage!.selectData;
        if (selectData && selectData === this.state.key) {
            this.setState({
                key: selectData
            });
            this.onInput(selectData);
        }
    }

    async componentDidMount() {
        this.autoInputSelectData();
    }

    onInput(key: string) {
        this.setState({
            key: key
        })
        this.delaySearch(key);
    }

    delaySearch(key: string) {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        setTimeout(async () => {
            await this.fetchData(key);
        }, 200)
    }

    async fetchData(key: string) {
        this.setState({
            fetching: true,
        });
        const searchResult = await searchKey(key);
        this.setState({
            searchResult,
            fetching: false,
        })
    }

    render() {
        const {searchResult, fetching, key} = this.state
        const encodeKey = encodeURIComponent(key);
        return <div className="App">
            <div>
                <Input.TextArea
                    value={key}
                    onInput={event => this.onInput((event.target as HTMLTextAreaElement).value)}
                    ref={dom => this.textArea = (dom as any)}
                    placeholder="输入单词自动搜索" className="key_input"
                    rows={2}/>
                <Button onClick={() => this.fetchData(key)} className="button-search" size={'small'}
                        loading={fetching}>查询</Button>
            </div>
            <AudioControl keyStr={[key, ...(searchResult && searchResult.translation || [])]}/>
            {searchResult && <div id="holder">
                {searchResult.translation && <WordCard title="翻译:" list={searchResult.translation}/>}
                {searchResult.basic && <div>
                    <WordCard title={"发音："} list={[searchResult.basic.phonetic]}/>
                    <WordCard title={"释义："} list={searchResult.basic.explains}/>
                </div>}
                {searchResult.web && <WordCard title={"网络释义："}
                                               list={searchResult.web ? searchResult.web.map((w, i) => <div>
                                                   <b>{w.key}</b> {w.value}</div>) : []}/>}
            </div>}
            <div className="quick-links">
                <a href={`https://www.baidu.com/s?wd=${encodeKey}&rsv_spt=1&rsv_iqid=0xa012476a0010d396&issp=1&f=8&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=98012088_5_dg&ch=9&rsv_enter=1&inputT=1929`}
                   target="_blank" title="百度"><img src="img/icon-baidu.png" width="15px"/></a>
                <a target="_blank"
                   href={`https://www.google.co.jp/search?q=${encodeKey}&oq=nihao&aqs=chrome..69i57j0l5.695j0j7&sourceid=chrome&ie=UTF-8`}
                   title="谷歌"><img src="img/icon-google.png" width="15px"/></a>
                <a target="_blank" href={`http://www.wangpansou.cn/s.php?wp=0&ty=gn&op=gn&q=%s&q=${encodeKey}`}
                   title="网盘"><img src="img/icon-pan.png" width="15px"/></a>
                <a target="_blank"
                   href={`https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=2&tn=baiduhome_pg&wd=${encodeKey}&rsv_spt=1&rsv_pq=ca44ceb0000520bc&rsv_t=07daBK63AvI1kLfSLBvmPixf1LNluUdyQZg2pp6lNJOgQmVRoKdMQNQh5EwPfGK8AWp7&rsv_enter=1&inputT=3092&rsv_sug3=4&si=tieba.baidu.com&ct=2097152`}
                   title="贴吧"><img src="img/icon-tieba.gif" width="15px"/></a>
                <a target="_blank" href={`http://www.sogou.com/web?query=${encodeKey}`} title="搜狗"><img
                    src="http://www.sogou.com/favicon.ico" width="15px"/></a>
                <a target="_blank" href={`http://www.zhihu.com/search?type=content&q=${encodeKey}`} title="知乎"><img
                    src="http://www.zhihu.com/favicon.ico" width="15px"/></a>
                <a target="_blank" href={`http://www.easyicon.net/iconsearch/${encodeKey}`} title="图标搜索"><img
                    src="http://www.easyicon.net/favicon.ico" width="15px"/></a>
                <a target="_blank" href={`https://github.com/search?utf8=✓&q=${encodeKey}`} title="github"><img
                    src="https://github.com//favicon.ico" width="15px"/></a>
                <QRCodeViewer keyStr={encodeKey}/>
            </div>
            <h4 className="copy_right">Copyright©2015 heiliuer 简词典</h4>
        </div>
    }
}

export default App;
