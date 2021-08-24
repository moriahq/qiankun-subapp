import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@osui/ui';

import { QiankunContext } from '@/App';
import styles from './Demo.module.less';

const About: React.FC = () => {
  const { Parse } = useContext(QiankunContext);

  const findScreen = () => {
    const query = new Parse.Query('Screen');
    query.first().then(res => {
      alert(`Parse result: ${JSON.stringify(res)}`);
    });
  };

  return (
    <div className={styles.demoPage}>
      <h2>卡片面板微前端</h2>
      <Button onClick={findScreen}>测试 Parse</Button>
      <Link to="/">跳转首页</Link>
    </div>
  );
};

export default About;
