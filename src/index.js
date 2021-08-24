import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.global.less';

if (window.__POWERED_BY_QIANKUN__) {
    // eslint-disable-next-line no-undef
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

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
