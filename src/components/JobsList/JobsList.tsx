import React from "react";
import JobItem from "../JobItem/JobItem.tsx";
import {RootState} from "../../state/store.ts";
import {useSelector} from "react-redux";

const JobsList: React.FC = () => {
  const {jobsList, status, error} = useSelector((state: RootState) => state.jobs);

  const searchQuery = useSelector((state: RootState) => state.search.query);

  const filteredJobs = jobsList.filter(job => job?.companyName?.toLowerCase().includes(searchQuery?.toLowerCase()));

  return (
    <div className="JobsList">
      <h2 className="m-2">JobList</h2>
      {status === "loading" && <p>Loading jobs...</p>}
      {error && <p>Error: {error}</p>}
      {filteredJobs.length === 0 ? (
        <p className="text-gray-500">No jobs found.</p>
      ) : (
        filteredJobs.map((job) => (
          <JobItem key={job.id} job={job}/>
        ))
      )}
    </div>
  )
}

export default JobsList;
