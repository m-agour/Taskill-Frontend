import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Header from '../components/Header'
import "bootstrap/dist/css/bootstrap.min.css";
import TaskCard from '../components/TaskCard';
import { filterTasks } from '../services/taskService';
import { getUserData } from '../services/authService';

const DashboardPage = () => {
  const history = useHistory();

  const user_name = getUserData().first_name;

  const [tasksData, setTasksData] = useState([]);

  const [filters, setFilters] = useState({
    title: '',
    toDo: true,
    inProgress: true,
    done: false,
    sortBy: 'title',
    order: 'desc',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: newValue,
    }));
  };

  // Define handleChange for the select element
  const handleSortBySelectChange = (e) => {
    const { name, value } = e.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Define handleChange for the select element
  const handleOrderSelectChange = (e) => {
    const { name, value } = e.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };


  const fetchFilteredTasks = async () => {
    const data = await filterTasks({
      title: filters.title,
      sort_param: filters.sortBy,
      todo: filters.toDo,
      in_progress: filters.inProgress,
      done: filters.done,
      mode: filters.order,
    });
    if (!data) return;
    setTasksData([]);
    setTasksData(data);
  };

  useEffect(() => {
    fetchFilteredTasks();
  }, [filters]);


  const handleButtonClick = () => {
    history.push('/register');
  };

  return (
    <>
    <meta charSet="utf-8" />
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
    />
    <title>Untitled</title>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css" />
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
    />
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Noto+Sans&display=swap"
    />
    <link rel="stylesheet" href="assets/fonts/font-awesome.min.css" />
    <link rel="stylesheet" href="assets/css/animate.min.css" />
    <Header title="Taskill"/>
    <div
    className="d-xxl-flex justify-content-xxl-center"
    style={{ marginTop: 55, marginBottom: 6 }}
  >
    <h4 style={{ textAlign: "center", marginBottom: "-9px" }}>
      Ready for destroying some Tasks, {user_name}!
    </h4>
  </div>
  <div
    className="d-flex justify-content-center"
    style={{ marginTop: 55, marginBottom: "-37px" }}
  >
    <div>
      <h4 className="d-inline-block" style={{ marginRight: 16 }}>
        Search Tasks
      </h4>
      <input
        className="d-inline-block"
        type="search"
        style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: 19 }}
        value={filters.title}
        onChange={handleInputChange}
        name="title"
      />
    </div>
  </div>
  <div
    className="d-flex justify-content-center"
    style={{ marginTop: 55, marginBottom: 23 }}
  >
    <div className="form-check" style={{ paddingRight: 22 }}>
    <input
        id="formCheck-1"
        className="form-check-input"
        type="checkbox"
        checked={filters.toDo}
        onChange={handleInputChange}
        name="toDo"
      />      <label className="form-check-label" htmlFor="formCheck-1">
        ToDo
      </label>
    </div>
    <div className="form-check" style={{ paddingRight: 22 }}>
    <input
        id="formCheck-3"
        className="form-check-input"
        type="checkbox"
        checked={filters.inProgress}
        onChange={handleInputChange}
        name="inProgress"
      />      <label className="form-check-label" htmlFor="formCheck-3">
        In Progress
      </label>
    </div>
    <div className="form-check" style={{ paddingRight: 22 }}>
    <input
        id="formCheck-2"
        className="form-check-input"
        type="checkbox"
        checked={filters.done}
        onChange={handleInputChange}
        name="done"
      />      
      <label className="form-check-label" htmlFor="formCheck-2">
        Done
      </label>
    </div>
    <label className="form-label" style={{ marginRight: 7, maxHeight: 14 }}>
      Sort By
    </label>
    <select
        value={filters.sortBy}
        onChange={handleSortBySelectChange}
        name="sortBy"
      >
    <option value="title" selected="">title</option>
      <option value="status">status</option>
      <option value="time_spent">time_spent</option>
      <option value="updated">date updated</option>
      <option value="created">date created</option>
      <option value="priority">priority</option>
    </select>

    <label className="form-label" style={{ marginLeft: 15, marginRight: 7, maxHeight: 14 }}>
      Order
    </label>
    <select
        value={filters.order}
        onChange={handleOrderSelectChange}
        name="order"
      >
    <option value="desc" selected="">descending</option>
    <option value="asc">ascending</option>
    </select>
  </div>
  <div className="container">
  <div
  className="card-group card-group d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center"
  style={{ textAlign: "center", maxWidth: '1281px'    }}
>
  {tasksData.length === 0 ? (
    <div style={{textAlign: "center", width: '100%'}}>
        <h3 style={{marginTop: 70}}>No tasks to show</h3>
    </div>
  ) : (
    tasksData.map((task) => (
      <TaskCard task={task} key={task.id} fetcher={fetchFilteredTasks} />
    ))
  )}
</div>

    </div>
</>
  );
};

export default DashboardPage;