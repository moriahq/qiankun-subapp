import React from 'react';
import {Input, Button} from '@osui/ui';
import Error from '../statics/error.png';
import Logo from '../statics/logo.svg';
import Logo2 from '../statics/Gitee-Scan.svg';
import BigSvg from '../statics/bigSvg.svg';

export default () => (
    <>
        <Button type="primary" onClick={() => {}}>
            Open hhhh 111
        </Button>
        <div>下面图片测试大的svg</div>
        <img src={BigSvg} />
        <img src={Error} />
        <img src={Logo} />
        <img src={Logo2} />
        <Input />
    </>
);
