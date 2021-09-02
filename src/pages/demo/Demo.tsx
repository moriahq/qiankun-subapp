import React from 'react';
import { Input, Rate } from '@osui/ui';
import Error from '@/statics/error.png';
import Logo from '@/statics/Gitee-Scan.svg';
import cx from './Demo.less';

const Demo: React.FC = () => {
  return (
    <div>
      <h2 className={cx('title')}>这是微前端</h2>
      <Input placeholder="input 组件测试" />
      <Rate allowHalf defaultValue={2.5} />
      <div>
        <img src={Error} />
      </div>
      <div>svg测试:</div>
      <Logo />
    </div>
  );
};

export default Demo;
