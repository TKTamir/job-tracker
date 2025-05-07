import React from "react";
import {useSelector} from "react-redux";
import {useGetJobsQuery} from "../../state/api/jobsApi.ts";
import {RootState} from "../../state/store.ts";

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
    <div className="JobApplications">

    </div>
  )
}

export default JobApplications;
