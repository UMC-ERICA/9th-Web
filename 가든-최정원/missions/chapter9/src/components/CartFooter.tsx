import { useAppDispatch } from "../store/hooks";
import { openModal } from "../features/modal/modalSlice";

interface CartFooterProps {
  total: number;
  itemCount: number;
}

const CartFooter = ({ total, itemCount }: CartFooterProps) => {
  const dispatch = useAppDispatch();

  // 전체 삭제 버튼 - 모달 열기
  const handleClearCart = () => {
    dispatch(openModal());
  };

  if (itemCount === 0) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-8 bg-white rounded-lg shadow text-center">
        <p className="text-xl text-gray-600">장바구니가 비어있습니다</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-gray-600">총 {itemCount}개의 상품</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            총 금액: ₩{total.toLocaleString()}
          </p>
        </div>

        <button
          onClick={handleClearCart}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold">
          전체 삭제
        </button>
      </div>

      <button className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg">
        구매하기
      </button>
    </div>
  );
};

export default CartFooter;
