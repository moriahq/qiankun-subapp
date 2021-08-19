import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import Index from '../components/index';
import ModuleRoute from './moduleRoute.js';
import Module from '../components/module';

const ScanHistory = createBrowserHistory();

ScanHistory.listen((location, action) => {
    console.log({location, action});
});

const Routes = () => (
    <>
        <Route path="/" exact component={Module} />
        <Route path="/:company/:program/iscan" exact component={Index} />
        <Route path="/:company/:program/iscan/module" component={ModuleRoute} />
    </>
);

export {Routes, ScanHistory};
