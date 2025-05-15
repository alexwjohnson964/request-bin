import Basket from "./Basket"
import type { BasketListProps, BasketType } from "../types"

function BasketList({ baskets, setCurrentBasketURL }: BasketListProps) {
  return (
    <div>
      <h2>Baskets</h2>
      {baskets.length > 0 ? (
        <ul>
          {baskets.map((basket: BasketType) => (
            <li key={basket.basket_url} onClick={() => setCurrentBasketURL(basket.basket_url)}>
              <button>Basket: {basket.basket_url}</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No existing baskets</p>
      )}
    </div>
  );
}

export default BasketList