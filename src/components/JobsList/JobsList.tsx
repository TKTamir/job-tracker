import React from "react";
import {useSelector} from "react-redux";
import JobItem from "../JobItem/JobItem.tsx";
import {useAuthUser} from "../../hooks/useAuthUser.ts";
import {useGetJobsQuery} from "../../state/api/jobsApi.ts";
import {RootState} from "../../state/store.ts";
import {JobItemKeys} from "../JobItem/Interfaces.ts";

const JobsList: React.FC = () => {
  const user = useAuthUser();
  const searchQuery = useSelector((state: RootState) => state.search.query);
  const {data: jobs, isLoading, isError, error} = useGetJobsQuery(user?.id, {skip: !user?.id});
  if (!user) return;

  if (isError) {
    console.log(JSON.stringify(error))
    return <div>Error loading jobs: {error.toString()}</div>;
  }

  const searchableFields: JobItemKeys = [
    "applicationDate",
    "companyName",
    "companyWebsite",
    "generalInfo",
    "jobAd",
    "positionName",
    "progression",
    "requestedSalary",
    "status"
  ];

  const filteredJobs = jobs?.filter((job) => {
    if (!searchQuery) return true;

    const keywords = searchQuery.toLowerCase().split(" ").filter(Boolean);

    return keywords.every((keyword) =>
      searchableFields.some((field) => {
        const fieldValue = job[field];
        if (typeof fieldValue === 'string') {
          return fieldValue.toLowerCase().includes(keyword);
        }
        return false
      })
    );
  });

  if (!filteredJobs) return;

  return (
    <div className="JobsList">
      <h2 className="m-2">JobList</h2>
      {isLoading && <p>Loading jobs...</p>}
      {filteredJobs.length === 0 ? (
        <p className="text-gray-500">No jobs found.</p>
      ) : (
        filteredJobs.map((job) => (
          <JobItem key={job.id} job={job} searchQuery={searchQuery}/>
        ))
      )}
    </div>
  )
}

export default JobsList;
