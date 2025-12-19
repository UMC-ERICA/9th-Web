import { useModalStore } from "../hooks/useModalStore";
import { useDispatch } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlice";

const ConfirmModal = () => {
  const { isOpen, closeModal } = useModalStore();
  const dispatch = useDispatch();

  // [ ] useState 사용 없이 전역 상태 isOpen으로 제어
  if (!isOpen) return null;

  const handleConfirm = () => {
    dispatch(clearCart()); // 장바구니 초기화 (dispatch 실행)
    closeModal(); // 모달 닫기 (dispatch 실행)
  };

  const handleCancel = () => {
    closeModal(); // 모달 닫기 (dispatch 실행)
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 shadow-lg text-center w-80">
        <p className="text-lg font-semibold mb-6">정말 전체 삭제하시겠습니까?</p>
        <div className="flex justify-around">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            아니요
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;