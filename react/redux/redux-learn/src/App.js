
import { Provider } from 'react-redux';
import './App.css';
import IndexRouter from './router/IndexRouter';
import store from './redux/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <IndexRouter></IndexRouter>
      </Provider>
    </div>
  );
}

export default App;
