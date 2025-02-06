import React from "react";
import Modal from "../Modal/Modal.tsx";
import AddJob from "../AddJob/AddJob.tsx";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../state/store.ts";
import {openModal} from "../../state/modal/modalSlice.ts";

const NavBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="NavBar bg-blue-50 flex w-full m-0 justify-between">
      <input className="m-2" placeholder="Search"/>
      <button className="m-2" onClick={() => dispatch(openModal())}>+</button>
      <Modal>
        <AddJob/>
      </Modal>
      <div className="">
        <button className="m-2">Register</button>
        <button className="m-2">Log in</button>
      </div>
    </div>
  )
}

export default NavBar;
