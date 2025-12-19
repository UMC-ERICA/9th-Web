import { useSelector, useDispatch } from "./useCustomRedux";
import { openModal, closeModal } from "../slices/modalSlice";

export const useModalStore = () => {
  const dispatch = useDispatch();
  
  // [ ] 리듀서의 상태를 가져옴
  const isOpen = useSelector((state) => state.modal.isOpen);

  // [ ] 리듀서의 액션을 dispatch하는 함수들
  const open = () => dispatch(openModal());
  const close = () => dispatch(closeModal());

  return { isOpen, openModal: open, closeModal: close };
};