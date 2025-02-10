import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../state/store.ts";
import {updateJob} from "../../state/job/jobSlice";
import {IJobItem, JobItemProps} from "./Interfaces.ts";


const JobItem: React.FC<JobItemProps> = ({job, index}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedJob, setEditedJob] = useState<IJobItem>(job)

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
    setEditedJob((prev: IJobItem) => ({...prev, [name]: value}));
  };

  const handleSave = () => {
    dispatch(updateJob({index, updatedJob: editedJob}));
    setIsEditing(false);
  };


  return (
    <div className="JobItem p-4 border border-gray-300 rounded-md shadow-md mb-4">
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
          <h3 className="m-2 text-xl font-bold">{job.companyName}</h3>
          <ul className="list-disc pl-5">
            {fields.map((field) => (
              <li key={field.name}>
                {field.label}: {" "}
                {field.isLink ? (
                  <a
                    href={job[field.name as keyof IJobItem] as string}
                    target="_blank"
                    rel="nopener noreferrer"
                    className="text-blue-500 hover:text-blue-800 focus:outline-none"
                  >
                    {field.linkText
                      ? field.linkText
                      : (job[field.name as keyof IJobItem] as string)}
                  </a>
                ) : (
                  job[field.name as keyof IJobItem]
                )}
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              setIsEditing(true);
              setEditedJob(job);
            }}
            className="bg-blue-600 text-white p-2 rounded mt-2"
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default JobItem;
