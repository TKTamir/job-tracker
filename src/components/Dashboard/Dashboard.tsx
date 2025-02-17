import React, {useEffect} from "react";
import JobsList from "../JobsList/JobsList.tsx";
import {fetchJobs} from "../../state/job/jobSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../state/store.ts";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <div className="Dashboard">
      <div className="justify-self-center">
        <h1 className="m-2 block">Dashboard</h1>
      </div>
      <div className="justify-self-center">
        <JobsList/>
      </div>
    </div>
  )
}

export default Dashboard;
