import React, { useEffect, Suspense, useMemo } from 'react';
import { MemoryRouter, Switch, Route, useHistory } from 'react-router-dom';
import routes from './routes';

interface QiankunContextProps {
  setGlobalState?: (data: { data: any }) => void;
  Parse?: any;
  onRefreshContext?: any;
}

export const QiankunContext = React.createContext({} as QiankunContextProps);

const GoPropsRoute = props => {
  const history = useHistory();

  useEffect(() => {
    console.info('子应用接收route:', props?.route);
    // 跳转渲染指定的路由
    if (props?.route) {
      history.push(props?.route);
    }
  }, []);

  return null;
};

const App: React.FC = props => {
  const qiankunContextValue: any = useMemo(
    () => ({
      ...props,
    }),
    [props],
  );

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
};

export default App;
