import React, {useState} from "react";
import {IJobItem} from "../JobItem/Interfaces.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../state/store.ts";
import {addJob} from "../../state/job/jobSlice.ts";
import {closeModal} from "../../state/modal/modalSlice.ts";
import {useAuthUser} from "../../hooks/useAuthUser.ts";


const AddJob: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {status, error} = useSelector((state: RootState) => state.jobs);
  const user = useAuthUser();

  const [jobData, setJobData] = useState<IJobItem>({
    applicationDate: "",
    companyName: "",
    companyWebsite: "",
    generalInfo: "",
    id: null,
    jobAd: "",
    positionName: "",
    progression: "",
    requestedSalary: "",
    status: "",
    userId: user?.id ?? null,
  });

  if (!user) {
    return <p>You must be logged in to add a job.</p>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobData.companyName || !jobData.positionName) {
      alert("Company Name and Position are required.");
      return;
    }

    try {
      await dispatch(addJob({...jobData, userId: user.id})).unwrap();
      setJobData({
        applicationDate: "",
        companyName: "",
        companyWebsite: "",
        generalInfo: "",
        id: null,
        jobAd: "",
        positionName: "",
        progression: "",
        requestedSalary: "",
        status: "",
        userId: null,
      });
      dispatch(closeModal());
    } catch (error) {
      console.error("Failed to add job: ", error);
    }
  };

  return (
    <div className="AddJob">
      <h2 className="text-lg font-semibold mt-4 mb-4">Add New Job</h2>
      <form onSubmit={handleSubmit} className="AddJob flex flex-col gap-3">
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={jobData.companyName}
          onChange={handleInputChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="positionName"
          placeholder="Position"
          value={jobData.positionName}
          onChange={handleInputChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="applicationDate"
          placeholder="Application Date"
          value={jobData.applicationDate}
          onChange={handleInputChange}
          className="border p-2 rounded"
          required
        />
        {status === "loading" && <p className="text-blue-500">Saving job...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        <button type="submit">
          {status === "loading" ? "Saving..." : "Save Job"}
        </button>
      </form>
    </div>
  )
}

export default AddJob;