import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.tsx'
import Basket from './components/Basket.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    {/* <Routes>
    <Route path = "/" element ={<App />}/>
    <Route path = "/baskets/:basketUrl" element = {<Basket></Basket>}></Route>
    </Routes> */}
    </BrowserRouter>
  </StrictMode>,
)
