import { Link } from "react-router-dom";
import {useHistory} from 'react-router-dom';


const Home = () => {
  const history = useHistory();

  const goDemoPage = () => {
    history.push({pathname: '/demo', state: {some: 'aaaaa'}})
  }

  return (
    <div>
      <h2>这是微前端页面~</h2>
      <ul>
        <li onClick={goDemoPage}>
          跳转
          {/* <Link to="/demo">go Demo page</Link> */}
        </li>
      </ul>
    </div>
  )
};

export default Home;
