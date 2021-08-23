import React, { useEffect, useState, Suspense, useMemo } from 'react';
import {
  HashRouter,
  Switch,
  Route,
} from "react-router-dom";
import routes from './routes';

export const QiankunContext = React.createContext();

function App(props) {
  const [globalState, setGlobalState] = useState(null);

  console.log('子应用接收route:', props?.route);
  console.log('window?.location?.hash', window?.location?.hash);
  // if (props?.route && !window?.location?.hash) {
  if (props?.route) {
    window.location.hash = props?.route;
  }

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
