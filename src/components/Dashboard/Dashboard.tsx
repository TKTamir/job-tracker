import React from "react";
import JobsList from "../JobsList/JobsList.tsx";
import AddJob from "../AddJob/AddJob.tsx";

const Dashboard: React.FC = () => {

  return (
    <div className="Dashboard">
      <div className="justify-self-center">
        <h1 className="m-2 block">Dashboard</h1>
      </div>
      <div className="justify-self-center">
        <JobsList/>
      </div>
      <div className="justify-self-center">
        <AddJob/>
      </div>
    </div>
  )
}

export default Dashboard;
