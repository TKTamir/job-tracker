import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import JobsList from "../JobsList/JobsList.tsx";
import {fetchJobs} from "../../state/job/jobSlice.ts";
import {AppDispatch} from "../../state/store.ts";
import {useAuthUser} from "../../hooks/useAuthUser.ts";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useAuthUser();

  useEffect(() => {
    if (!user || !user.id) return
    dispatch(fetchJobs(user.id));
  }, [dispatch, user]);

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
