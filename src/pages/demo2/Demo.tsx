import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Demo.module.less';

const About: React.FC = () => {
  return (
    <div className={styles.demoPage}>
      <h2>卡片活动微前端</h2>
      <Link to="/demo3">跳转demo3</Link>
    </div>
  );
};

export default About;
