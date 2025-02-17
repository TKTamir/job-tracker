import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../state/store.ts";
import {closeModal} from "../../state/modal/modalSlice.ts";
import AddJob from "../AddJob/AddJob.tsx";
import Register from "../Register/Register.tsx";
import Login from "../Login/Login.tsx";
import ConfirmAlert from "../ConfirmAlert/ConfirmAlert.tsx";

const Modal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {isModalOpen, modalType} = useSelector((state: RootState) => state.modal);

  if (!isModalOpen) return null;

  let content: React.ReactNode;

  switch (modalType) {
    case "REGISTER":
      content = <Register/>;
      break;
    case "LOGIN":
      content = <Login/>;
      break;
    case "ADD_JOB":
      content = <AddJob/>;
      break;
    case "CONFIRM_ALERT":
      content = <ConfirmAlert/>;
      break;
    default:
      content = null;
  }

  const handleBackdropClick = () => {
    dispatch(closeModal());
  };

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <div className="Modal fixed inset-0 flex items-center justify-center z-10"
         onClick={handleBackdropClick}
    >
      <div
        className="relative bg-white p-6 rounded-lg shadow-lg w-96"
        onClick={handleContentClick}
      >
        <button onClick={() => dispatch(closeModal())}>
          X
        </button>
        {content}
      </div>
    </div>
  );
};

export default Modal;