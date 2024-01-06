import axios from "axios";
import e from "cors";
import { getToken } from "./authService";
import { getToast } from "./utils";

const instance = axios.create();

const token = getToken();

instance.defaults.headers.common["Authorization"] = `Token ${token}`;
const API_URL = process.env.REACT_APP_API_URL;

const getTasks = async () => {
  try {
    const response = await instance.get(`${API_URL}/tasks/`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      let errors = error.response.data;
      getToast(Object.values(errors)[0], (error = true)).showToast();
    } else {
      getToast("Our servers are down!", (error = true)).showToast();
    }
  }
};

const getFilteredTasks = async (data) => {
  try {
    const response = await instance.get(`${API_URL}/tasks/search/`, {
      params: data,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      let errors = error.response.data;
      getToast(Object.values(errors)[0], (error = true)).showToast();
    } else {
      getToast("Our servers are down!", (error = true)).showToast();
    }
  }
};

const createTask = async (data) => {
  try {
    const response = await instance.post(`${API_URL}/tasks/`, data);
    getToast("Task created successfully").showToast();
    return response.data;
  } catch (error) {
    let errors = error.response.data;
    getToast(Object.values(errors)[0], (error = true)).showToast();
  }
};

const updateTask = async (taskId) => {
  try {
    const response = await instance.put(`${API_URL}/tasks/${taskId}/`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      let errors = error.response.data;
      getToast(Object.values(errors)[0], (error = true)).showToast();
    } else {
      getToast("Our servers are down!", (error = true)).showToast();
    }
  }
};

const deleteTask = async (taskId) => {
  try {
    const response = await instance.delete(`${API_URL}/tasks/${taskId}/`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      let errors = error.response.data;
      getToast(Object.values(errors)[0], (error = true)).showToast();
    } else {
      getToast("Our servers are down!", (error = true)).showToast();
    }
  }
};

const getAllTasks = async () => {
  try {
    const response = await instance.get(`${API_URL}/tasks`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      let errors = error.response.data;
      getToast(Object.values(errors)[0], (error = true)).showToast();
    } else {
      getToast("Our servers are down!", (error = true)).showToast();
    }
  }
};

const clockIn = async (taskId, timeStarted) => {
  try {
    const response = await instance.post(
      `${API_URL}/tasks/${taskId}/clock_in/`,
      { clock_in_time: timeStarted.toISOString() }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      let errors = error.response.data;
      getToast(Object.values(errors)[0], (error = true)).showToast();
    } else {
      getToast("Our servers are down!", (error = true)).showToast();
    }
  }
};

const clockOut = async (taskId, timeStopped) => {
  try {
    const response = await instance.post(
      `${API_URL}/tasks/${taskId}/clock_out/`,
      { clock_out_time: timeStopped.toISOString() }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      let errors = error.response.data;
      getToast(Object.values(errors)[0], (error = true)).showToast();
    } else {
      getToast("Our servers are down!", (error = true)).showToast();
    }
  }
};

const incrementPriority = async (taskId) => {
  try {
    const response = await instance.post(
      `${API_URL}/tasks/${taskId}/increment_priority/`
    );
    return response.data.priority;
  } catch (error) {
    if (error.response && error.response.data) {
      getToast(error.response.data.message, (error = true)).showToast();
    } else {
      getToast("Our servers are down!", (error = true)).showToast();
    }
  }
};

const decrementPriority = async (taskId) => {
  try {
    const response = await instance.post(
      `${API_URL}/tasks/${taskId}/decrement_priority/`
    );
    return response.data.priority;
  } catch (error) {
    let errors = error.response.data;
    getToast(Object.values(errors)[0], (error = true)).showToast();
  }
};

const setTaskStatus = async (taskId, status) => {
  try {
    const response = await instance.post(
      `${API_URL}/tasks/${taskId}/set_status/`,
      { status: status }
    );
    return response.data;
  } catch (error) {
    let errors = error.response.data;
    getToast(Object.values(errors)[0], (error = true)).showToast();
  }
};

export {
  getTasks,
  getFilteredTasks,
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
  clockIn,
  clockOut,
  incrementPriority,
  decrementPriority,
  setTaskStatus,
};
