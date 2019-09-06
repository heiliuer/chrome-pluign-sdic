import React, {ReactElement} from 'react';
import './index.scss';

interface AppProps {
    title: ReactElement | any,
    list: ReactElement[] | any[],
}


class WordCard extends React.Component<AppProps, object> {

    protected audio: HTMLAudioElement | null = null;
    static defaultProps: AppProps = {
        title: '',
        list: []
    };

    render() {
        const {title, list} = this.props
        console.log('WordCard list', list);
        return <div className="word-card">
            <div className="card-title">{title}</div>
            <ul className="card-content_list">
                {list && (list as ReactElement[]).map((c, i) => <li key={i}>{c}</li>)}
            </ul>
        </div>;
    }

}

export default WordCard;
