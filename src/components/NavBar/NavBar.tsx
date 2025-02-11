import React from "react";
import Modal from "../Modal/Modal.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../state/store.ts";
import {openModal} from "../../state/modal/modalSlice.ts";
import {setSearchQuery} from "../../state/search/searchSlice.ts";
import {ModalTypes} from "./Interfaces.ts";
import {logoutUser} from "../../state/auth/authSlice.ts";

const NavBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleOpenModal = (modalType: ModalTypes) => {
    dispatch(openModal(modalType));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="NavBar bg-blue-50 flex w-full m-0 justify-between">
      <input
        className="m-2"
        placeholder="Search"
        onChange={handleSearchChange}
      />
      <button className="m-2" onClick={() => handleOpenModal("ADD_JOB")}>+</button>
      <div className="UserButtons">
        {isAuthenticated ? (
          <>
            <button className="m-2" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button className="m-2" onClick={() => handleOpenModal("REGISTER")}>Register</button>
            <button className="m-2" onClick={() => handleOpenModal("LOGIN")}>Log in</button>
          </>
        )}
      </div>
      <Modal/>
    </div>
  )
}

export default NavBar;
