import { useState, useEffect } from 'react';
import './App.css'
import BasketList from './components/BasketList.tsx';
import CreateBasket from './components/CreateBasket.tsx';
import Basket from './components/Basket.tsx';
import { getAllBaskets, newBasket } from './apiService.ts';

type Page = 'Home' | 'Basket';

function App() {
  const [basketArray, setBasketArray] = useState([]);
  const [basketUrl, setBasketUrl] = useState('');
  const [page, setPage] = useState<Page>('Home');

  async function fetchBaskets() {
    try {
      const baskets = await getAllBaskets();
      setBasketArray(baskets);
    } catch (error) {
      console.error('Failed fetching all baskets:', error);
    }
  };

  useEffect(() => {
    fetchBaskets();
  }, []);

  async function handleCreateBasket() {
    try {
      const basket = await newBasket();
      await fetchBaskets();
      setBasketUrl(basket.url);
      setPage('Basket');
    } catch (error) {
      console.error('Failed creating new basket', error);
    }
  }

  if (page === 'Home') {
    return (
      <>
        <div><CreateBasket onCreate={handleCreateBasket}/></div>
        <div><BasketList baskets={basketArray}/></div>
      </>
    );
  } else {
    return (
      <Basket url={basketUrl}/>
    );
  }
}

export default App;
