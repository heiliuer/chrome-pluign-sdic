import {Popover} from 'antd';
import React from 'react';
import './index.scss';

interface AppProps {
    keyStr: string;
}

interface AppState {
    randomKey: number;
}

class QRCodeViewer extends React.Component<AppProps, AppState> {
    public static defaultProps: AppProps = {
        keyStr: '',
    };

    public state: AppState = {
        randomKey: Date.now(),
    };

    protected audio: HTMLAudioElement | null = null;

    constructor(props: Readonly<any>) {
        super(props);
    }

    public render() {
        const key = this.props;
        return <Popover placement={'top'} trigger={'click'} content={<img width='180' src={`http://qr.liantu.com/api.php?text=` + key}/>}>
            <img src={require('../../assets/img/icon-qrcode.png')} width='15px'/>
        </Popover>;
    }

}

export default QRCodeViewer;
