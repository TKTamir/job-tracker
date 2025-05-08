import React from "react";
import {useSelector} from "react-redux";
import {useGetJobsQuery} from "../../state/api/jobsApi.ts";
import {RootState} from "../../state/store.ts";
import {IJobItem} from "../JobItem/Interfaces.ts";

const JobApplications: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const {data: jobs, isLoading, isError, error} = useGetJobsQuery(user?.id, {skip: !user?.id});

  if (!user) return;

  const fields = [
    {name: "companyName", label: "Company Name"},
    {name: "positionName", label: "Position"},
    {name: "applicationDate", label: "Application Date"},
    {name: "status", label: "Status"},
  ];

  if (isError) {
    console.log(JSON.stringify(error))
    return <div>Error loading jobs: {error.toString()}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="JobApplications p-4">
      <div className="grid grid-cols-5 gap-4 font-semibold mb-2">
        {fields.map((field) => (
          <div key={`header-${field.name}`}>{field.label}</div>
        ))}
        <div>Actions</div>
      </div>
      {jobs?.map((job: IJobItem) => (
        <div key={job.id} className="grid grid-cols-5 gap-4 items-center border-gray-200 border-b py-2">
          {fields.map((field) => (
            <div key={`${job.id}-${field.name}`}>
              {job[field.name as keyof IJobItem] || "N/A"}
            </div>
          ))}
          <div className="flex gap-2">
            <button className="text-blue-600 hover:underline cursor-pointer">Edit</button>
            <button className="text-blue-600 hover:underline cursor-pointer">Details</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default JobApplications;
