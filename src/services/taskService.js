import axios from 'axios';
import e from 'cors';
import { getToken } from './authService';
import { getToast } from './utils';


const instance = axios.create();

const token = getToken();

instance.defaults.headers.common['Authorization'] = `Token ${token}` 
const API_URL = process.env.REACT_APP_API_URL;


const filterTasks = async (data) => {
    // get token if it exists
  try {
    const response = await instance.get(`${API_URL}/tasks/search/`, {
      params: data,
    });
    return response.data;
  } catch (error) {
    getToast(error.response.data.message, error=true).showToast();
    // Handle error
  }
};


const updateTask = async (taskId) => {
    try {
      const response = await instance.put(`${API_URL}/tasks/${taskId}/`);
      console.log(response.data);
      // Handle response data as needed
    } catch (error) {
        getToast(error.response.data.message, error=true).showToast();
        // Handle error
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await instance.delete(`${API_URL}/tasks/${taskId}/`);
      console.log(response.data);
      // Handle response data as needed
    } catch (error) {
        getToast(error.response.data.message, error=true).showToast();
        // Handle error
    }
  };
  
  const getAllTasks = async () => {
    try {
      const response = await instance.get(`${API_URL}/tasks`);
      console.log(response.data);
      // Handle response data as needed
    } catch (error) {
        getToast(error.response.data.message, error=true).showToast();
        // Handle error
    }
  };

  const clockIn = async (taskId) => {
    try {
      const response = await instance.post(`${API_URL}/tasks/${taskId}/clock_in/`);
      return response.data;
      // Handle response data as needed
    } catch (error) {
        getToast(error.response.data.message, error=true).showToast();
        // Handle error
    }
  };
  
  const clockOut = async (taskId) => {
    try {
        const response = await instance.post(`${API_URL}/tasks/${taskId}/clock_out/`);
        return response.data;
      // Handle response data as needed
    } catch (error) {
        getToast(error.response.data.message, error=true).showToast();
        // Handle error
    }
  };

  const incrementPriority = async (taskId) => {
    try {
      const response = await instance.post(`${API_URL}/tasks/${taskId}/increment_priority/`);
      return response.data.priority;
      // Handle response data as needed
    } catch (error) {
      getToast(error.response.data.message, error=true).showToast();
      // Handle error
    }
  }

  const decrementPriority = async (taskId) => {
    try {
      const response = await instance.post(`${API_URL}/tasks/${taskId}/decrement_priority/`);
      return response.data.priority;
      // Handle response data as needed
    } catch (error) {
        getToast('Error decreasing priority', error=true).showToast();
      // Handle error
    }
  }

  const setTaskStatus = async (taskId, status) => {
    try {
      const response = await instance.post(`${API_URL}/tasks/${taskId}/set_status/`, {status: status});
      return response.data;
      // Handle response data as needed
    } catch (error) {
        getToast('Error setting status', error=true).showToast();
      // Handle error
    }
  }

  
  export { filterTasks, updateTask, deleteTask, getAllTasks, clockIn, clockOut, 
    incrementPriority, decrementPriority, setTaskStatus};