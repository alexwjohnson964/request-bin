import Basket from "./Basket"
import type { BasketListProps, BasketType } from "../types"

function BasketList({ baskets }: BasketListProps) {
  return (
    <div>
      <h2>Baskets</h2>
      {baskets.length > 0 ? (
        <ul>
          {baskets.map((basket: BasketType) => (
            <li key={basket.url}>
              <Basket url={basket.url} />
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