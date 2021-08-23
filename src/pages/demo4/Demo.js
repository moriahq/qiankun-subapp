import React, { useContext } from 'react';

import { QiankunContext } from '../../App';
import styles from './Demo.module.less';

const About = () => {
  const { globalState, setGlobalState, Parse } = useContext(QiankunContext);

  return (
    <div className={styles.demoPage}>
      <h2>卡片活动_1</h2>
    </div>
  )
};

export default About;