import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Demo.module.less';

const About: React.FC = () => {
  return (
    <div className={styles.demoPage}>
      <h2>空间页面微前端</h2>
      <Link to="/demo4">跳转demo4</Link>
    </div>
  );
};

export default About;
