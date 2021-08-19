import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Index from '../components/routerJump';
import Result from '../components/routerJump/result';

export default () => (
    <Switch>
        <Route path="/:company/:program/iscan/module" exact component={Index} />
        <Route path="/:company/:program/iscan/module/edit" exact component={Result} />
        {/* <Route path="/:company/:program/iscan/module/list" exact component={List}/>
        <Route path="/:company/:program/iscan/module/statistics" exact component={Static}/> */}
    </Switch>
);