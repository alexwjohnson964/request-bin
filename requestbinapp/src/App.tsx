import { useState, useEffect } from 'react';
import './App.css'
import BasketList from './components/BasketList.tsx';
import CreateBasket from './components/CreateBasket.tsx';
import Basket from './components/Basket.tsx';

//type Page = 'Home' | 'Basket';
const basketArray = [];
const seedDataUrl = 'b1BGeZ5GbRHtDiPdppAuUV';

function App() {
  useEffect(() => {
    // grab all baskets for basket list
  }, []);
// Instead of page/setpage use currentpage and assign to basket url when clicked, or '' for home page
  const [currentBasketURL, setCurrentBasketURL] = useState<string>(seedDataUrl);
  if (currentBasketURL === '') {
    return (
      <>
        <div><CreateBasket /></div>
        <div><BasketList basketArray={basketArray}/></div>
      </>
    );
  } else {
    return (
      <Basket url={currentBasketURL}/>
    );
  }
}

export default App;
