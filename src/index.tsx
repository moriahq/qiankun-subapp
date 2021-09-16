import ReactDOM from 'react-dom';
import App from './App';
import './index.global.less';
import { ProximaSDK } from '@projectproxima/plugin-sdk';

const rootElement = '#{{projectName}}';

if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

function render(props) {
  const { container } = props;
  ReactDOM.render(
    <App {...props} />,
    container ? container.querySelector(rootElement) : document.querySelector(rootElement),
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  const sdk = new ProximaSDK({ sdkServer: window.parent });
  render({ sdk });
}

export async function bootstrap(): Promise<void> {
  console.info('app bootstraped');
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function mount(props): Promise<void> {
  console.info('app mount ===>', props);
  window.QiankunProps = props;
  render(props);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function unmount(props): Promise<void> {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(
    container ? container.querySelector(rootElement) : document.querySelector(rootElement),
  );
}
