import React from "react";
import {JobItemProps} from "./Interfaces.ts";

const JobItem: React.FC<{ jobsList: JobItemProps }> = ({jobsList}) => {

  return (
    <div className="JobItem">
      <h3 className="m-2">{jobsList.companyName}</h3>
      <ul className="list-disc">
        <li>Position: {jobsList.positionName}</li>
        <li>Application Date: {jobsList.applicationDate}</li>
        <li>Status: {jobsList.status}</li>
        <li>Progression: {jobsList.progression}</li>
        <li>Requested Salary: {jobsList.requestedSalary}</li>
        <li>
          Website:
          <a
            href={jobsList.companyWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >{jobsList.companyWebsite}</a>
        </li>
        <li>
          Job Ad:
          <a
            href={jobsList.jobAd}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >View Ad</a>
        </li>
      </ul>
    </div>
  )
}

export default JobItem;
