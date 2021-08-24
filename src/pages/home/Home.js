import React from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Button } from '@osui/ui';
import Error from '../../statics/error.png';
import Logo from '../../statics/Gitee-Scan.svg';

const Home = () => {
  const history = useHistory();

  const goDemoPage = () => {
    history.push('/demo1');
  }

  return (
    <div>
      <h2>这是微前端页面~</h2>
      <Button type="primary" onClick={goDemoPage}>goDemoPage</Button>
      <Input placeholder="input 组件测试" />
      <div>
        <img src={Error} />
      </div>
      <div>svg测试:</div>
      <Logo style={{ width: '300px' }} />
    </div>
  )
};

export default Home;
