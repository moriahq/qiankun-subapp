import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Routes, ScanHistory} from './routes';
import './index.less';
import './global/index.global.less';
import './global/index.global.css';

const App = () => {
    return (
        <>
            <BrowserRouter history={ScanHistory}>
                <Routes />
            </BrowserRouter>
        </>
    );
};

render(<App />, document.getElementById('root'));
