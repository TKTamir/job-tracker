import React from "react";
import {useDispatch} from "react-redux";
import JobApplicationsList from "../JobApplicationsList/JobApplicationsList.tsx";
import {openModal} from "../../state/modal/modalSlice.ts";
import {AppDispatch} from "../../state/store.ts";
import {ModalTypes} from "../NavBar/Interfaces.ts";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenModal = (modalType: ModalTypes) => {
    dispatch(openModal({modalType}));
  };

  return (
    <div className="Dashboard flex flex-col items-center">
      <div className="justify-self-center">
        <h1 className="m-2 block">Dashboard</h1>
      </div>
      <div>
        <button className="m-2" onClick={() => handleOpenModal("ADD_JOB")}>Add New Application
        </button>
      </div>
      <div className="m-2 w-full">
        <JobApplicationsList/>
      </div>
    </div>
  )
}

export default Dashboard;
