import React from "react";
import JobItem from "../JobItem/JobItem.tsx";
import {JobItemProps} from "../JobItem/Interfaces.ts";
import {RootState} from "../../state/store.ts";
import {useSelector} from "react-redux";

const JobsList: React.FC = () => {
  const jobs: JobItemProps[] = useSelector((state: RootState) => state.jobs.jobsList);


  return (
    <div className="JobsList">
      <h2 className="m-2">JobList</h2>
      {jobs.map((job, index) => (
        <JobItem key={index} jobsList={job}/>
      ))}
    </div>
  )
}

export default JobsList;
