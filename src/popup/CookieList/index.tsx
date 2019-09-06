import React from 'react';
import './index.scss';
import {CookieItem} from "../service";
import {Button, List} from "antd";

interface CookieListProps {
    list: CookieItem[],
    onClickClone?: (item: CookieItem) => void
}

export default class CookieList extends React.Component<CookieListProps, object> {
    props: Readonly<CookieListProps> = {
        list: []
    };

    constructor(props: Readonly<CookieListProps>) {
        super(props);
    }

    render() {
        const {list, onClickClone} = this.props;
        return <List
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item: CookieItem) => (
                <List.Item
                    actions={(item.data.isMobile && item.data.cookie) ? [<Button size='small' key="list-loadmore-edit"
                                                                                 onClick={() => onClickClone && onClickClone(item)}>克隆Cookie</Button>] : []}>
                    <List.Item.Meta
                        avatar={
                            <div className='icon-text_device-type'>{item.data.isMobile ? 'M' : 'P'}</div>
                        }
                        title={<b>{new Date(item.createAt).toLocaleString()}</b>}
                        description={<div>
                            <p><i>[cookie]</i> {item.data.cookie}</p>
                            <p><i>[userAgent]</i> {item.data.userAgent}</p>
                        </div>}
                    />
                </List.Item>
            )}
        />
    }
}
