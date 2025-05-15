import { useState, useEffect } from 'react';
import './App.css'
import BasketList from './components/BasketList.tsx';
import CreateBasket from './components/CreateBasket.tsx';
import Basket from './components/Basket.tsx';
import { getAllBaskets, newBasket } from './apiService.ts';

// const seedDataUrl = 'b1BGeZ5GbRHtDiPdppAuUV';

function App() {
  const [basketArray, setBasketArray] = useState([]);
  // Instead of page/setpage use currentpage and assign to basket url when clicked, or '' for home page
  const [currentBasketURL, setCurrentBasketURL] = useState<string>('');

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
      setCurrentBasketURL(basket.url);
    } catch (error) {
      console.error('Failed creating new basket', error);
    }
  }

  if (currentBasketURL === '') {
    return (
      <>
        <div><CreateBasket onCreate={handleCreateBasket}/></div>
        <div><BasketList baskets={basketArray} setCurrentBasketURL={setCurrentBasketURL}/></div>
      </>
    );
  } else {
    return (
      // pass in state setter func for returning to homepage (by setting currentBasketURL to '')
      <Basket url={currentBasketURL} setCurrentBasketURL={setCurrentBasketURL}/>
    );
  }
}

export default App;
