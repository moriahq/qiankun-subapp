import './public-path';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './global/index.global.less';
import './global/index.global.css';

function render(props) {
    const { container } = props;
    ReactDOM.render(<App {...props} />, container ? container.querySelector('#root') : document.querySelector('#root'));
}

if (!window.__POWERED_BY_QIANKUN__) {
    render({});
}

export async function bootstrap() {
    console.log('app bootstraped');
}

export async function mount(props) {
    console.log('app mount ===>', props);
    render(props);
}

export async function unmount(props) {
    const { container } = props;
    ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}
