import ReactDOM from 'react-dom/client'
import App from './App'
import './css/components.css';
import './css/basic.css';
import { Provider } from 'react-redux';
import store from './store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <audio></audio>
    <button name="audioBtn" style={{position: 'absolute', opacity: 0, width: '0px', height: '0px', pointerEvents: 'none'}} ></button>
    <App />
  </Provider>,
)
