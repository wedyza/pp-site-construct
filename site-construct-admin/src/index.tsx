import ReactDOM from 'react-dom/client';
import './styles/reset.scss'
import './styles/common.scss'
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter } from 'react-router-dom';
import Loader from './components/loader/Loader';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
      <BrowserRouter basename="/admin">
          <div className="App">
              <Loader />
              <App />
          </div>
      </BrowserRouter>
  </Provider>
);