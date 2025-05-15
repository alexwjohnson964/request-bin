import type { CreateBasketProps } from '../types';

function CreateBasket({ onCreate }: CreateBasketProps) {
  return (
    <>
      <button onClick={onCreate}>
        Create New Basket
      </button>
    </>
  );
}

export default CreateBasket;