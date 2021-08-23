import React, { useEffect, useState, Suspense, useMemo } from 'react';
import {
  MemoryRouter,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import routes from './routes';

export const QiankunContext = React.createContext();

const GoPropsRoute = (props) => {
  const history = useHistory();

  useEffect(() => {
    console.log('子应用接收route:', props?.route);
    // 跳转渲染指定的路由
    if (props?.route) {
      history.push(props?.route);
    }
  }, [])

  return null
}

function App(props) {
  const [globalState, setGlobalState] = useState(null);

  const qiankunContextValue = useMemo(() => ({
    globalState,
    ...props
  }), [globalState, props]);

  return (
    <QiankunContext.Provider value={qiankunContextValue}>
      <MemoryRouter>
        <GoPropsRoute {...props} />
        <Switch>
          <Suspense fallback={<div>Loading...</div>}>
            {routes.map(({ path, component, exact }) => (
              <Route path={path} component={component} exact={exact} key={path} />
            ))}
          </Suspense>
        </Switch>
      </MemoryRouter>
    </QiankunContext.Provider>
  );
}

export default App;
