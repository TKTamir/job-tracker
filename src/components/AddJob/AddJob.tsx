import React, {useState} from "react";
import {IJobItem} from "../JobItem/Interfaces.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../state/store.ts";
import {addJob} from "../../state/job/jobSlice.ts";


const AddJob: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [jobData, setJobData] = useState<IJobItem>({
    applicationDate: "",
    companyName: "",
    companyWebsite: "",
    jobAd: "",
    positionName: "",
    progression: "",
    requestedSalary: "",
    status: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobData.companyName || !jobData.positionName) {
      alert("Company Name and Position are required.");
      return;
    }
    console.log(jobData);
    dispatch(addJob(jobData));

    setJobData({
      applicationDate: "",
      companyName: "",
      companyWebsite: "",
      jobAd: "",
      positionName: "",
      progression: "",
      requestedSalary: "",
      status: "",
    });
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
        <button type="submit">Save Job</button>
      </form>
    </div>
  )
}

export default AddJob;