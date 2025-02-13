import React, {useEffect} from "react";
import JobItem from "../JobItem/JobItem.tsx";
import {AppDispatch, RootState} from "../../state/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {fetchJobs} from "../../state/job/jobSlice.ts";

const JobsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {jobsList, status, error} = useSelector((state: RootState) => state.jobs);

  const searchQuery = useSelector((state: RootState) => state.search.query);

  const filteredJobs = jobsList.filter(job => job?.companyName?.toLowerCase().includes(searchQuery?.toLowerCase()));

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <div className="JobsList">
      <h2 className="m-2">JobList</h2>
      {status === "loading" && <p>Loading jobs...</p>}
      {error && <p>Error: {error}</p>}
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
