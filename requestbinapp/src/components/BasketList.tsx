import Basket from "./Basket"
import type { BasketListProps, BasketType } from "../types"

function BasketList({ baskets }: BasketListProps) {
  console.log('baskets:', baskets);
  return (
    <div>
      <h2>Baskets</h2>
      {baskets.length > 0 ? (
        <ul>
          {baskets.map((basket: BasketType) => (
            <li key={basket.basket_url}>
              <Basket url={basket.basket_url} />
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