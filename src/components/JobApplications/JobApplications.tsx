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
      <div
        className="grid grid-cols-4 gap-4 text-left items-start"
      >
        {fields.map((field) => (
          <div key={`header-${field.name}`} className="font-semibold">
            {field.label}
          </div>
        ))}
        {jobs?.map((job: IJobItem) =>
          fields.map((field) => (
            <div key={`${job.id}-${field.name}`}>
              {job[field.name as keyof IJobItem] || "N/A"}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default JobApplications;
