import {JobItemProps} from "../../components/JobItem/Interfaces.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface JobState {
  jobs: JobItemProps[];
  currentJob: JobItemProps;
}

const initialState: JobState = {
  jobs: [],
  currentJob: {
    applicationDate: "",
    companyName: "",
    companyWebsite: "",
    jobAd: "",
    positionName: "",
    progression: "",
    requestedSalary: "",
    status: "",
  },
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    // TODO: convert to an sync thunk that calls an API when backend is built
    addJob: (state, action: PayloadAction<JobItemProps>) => {
      state.jobs.push(action.payload);
    },
  },
});

export const {addJob} = jobSlice.actions;
export default jobSlice.reducer;