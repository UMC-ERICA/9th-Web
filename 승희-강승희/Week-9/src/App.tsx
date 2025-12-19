import './App.css'
import Navbar from './components/Nevbar';
import CardList from './components/CartList';
import store from './store/store';
import { Provider } from 'react-redux';
import PriceBox from './components/PriceBox';

function App() {

  return (
    <Provider store={store}>
      <Navbar />
      <CardList />
      <PriceBox />
    </Provider>
  );
}
export default App
