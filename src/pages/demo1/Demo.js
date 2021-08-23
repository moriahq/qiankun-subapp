import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'antd';

import { QiankunContext } from '../../App';
import styles from './Demo.module.less';

const About = () => {
  const { globalState, setGlobalState, Parse } = useContext(QiankunContext);

  const setGlobalStateFn = () => {
    const data = { text: `子发信给父的消息_${Date.now()}` };
    setGlobalState && setGlobalState({ data });
  };

  const findScreen = () => {
    const query = new Parse.Query('Screen');
    query.first().then(res => {
      alert(`Parse result: ${JSON.stringify(res)}`);
    });
  }

  return (
    <div className={styles.demoPage}>
      <h2>卡片动作</h2>
      <Link to="/demo2">跳转demo2</Link>
    </div>
  )
};

export default About;
