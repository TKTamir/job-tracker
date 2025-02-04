import {JobItemProps} from "./Interfaces.ts";

function JobItem({jobList}: JobItemProps) {

  return (
    <div className="JobItem">
      <h3 className="m-2">{jobList.companyName}</h3>
      <ul className="list-disc">
        <li>Position: {jobList.positionName}</li>
        <li>Application Date: {jobList.applicationDate}</li>
        <li>Status: {jobList.status}</li>
        <li>Progression: {jobList.progression}</li>
        <li>Requested Salary: {jobList.requestedSalary}</li>
        <li>
          Website:
          <a
            href={jobList.companyWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >{jobList.companyWebsite}</a>
        </li>
        <li>
          Job Ad:
          <a
            href={jobList.jobAd}
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
