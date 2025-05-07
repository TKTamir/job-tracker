import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Modal from "../Modal/Modal.tsx";
import {openModal} from "../../state/modal/modalSlice.ts";
import {setSearchQuery} from "../../state/search/searchSlice.ts";
import {logout, selectIsAuthenticated} from "../../state/auth/authSlice.ts";
import {AppDispatch} from "../../state/store.ts";
import {ModalTypes} from "./Interfaces.ts";

const Navbar: React.FC = () => {
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
    <nav className="NavBar flex flex-row w-full justify-between m-0">
      <div>
        <Link to="/" className="m-2">Home</Link>
        <Link to="/dashboard" className="m-2">Dashboard</Link>
      </div>
      {isAuthenticated ? (
        <div className="justify-end">
          <button className="m-2" onClick={() => handleOpenModal("ADD_JOB")}>+</button>
          <input
            className="m-2 w-20"
            placeholder="Search"
            onChange={handleSearchChange}
          />
          <button className="m-2" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <button className="m-2" onClick={() => handleOpenModal("REGISTER")}>Register</button>
          <button className="m-2" onClick={() => handleOpenModal("LOGIN")}>Log in</button>
        </div>
      )}
      <Modal/>
    </nav>
  );
}

export default Navbar;
