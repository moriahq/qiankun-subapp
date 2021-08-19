import { Link } from "react-router-dom";
import { useContext } from 'react';
import { Button } from 'antd';

import { QiankunContext } from '../../App';
import styles from './Demo.module.scss';

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
      <h2>this is demo page~~</h2>
      <Button onClick={findScreen}>test Parse</Button>
      <div className={styles.br}></div>
      <Button type="primary" onClick={setGlobalStateFn}>test send message</Button>
      <span className={styles.text}>消息::: {globalState?.data?.text}</span>
      <ul className={styles.ul}>
        <li>
          <Link to="/">go Home page</Link>
        </li>
      </ul>
    </div>
  )
};

export default About;
