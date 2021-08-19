import React from 'react';
import {Button} from '@osui/ui';
import {useHistory} from 'react-router-dom';
import {ScanHistory} from '../../routes';
import {getRouteIds} from '../../utils/getRouteIds.js';
export default () => {
    const [CompanyId, ProjectId] = getRouteIds();
    let history = useHistory();
    const handleClick = () => {
        console.log('页面不刷新');
        ScanHistory.push({pathname: '/111/222/iscan/module/edit', state: {some: 'state'}});
    };
    // 推荐
    const handleClick2 = () => {
        history.push({pathname: '/222/222/iscan/module/edit', state: {some: 'state'}});
    };
    return (
        <div>
            <Button type="primary" onClick={handleClick}>
                跳转
            </Button>
            <Button onClick={handleClick2}>
                跳转11
            </Button>
            1111
            {CompanyId}
            {ProjectId}
        </div>
    );
};