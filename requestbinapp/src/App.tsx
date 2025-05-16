import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router';
import './App.css'
import BasketList from './components/BasketList.tsx';
import CreateBasket from './components/CreateBasket.tsx';
import Basket from './components/Basket.tsx';
import { getAllBaskets, newBasket } from './apiService.ts';
import type { BasketType } from './types';

// const seedDataUrl = 'b1BGeZ5GbRHtDiPdppAuUV';

function App() {
  const [basketArray, setBasketArray] = useState([]);
  // Instead of page/setpage use currentpage and assign to basket url when clicked, or '' for home page
  // const [currentBasketURL, setCurrentBasketURL] = useState<string>('');

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
      await newBasket();
      await fetchBaskets();
    } catch (error) {
      console.error('Failed creating new basket', error);
    }
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Home basketArray={basketArray} onCreate={handleCreateBasket} />}
      />
      <Route path="/baskets/:url" element={<BasketWithParams />} />
    </Routes>
  );

  // if (currentBasketURL === '') {
  //   return (
  //     <>
  //       <div><CreateBasket onCreate={handleCreateBasket}/></div>
  //       <div><BasketList baskets={basketArray} setCurrentBasketURL={setCurrentBasketURL}/></div>
  //     </>
  //   );
  // } else {
  //   return (
  //     // pass in state setter func for returning to homepage (by setting currentBasketURL to '')
  //     <Basket url={currentBasketURL} setCurrentBasketURL={setCurrentBasketURL}/>
  //   );
  // }
}

function Home({basketArray, onCreate}: {basketArray: BasketType[]; onCreate: () => void}) {
  const navigate = useNavigate();
  return (
        <>
      <div>
        <CreateBasket onCreate={onCreate} />
      </div>
      <div>
        <BasketList
          baskets={basketArray}
          setCurrentBasketURL={(url) => navigate(`/baskets/${url}`)}
        />
      </div>
    </>
  );
}

function BasketWithParams() {
  const { url } = useParams<{ url: string }>();
  const navigate = useNavigate();

  if(!url) return <p>Invalid url</p>

  return (
    <Basket url={url} setCurrentBasketURL={() => navigate('/')} />
  );
}

export default App;
