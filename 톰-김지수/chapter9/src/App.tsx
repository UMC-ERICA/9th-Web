import { useEffect } from "react";
import "./App.css";
import CartList from "./components/CartList";
import Navbar from "./components/Navbar";
import CartFooter from "./components/CartFooter";
import Modal from "./components/Modal";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { calculateTotals } from "./features/cart/cartSlice";

export default function App() {
  const dispatch = useAppDispatch();
  const { items, amount, total } = useAppSelector((state) => state.cart);

  // 장바구니 items가 변경될 때마다 전체 합계 자동 계산
  useEffect(() => {
    dispatch(calculateTotals());
  }, [items, dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar totalItems={amount} />
      <CartList items={items} />
      <CartFooter total={total} itemCount={items.length} />

      {/* 모달 컴포넌트 - Redux state에 따라 자동으로 표시/숨김 */}
      <Modal />
    </div>
  );
}
