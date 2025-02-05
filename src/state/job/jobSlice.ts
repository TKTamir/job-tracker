import {IJobItem} from "../../components/JobItem/Interfaces.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface JobState {
  jobsList: IJobItem[];
}

const initialState: JobState = {
  jobsList: [],
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    // TODO: convert to an sync thunk that calls an API when backend is built
    addJob: (state, action: PayloadAction<IJobItem>) => {
      state.jobsList.push(action.payload);
    },
    updateJob: (
      state,
      action: PayloadAction<{ index: number, updatedJob: IJobItem }>
    ) => {
      state.jobsList[action.payload.index] = action.payload.updatedJob;
    }
  },
});

export const {addJob, updateJob} = jobSlice.actions;
export default jobSlice.reducer;