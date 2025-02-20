import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../state/store.ts";
import {deleteJob} from "../../state/job/jobSlice.ts";
import {closeModal} from "../../state/modal/modalSlice.ts";


const ConfirmAlert: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const modalProps = useSelector((state: RootState) => state.modal.modalProps);

  const handleDeleteJob = () => {
    const jobId = modalProps;
    if (!jobId) return;

    dispatch(deleteJob(jobId));
    dispatch(closeModal());
  };

  return (
    <div className="ConfirmAlert">
      <p>Are you sure you want to delete this job?</p>
      <div className="flex justify-end gap-2 mt-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleDeleteJob}
        >
          Yes, Delete
        </button>
        <button
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={() => dispatch(closeModal())}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ConfirmAlert;
