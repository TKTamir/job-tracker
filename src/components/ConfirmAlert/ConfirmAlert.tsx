import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useDeleteJobMutation} from "../../state/api/jobsApi.ts";
import {closeModal} from "../../state/modal/modalSlice.ts";
import {AppDispatch, RootState} from "../../state/store.ts";


const ConfirmAlert: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [deleteJob, {isLoading: isDeleting}] = useDeleteJobMutation();
  const jobId = useSelector((state: RootState) => state.modal.modalProps?.id);

  const handleDelete = async () => {
    if (!jobId || isDeleting) return;

    try {
      await deleteJob(jobId).unwrap();
      dispatch(closeModal());
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  return (
    <div className="ConfirmAlert">
      <p>Are you sure you want to delete this job?</p>
      <div className="flex justify-end gap-2 mt-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleDelete}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
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
