import { useCartActions } from "../hooks/useCartStore";
import { useModalStore } from "../hooks/useModalStore";

const ConfirmModal = () => {
  const isOpen = useModalStore((state) => state.isOpen);
  const closeModal = useModalStore((state) => state.closeModal);
  const { clearCart } = useCartActions();

  if (!isOpen) return null;

  const handleConfirm = () => {
    clearCart();
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
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