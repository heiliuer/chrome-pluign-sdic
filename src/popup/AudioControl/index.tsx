import React from 'react';
import './index.scss';

interface AppProps {
    keyStr: string[];
}

interface AppState {
    randomKey: number;
}

class AudioControl extends React.Component<AppProps, AppState> {
    public static defaultProps: AppProps = {
        keyStr: [],
    };

    public state: AppState = {
        randomKey: Date.now(),
    };

    protected audio: HTMLAudioElement | null = null;

    constructor(props: Readonly<AppProps>) {
        super(props);
        // @ts-ignore
        window.audioControl = this;
    }

    public onMouseEnter = () => {
        this.setState({
            randomKey: Date.now(),
        }, () => {
            this.audio!.play().catch((error) => {
                console.error('播放失败', error);
            });
        });
    }

    public render() {
        const {keyStr} = this.props;
        const {randomKey} = this.state;
        console.log('AudioControl keyStr', keyStr);
        const validStr = keyStr.filter((k) => k && (/^[a-zA-Z0-9\s]+$/).test(k))[0];
        console.log('validStr', validStr);
        if (!validStr) {
            return null;
        }
        return <div>
            <audio ref={(dom) => this.audio = dom}
                   src={'http://dict.youdao.com/dictvoice?audio=' + validStr + '&_t=' + randomKey}/>
            <img onMouseEnter={this.onMouseEnter} src={require('../../assets/img/voice.png')}
                 width='17'
                 height='17'
                 onClick={this.onMouseEnter}
                 data-audio='search' title='点击发音'/>
        </div>;
    }

}

export default AudioControl;
