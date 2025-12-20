import type { Lp } from "../types/cart";
import CartItem from "./CartItem";

interface CartListProps {
  items: Lp[];
}

const CartList = ({ items }: CartListProps) => {
  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 bg-gray-800 text-white">
        <h2 className="text-xl font-semibold">장바구니</h2>
      </div>
      {items.length > 0 ? (
        items.map((lp) => <CartItem key={lp.id} lp={lp} />)
      ) : (
        <div className="p-8 text-center text-gray-500">
          장바구니가 비어있습니다
        </div>
      )}
    </div>
  );
};

export default CartList;
