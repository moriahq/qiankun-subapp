import React from 'react';
import { Input, Rate } from '@osui/ui';
import Error from '@/statics/error.png';
import Logo from '@/statics/Gitee-Scan.svg';
import cx from './Demo.less';

const Demo: React.FC = () => {
  return (
    <div>
      <h2 className={cx('title')}>CSS Modules 测试</h2>
      <Input placeholder="OSUI input 测试" />
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
