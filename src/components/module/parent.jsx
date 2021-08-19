import React from 'react';
import cx from './parent.css';
export default () => <div className={cx('red', true && 'border')}>条件渲染——热更新</div>;