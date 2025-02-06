import React from "react";
import JobItem from "../JobItem/JobItem.tsx";
import {IJobItem} from "../JobItem/Interfaces.ts";
import {RootState} from "../../state/store.ts";
import {useSelector} from "react-redux";

const JobsList: React.FC = () => {
  const jobs: IJobItem[] = useSelector(
    (state: RootState) => state.jobs.jobsList
  );
  const searchQuery = useSelector((state: RootState) => state.search.query);

  const filteredJobs = jobs.filter(job => job.companyName.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="JobsList">
      <h2 className="m-2">JobList</h2>
      {filteredJobs.length === 0 ? (
        <p className="text-gray-500">No jobs found.</p>
      ) : (
        filteredJobs.map((job, index) => (
          <JobItem key={index} job={job} index={index}/>
        ))
      )}
    </div>
  )
}

export default JobsList;
