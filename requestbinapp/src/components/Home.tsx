import { useNavigate } from "react-router";
import BasketList from "./BasketList";
import CreateBasket from "./CreateBasket";
import type { BasketType } from "../types"

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

export default Home;