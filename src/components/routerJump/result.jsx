import React from 'react';
import {getRouteIds} from '../../utils/getRouteIds.js';

export default () => {
    const [CompanyId, ProjectId] = getRouteIds();
    return (
        <div>
            跳转的界面:
            {CompanyId}
            {ProjectId}
        </div>
    );
};