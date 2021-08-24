import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Demo.module.less';

const About: React.FC = () => {
  return (
    <div className={styles.demoPage}>
      <h2>卡片面板_2</h2>
      <Link to="/demo2">跳转demo2</Link>
    </div>
  );
};

export default About;
