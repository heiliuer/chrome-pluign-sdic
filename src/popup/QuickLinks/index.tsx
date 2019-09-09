import React from 'react';
import QRCodeViewer from '../QRCodeViewer';
import './index.scss';

interface AppProps {
    keyStr: string;
}

class QuickLinks extends React.Component<AppProps, object> {
    public static defaultProps: AppProps = {
        keyStr: '',
    };

    public render() {
        const encodeKey = encodeURIComponent(this.props.keyStr);
        return <div className='quick-links'>
            <a href={`https://www.baidu.com/s?wd=${encodeKey}&rsv_spt=1&rsv_iqid=0xa012476a0010d396&issp=1&f=8&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=98012088_5_dg&ch=9&rsv_enter=1&inputT=1929`}
               target='_blank' title='百度'>
                <img src={require('../../assets/img/icon-baidu.png')} />
            </a>

            <a target='_blank'
               href={`https://www.google.co.jp/search?q=${encodeKey}&oq=nihao&aqs=chrome..69i57j0l5.695j0j7&sourceid=chrome&ie=UTF-8`} title='谷歌'>
                <img src={require('../../assets/img/icon-google.png')} />
            </a>

            <a target='_blank' href={`http://www.wangpansou.cn/s.php?wp=0&ty=gn&op=gn&q=%s&q=${encodeKey}`} title='网盘'>
                <img src={require('../../assets/img/icon-pan.png')} />
            </a>

            <a target='_blank'
               href={`https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=2&tn=baiduhome_pg&wd=${encodeKey}&rsv_spt=1&rsv_pq=ca44ceb0000520bc&rsv_t=07daBK63AvI1kLfSLBvmPixf1LNluUdyQZg2pp6lNJOgQmVRoKdMQNQh5EwPfGK8AWp7&rsv_enter=1&inputT=3092&rsv_sug3=4&si=tieba.baidu.com&ct=2097152`} title='贴吧'>
                <img src={require('../../assets/img/icon-tieba.gif')} />
            </a>

            <a target='_blank' href={`http://www.sogou.com/web?query=${encodeKey}`} title='搜狗'>
                <img src={require('../../assets/img/icon-sougou.png')} />
            </a>

            <a target='_blank' href={`http://www.zhihu.com/search?type=content&q=${encodeKey}`} title='知乎'>
                <img src={require('../../assets/img/icon-zhihu.png')} />
            </a>

            <a target='_blank' href={`https://github.com/search?utf8=✓&q=${encodeKey}`} title='github'>
                <img src={require('../../assets/img/icon-github.png')} />
            </a>

            <QRCodeViewer keyStr={encodeKey}/>
        </div>;
    }

}

export default QuickLinks;
