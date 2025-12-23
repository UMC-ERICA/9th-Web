import type { Lp } from "../types/cart";
import { useAppDispatch } from "../store/hooks";
import { increase, decrease, removeItem } from "../features/cart/cartSlice";

interface CartItemProps {
  lp: Lp;
}

const CartItem = ({ lp }: CartItemProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition">
      <img
        src={lp.img}
        alt={`${lp.title} LP 이미지`}
        className="w-20 h-20 object-cover rounded mr-4"
      />

      <div className="flex-1">
        <h3 className="text-lg font-semibold">{lp.title}</h3>
        <p className="text-sm text-gray-600">{lp.singer}</p>
        <p className="text-base font-bold text-gray-800 mt-1">
          ₩{Number(lp.price).toLocaleString()}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <button
            onClick={() => dispatch(decrease(lp.id))}
            className="px-3 py-1 bg-gray-300 text-gray-800 rounded-l hover:bg-gray-400 transition">
            -
          </button>

          <span className="px-4 py-1 border-y border-gray-300 bg-white min-w-[50px] text-center">
            {lp.amount}
          </span>

          <button
            onClick={() => dispatch(increase(lp.id))}
            className="px-3 py-1 bg-gray-300 text-gray-800 rounded-r hover:bg-gray-400 transition">
            +
          </button>
        </div>

        <button
          onClick={() => dispatch(removeItem(lp.id))}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
          제거
        </button>
      </div>
    </div>
  );
};

export default CartItem;
