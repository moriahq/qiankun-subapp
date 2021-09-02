import React, { useEffect, Suspense } from 'react';
import { MemoryRouter, Switch, Route, useHistory } from 'react-router-dom';
import { ConfigProvider, message } from '@osui/ui';

message.config({
  getContainer: () =>
    document.getElementById('osc-proxima') || document.getElementById('proxima-plugin'),
});

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
  return (
    <ConfigProvider getPopupContainer={() => document.getElementById('proxima-plugin')}>
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
    </ConfigProvider>
  );
};

export default App;
