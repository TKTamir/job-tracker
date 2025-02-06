import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../state/store.ts";
import {closeModal} from "../../state/modal/modalSlice.ts";

interface ModalProps {
  children: React.ReactNode | null;
}

const Modal: React.FC<ModalProps> = ({children}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {isModalOpen} = useSelector((state: RootState) => state.modal)

  if (!isModalOpen) return null;

  return (
    <div className="Modal fixed inset-0 flex items-center justify-center z-10">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
        <button onClick={() => dispatch(closeModal())}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;