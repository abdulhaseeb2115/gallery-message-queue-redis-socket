import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:4000/jobs" });

/**
 * Backend requests
 */

export const createJob = async () => await api.post();
export const getJobs = async () => await api.get();
export const getJobById = async (id) => await api.get(`/${id}`);
