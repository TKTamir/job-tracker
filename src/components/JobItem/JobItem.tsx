import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {highlightText} from "../../utils/text/highlightText.tsx";
import {useUpdateJobMutation} from "../../state/api/jobsApi.ts";
import {openModal} from "../../state/modal/modalSlice.ts";
import {AppDispatch} from "../../state/store.ts";
import {IJobItem, JobItemProps} from "./Interfaces.ts";


const JobItem: React.FC<JobItemProps> = ({job, searchQuery, mode = "view"}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [updateJob, {isLoading}] = useUpdateJobMutation();
  const [editedJob, setEditedJob] = useState<Partial<IJobItem>>(job);

  const isEditing = mode === "edit";
  const isViewing = mode === "view";

  const fields = [
    {name: "companyName", label: "Company Name"},
    {name: "positionName", label: "Position"},
    {name: "applicationDate", label: "Application Date"},
    {name: "status", label: "Status"},
    {name: "progression", label: "Progression"},
    {name: "requestedSalary", label: "Requested Salary"},
    {name: "companyWebsite", label: "Company Website", isLink: true},
    {name: "generalInfo", label: "General Info"},
    {name: "jobAd", label: "Job Ad", isLink: true, linkText: "View Ad"},
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    if (!name || !value) return;
    setEditedJob((prev: Partial<IJobItem>) => ({...prev, [name]: value}));
  };

  const handleSave = () => {
    if (!editedJob) return;
    updateJob(editedJob);
  };

  const handleDelete = () => {
    if (!job.id) return;
    dispatch(openModal({modalType: "CONFIRM_ALERT", modalProps: job}));
  };


  return (
    <div className="JobItem p-4 border border-gray-300 rounded-md shadow-md mb-4" key={job.id}>
      {isEditing && (
        <>
          {fields.map((field) => (
            <div className="mb-2" key={field.name}>
              <label className="block font-semibold">{field.label}: </label>
              <input
                type="text"
                name={field.name}
                value={editedJob[field.name as keyof IJobItem] as string || ""}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>
          ))}
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white p-2 rounded mt-2"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </>
      )}
      {isViewing && (
        <>
          <h3 className="m-2 text-xl font-bold">
            {highlightText(editedJob.companyName as string, searchQuery)}
          </h3>
          <ul className="list-disc pl-5">
            {fields.map((field) => (
              <li key={field.name}>
                {field.label}:{" "}
                {field.isLink ? (
                  <a
                    href={editedJob[field.name as keyof IJobItem] as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-800 focus:outline-none"
                  >
                    {field.linkText}
                  </a>
                ) : (
                  highlightText(
                    editedJob[field.name as keyof IJobItem] as string,
                    searchQuery
                  )
                )}
              </li>
            ))}
          </ul>
          <div className="flex justify-between">
            <button
              onClick={() => {
                setEditedJob(job);
              }}
              className="bg-blue-600 text-white p-2 rounded mt-2"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white p-2 rounded mt-2"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};


export default JobItem;
