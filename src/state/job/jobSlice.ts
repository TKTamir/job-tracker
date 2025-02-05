import {JobItemProps} from "../../components/JobItem/Interfaces.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface JobState {
  jobs: JobItemProps[];
}

const initialState: JobState = {
  jobs: [],
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    addJob: (state, action: PayloadAction<JobItemProps>) => {
      state.jobs.push(action.payload);
    },
  },
});

export const {addJob} = jobSlice.actions;
export default jobSlice.reducer;