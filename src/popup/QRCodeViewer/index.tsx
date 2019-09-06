import React from 'react';
import './index.scss';
import {Popover} from "antd";

interface AppProps {
    keyStr: string,
}

interface AppState {
    randomKey: number,
}

class QRCodeViewer extends React.Component<AppProps, AppState> {

    protected audio: HTMLAudioElement | null = null;
    static defaultProps: AppProps = {
        keyStr: '',
    }

    state: AppState = {
        randomKey: Date.now(),
    }

    constructor(props: Readonly<any>) {
        super(props);
    }

    render() {
        const key = this.props;
        return <Popover placement={"top"} trigger={"click"} content={<img width="180" src={`http://qr.liantu.com/api.php?text=` + key}/>}>
            <img src="img/icon-qrcode.png" width="15px"/>
        </Popover>
    }

}

export default QRCodeViewer;
