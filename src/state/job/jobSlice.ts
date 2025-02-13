import {IJobItem} from "../../components/JobItem/Interfaces.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createJobAPI, deleteJobAPI, getJobsAPI, updateJobAPI} from "../../services/api.ts";

interface JobState {
  jobsList: IJobItem[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: JobState = {
  jobsList: [],
  status: "idle",
  error: null,
};

export const fetchJobs = createAsyncThunk(
  "job/fetchJobs",
  async (_, {rejectWithValue}) => {
    try {
      return await getJobsAPI();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        console.log('Unknown error: ', error);
      }
    }
  }
);

export const addJob = createAsyncThunk(
  "job/addJob",
  async (jobData: Partial<IJobItem>, {rejectWithValue}) => {
    try {
      return await createJobAPI(jobData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        console.log('Unknown error: ', error);
      }
    }
  }
);


export const updateJob = createAsyncThunk(
  "job/updateJob",
  async (jobData: Partial<IJobItem>, {rejectWithValue}) => {
    try {
      return await updateJobAPI(jobData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        console.log('Unknown error: ', error);
      }
    }
  }
);

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (id: number, {rejectWithValue}) => {
    try {
      return await deleteJobAPI(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        console.log('Unknown error: ', error);
      }
    }
  }
);

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action: PayloadAction<IJobItem[]>) => {
        state.status = "idle";
        state.jobsList = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as unknown as string;
      })
      .addCase(addJob.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addJob.fulfilled, (state, action: PayloadAction<IJobItem>) => {
        state.status = "idle";
        state.jobsList.push(action.payload)
      })
      .addCase(addJob.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as unknown as string;
      })
      .addCase(updateJob.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateJob.fulfilled, (state, action: PayloadAction<IJobItem>) => {
        state.status = "idle";
        const index = state.jobsList.findIndex((job) => job.id === action.payload.id);
        if (index !== -1) {
          state.jobsList[index] = action.payload;
        }
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as unknown as string;
      })
      .addCase(deleteJob.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteJob.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = "idle";
        state.jobsList = state.jobsList.filter((job) => job.id !== action.payload);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as unknown as string;
      });
  }
});

export default jobSlice.reducer;