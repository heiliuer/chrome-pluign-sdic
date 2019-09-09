import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

let dom = document.getElementById('com_heiliuer_dev_root');
if (!dom) {
    dom = document.createElement('div');
    document.body.append(dom);
}
ReactDOM.render(<App/>, dom);
