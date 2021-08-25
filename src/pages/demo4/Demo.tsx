import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Demo.module.less';

const About: React.FC = () => {
  return (
    <div className={styles.demoPage}>
      <h2>应用页面微前端</h2>
      <Link to="/demo5">跳转demo5</Link>
    </div>
  );
};

export default About;
