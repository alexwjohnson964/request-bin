import { useState, useEffect } from 'react';
import './App.css'
import BasketList from './components/BasketList.tsx';
import CreateBasket from './components/CreateBasket.tsx';
import Basket from './components/Basket.tsx';

type Page = 'Home' | 'Basket';
const basketArray = [];
const url = '';
function App() {
  useEffect(() => {
    // grab all baskets for basket list
  }, []);

  const [page, setPage] = useState<Page>('Home');
  if (page === 'Home') {
    return (
      <>
        <div><CreateBasket /></div>
        <div><BasketList basketArray={basketArray}/></div>
      </>
    );
  } else {
    return (
      <Basket url={url}/>
    );
  }
}

export default App;
