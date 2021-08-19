import React from 'react';
import {Button} from '@osui/ui';
import Edit from './edit';
import Parent from './parent.jsx';
export default function Module(props) {
    console.log(111, {props});
    return (
        <>
            <Button type="primary">按钮</Button>
            <div id="global">测试全局样式</div>
            <div>
                <Parent />
                <Edit />
            </div>
        </>
    );
}
