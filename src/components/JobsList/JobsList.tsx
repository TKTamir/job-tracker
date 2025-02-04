import React from "react";
import JobItem from "../JobItem/JobItem.tsx";

const JobsList: React.FC = () => {
  const jobList = [{
    applicationDate: '01/02/2025',
    companyName: 'Apple',
    companyWebsite: 'https://apple.com',
    jobAd: 'https://www.linkedin.com/in/tamir-kahalany-6b9baa143/',
    positionName: 'Company Position',
    progression: '2nd Stage',
    requestedSalary: '25k',
    status: 'relevant',
  }, {
    applicationDate: '01/02/2025',
    companyName: 'Google',
    companyWebsite: 'https://google.com',
    jobAd: 'https://www.linkedin.com/in/tamir-kahalany-6b9baa143/',
    positionName: 'Company Position',
    progression: '1nd Stage',
    requestedSalary: '23k',
    status: 'irrelevant',
  }, {
    applicationDate: '01/02/2025',
    companyName: 'Meta',
    companyWebsite: 'https://meta.com',
    jobAd: 'https://www.linkedin.com/in/tamir-kahalany-6b9baa143/',
    positionName: 'Company Position',
    progression: '3nd Stage',
    requestedSalary: '26k',
    status: 'relevant',
  },
  ];

  return (
    <div className="JobsList">
      <h2 className="m-2">JobList</h2>
      {jobList.map((job, index) => (
        <JobItem key={index} jobList={job}/>
      ))}
    </div>
  )
}

export default JobsList;
