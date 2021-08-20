import React, { useEffect, useState, Suspense, useMemo } from 'react';
import {
  HashRouter,
  Switch,
  Route,
} from "react-router-dom";
import routes from './routes';

export const QiankunContext = React.createContext();

function App(props) {
  // const { route = '/' } = props;
  const [globalState, setGlobalState] = useState(null);

  // console.log('route', route);
  // window.location.hash = route;
  // console.log('app render');

  useEffect(() => {
    if (props.onGlobalStateChange) {
      props.onGlobalStateChange(state => {
        setGlobalState(state)
      })
    }
  }, [props]);

  const qiankunContextValue = useMemo(() => ({
    globalState,
    ...props
  }), [globalState, props]);

  return (
    <QiankunContext.Provider value={qiankunContextValue}>
      <HashRouter>
        <Switch>
          <Suspense fallback={<div>Loading...</div>}>
            {routes.map(({ path, component, exact }) => (
              <Route path={path} component={component} exact={exact} key={path} />
            ))}
          </Suspense>
        </Switch>
      </HashRouter>
    </QiankunContext.Provider>
  );
}

export default App;
