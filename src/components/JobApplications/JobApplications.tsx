import React from "react";
import {useDispatch, useSelector} from "react-redux";
import JobItem from "../JobItem/JobItem.tsx";
import {useGetJobsQuery} from "../../state/api/jobsApi.ts";
import {AppDispatch, RootState} from "../../state/store.ts";
import {JobItemKeys} from "../JobItem/Interfaces.ts";
import {ModalTypes} from "../NavBar/Interfaces.ts";
import {openModal} from "../../state/modal/modalSlice.ts";

const JobApplications: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const searchQuery = useSelector((state: RootState) => state.search.query);
  const {data: jobs, isLoading, isError, error} = useGetJobsQuery(user?.id, {skip: !user?.id});
  if (!user) return;

  if (isError) {
    console.log(JSON.stringify(error))
    return <div>Error loading jobs: {error.toString()}</div>;
  }

  const searchableFields: JobItemKeys = [
    "applicationDate",
    "companyName",
    "companyWebsite",
    "generalInfo",
    "jobAd",
    "positionName",
    "progression",
    "requestedSalary",
    "status"
  ];

  const filteredJobs = jobs?.filter((job) => {
    if (!searchQuery) return true;

    const keywords = searchQuery.toLowerCase().split(" ").filter(Boolean);

    return keywords.every((keyword) =>
      searchableFields.some((field) => {
        const fieldValue = job[field];
        if (typeof fieldValue === 'string') {
          return fieldValue.toLowerCase().includes(keyword);
        }
        return false
      })
    );
  });

  const handleOpenModal = (modalType: ModalTypes) => {
    dispatch(openModal({modalType}));
  };

  if (!filteredJobs) return;

  return (
    <div className="JobsList flex flex-col items-center">
      <h2 className="m-2">Job Applications</h2>
      <button className="m-2 hover:underline cursor-pointer" onClick={() => handleOpenModal("ADD_JOB")}>Add New
        Application
      </button>
      {isLoading && <p>Loading jobs...</p>}
      {filteredJobs.length === 0 ? (
        <p className="text-gray-500">No jobs found.</p>
      ) : (
        filteredJobs.map((job) => (
          <JobItem key={job.id} job={job} searchQuery={searchQuery}/>
        ))
      )}
    </div>
  )
}

export default JobApplications;
