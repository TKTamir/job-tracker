import {UserData} from "../components/Register/Interfaces.ts";
import {LoginData} from "../components/Login/Interfaces.ts";
import {IJobItem} from "../components/JobItem/Interfaces.ts";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const registerUserAPI = async (userData: UserData) => {
  const response = await fetch(`${apiBaseUrl}/users/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error(response.statusText || "Failed to register user");
  }

  return response.json();
};

export const loginUserAPI = async (userData: LoginData) => {
  console.log(`${apiBaseUrl}/users/login`, 'api')
  const response = await fetch(`${apiBaseUrl}/users/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
};

export const logoutUserAPI = () => {
  localStorage.removeItem("token");
};

export const createJobAPI = async (jobData: Partial<IJobItem>) => {
  const response = await fetch(`${apiBaseUrl}/jobs`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(jobData),
  });

  if (!response.ok) {
    throw new Error(response.statusText || "Failed to add job");
  }
  const serverResponse = await response.json();
  return serverResponse.job || serverResponse;
};

export const getJobsAPI = async (userId: number) => {
  const response = await fetch(`${apiBaseUrl}/jobs?userId=${userId}`, {
    method: "GET",
    headers: {"Content-Type": "application/json"},
  });

  if (!response.ok) {
    throw new Error(response.statusText || "Failed to fetch jobs");
  }

  return response.json();
};

export const getJobByIdAPI = async (id: number) => {
  const response = await fetch(`${apiBaseUrl}/jobs/:${id}`, {
    method: "GET",
    headers: {"Content-Type": "application/json"},
  });

  if (!response.ok) {
    throw new Error(response.statusText || "Failed to fetch job");
  }

  return response.json();
};

export const updateJobAPI = async (jobData: Partial<IJobItem>) => {
  const response = await fetch(`${apiBaseUrl}/jobs/${jobData.id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(jobData),
  });

  if (!response.ok) {
    throw new Error(response.statusText || "Failed to update job");
  }

  const serverResponse = await response.json();
  return serverResponse.job || serverResponse;
};

export const deleteJobAPI = async (id: number) => {
  const response = await fetch(`${apiBaseUrl}/jobs/${id}`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"},
  });

  if (!response.ok) {
    throw new Error(response.statusText || "Failed to delete job");
  }

  return response.json();
};

