import React from "react";
import Modal from "../Modal/Modal.tsx";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../state/store.ts";
import {openModal} from "../../state/modal/modalSlice.ts";
import {setSearchQuery} from "../../state/search/searchSlice.ts";
import {ModalTypes} from "./Interfaces.ts";

const NavBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenModal = (modalType: ModalTypes) => {
    dispatch(openModal(modalType));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="NavBar bg-blue-50 flex w-full m-0 justify-between">
      <input
        className="m-2"
        placeholder="Search"
        onChange={handleSearchChange}
      />
      <button className="m-2" onClick={() => handleOpenModal("ADD_JOB")}>+</button>
      <div className="">
        <button className="m-2" onClick={() => handleOpenModal("REGISTER")}>Register</button>
        <button className="m-2" onClick={() => handleOpenModal("LOGIN")}>Log in</button>
      </div>
      <Modal/>
    </div>
  )
}

export default NavBar;
