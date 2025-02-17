import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../state/store.ts";
import {updateJob} from "../../state/job/jobSlice";
import {IJobItem, JobItemProps} from "./Interfaces.ts";
import {openModal} from "../../state/modal/modalSlice.ts";


const JobItem: React.FC<JobItemProps> = ({job}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedJob, setEditedJob] = useState<Partial<IJobItem>>(job);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

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
    dispatch(updateJob(editedJob));
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (!job.id) return;
    dispatch(openModal({modalType: "CONFIRM_ALERT", modalProps: job.id}));
    setIsDeleted(true);
  };

  if (isDeleted) return null;

  return (
    <div className="JobItem p-4 border border-gray-300 rounded-md shadow-md mb-4" key={job.id}>
      {isEditing ? (
        <>
          {fields.map((field) => (
            <div className="mb-2" key={field.name}>
              <label className="block font-semibold">{field.label}: </label>
              <input
                type="text"
                name={field.name}
                value={editedJob[field.name as keyof IJobItem] as string}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>
          ))}
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white p-2 rounded mt-2"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <h3 className="m-2 text-xl font-bold">{editedJob?.companyName}</h3>
          <ul className="list-disc pl-5">
            {fields.map((field) => (
              <li key={field.name}>
                {field.label}: {" "}
                {field.isLink ? (
                  <a
                    href={editedJob[field.name as keyof IJobItem] as string}
                    target="_blank"
                    rel="nopener noreferrer"
                    className="text-blue-500 hover:text-blue-800 focus:outline-none"
                  >
                    {field.linkText}
                  </a>
                ) : (
                  editedJob[field.name as keyof IJobItem]
                )}
              </li>
            ))}
          </ul>
          <div className="flex justify-between">
            <button
              onClick={() => {
                setIsEditing(true);
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
