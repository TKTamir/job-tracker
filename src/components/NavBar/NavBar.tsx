import React from "react";
import {useDispatch, useSelector} from "react-redux";
import Modal from "../Modal/Modal.tsx";
import {openModal} from "../../state/modal/modalSlice.ts";
import {setSearchQuery} from "../../state/search/searchSlice.ts";
import {logout, selectIsAuthenticated} from "../../state/auth/authSlice.ts";
import {AppDispatch} from "../../state/store.ts";
import {ModalTypes} from "./Interfaces.ts";

const NavBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(selectIsAuthenticated);


  const handleOpenModal = (modalType: ModalTypes) => {
    dispatch(openModal({modalType}));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleLogout = async () => {
    try {
      dispatch(logout());
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="NavBar flex w-full m-0 justify-between">
      <input
        className="m-2"
        placeholder="Search"
        onChange={handleSearchChange}
      />
      {isAuthenticated && (
        <button className="m-2" onClick={() => handleOpenModal("ADD_JOB")}>+</button>
      )}
      <div className="UserButtons">
        {isAuthenticated ? (
          <button className="m-2" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <button className="m-2" onClick={() => handleOpenModal("REGISTER")}>Register
            </button>
            <button className="m-2" onClick={() => handleOpenModal("LOGIN")}>Log in</button>
          </>
        )}
      </div>
      <Modal/>
    </div>
  );
}

export default NavBar;
