import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import './App.css'
import Home from './components/Home.tsx';
import Basket from './components/Basket.tsx';
import { getAllBaskets, newBasket } from './apiService.ts';
import type { BasketType } from './types';

// const seedDataUrl = 'b1BGeZ5GbRHtDiPdppAuUV';

function App() {
  const [basketArray, setBasketArray] = useState<BasketType[]>([]);

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
      <Route path="/baskets/:url" element={<Basket />} />
    </Routes>
  );
}

export default App;
