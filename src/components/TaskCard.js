import React, { useState, useEffect } from 'react';
import { decrementPriority, incrementPriority, deleteTask, setTaskStatus, clockIn, clockOut} from '../services/taskService';
import { formatTime } from '../services/utils';
import './styles.css'

const TaskCard = (data) => {
  let task = data.task;
  const { title, time_spent, priority, status, id, clock_in_time } = task;
  const [currentPriority, setCurrentPriority] = useState(priority);
  const [isRunning, setIsRunning] = useState(Boolean(clock_in_time));
  const [startTime, setStartTime] = useState(new Date(clock_in_time));
  const [elapsedTime, setElapsedTime] = useState(time_spent);

  let duration = 0;

  if (clock_in_time) {
    duration = time_spent + (new Date() - new Date(clock_in_time))/1000.0;
  }
  else {
    duration = time_spent;
  }
  const [currentDuration, setCurrentDuration] = useState(duration);

  const fetcher = data.fetcher;
  
  let status_decoder = {
    "TODO": "To Do",
    "IN_PROGRESS": "In Progress",
    "DONE": "Done"
  }

  const handleStartClick = async () => {
    setIsRunning(true);
    let data = await clockIn(id)
    let timeIn = new Date(data.clock_in_time);
    console.log(timeIn);
    setStartTime(timeIn);
    console.log(startTime);
    setElapsedTime(data.time_spent);
    return fetcher();
  };

  const handleStopClick = async () => {
    setIsRunning(false);
    let data = await clockOut(id)
    setStartTime(new Date(data.clock_in_time));
    setElapsedTime(data.time_spent);
    fetcher();
  };


  const handleArrowDownClick = async (e) => {
    setCurrentPriority(await decrementPriority(id));
    fetcher(); 
  };

  const handleArrowUpClick = async (e) => {
    setCurrentPriority(await incrementPriority(id));
    fetcher(); 
  };

  const handleDeleteTask = async (e) => {
    await deleteTask(id);
    fetcher();
  }

  const handleTaskDone = async (e) => {
    await setTaskStatus(id, "DONE");
    fetcher();
  }

  const handleTaskInProgress = async (e) => {
    await setTaskStatus(id, "IN_PROGRESS");
    fetcher();
  }
  
  const now = new Date();
  
  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        const now = new Date();
        setCurrentDuration(elapsedTime + (now - startTime)/1000.0);
        // console.log(elapsedTime, now , startTime);
      }, 100);
      return () => clearInterval(intervalId); 
    }
  }, [isRunning, startTime, currentDuration]);


  return (

        <div
          className="card"
          style={{
            marginTop: 30,
            marginRight: 30,
            minWidth: 397,
            maxWidth: 379,
            width: 397,
            borderWidth: 0,
            borderTopStyle: "none"
          }}
        >
          <div
            className="card-body text-center shadow"
            style={{
              background: isRunning ? "rgb(62, 219, 13)" : 
              (status!="DONE"?"rgb(238, 147, 34)": "rgb(182 183 201)"),
              width: "100%",
              minWidth: "100%",
              maxWidth: "100%",
              borderRadius: 11,
              borderTopStyle: "none"
            }}
          >
            <div
              className="d-inline-block"
              style={{ width: "100%", minWidth: "100%", maxWidth: "100%" }}
            >
              <div
                className="float-start"
                style={{ width: "80%", minWidth: "80%", maxWidth: "80%" }}
              >
                <h4 style={{ textAlign: "left", fontSize: 22, paddingLeft: 18 }}>
                  {title}
                </h4>
                <div>
                  <h6
                    className="text-start d-inline-block"
                    style={{ paddingRight: 33 }}
                  >
                    Time
                    <br />
                    Elapsed
                  </h6>
                  <div  className="d-inline-block" style={{minWidth:'155px', textAlign: 'left'}} >
                    <h1>{formatTime(currentDuration)}</h1>
                  </div>
                </div>
                <div
                  style={{ paddingRight: 0, paddingLeft: 25, textAlign: "left" }}
                >
                  <div className="d-inline-block" style={{ maxWidth: 99 }}>
                    <h6
                      className="text-start d-inline-block"
                      style={{
                        fontFamily: "Alatsi, sans-serif",
                        color: "rgb(119,18,18)",
                        minWidth: "78px"
                      }}
                    >
                      {status_decoder[status]}
                    </h6>
                  </div>
                  <div className="d-inline-block">
                    
                  <button
                    className="btn"
                    type="button"
                    style={{
                      background: "#186f65",
                      color: "#fce09b",
                      marginLeft: 39,
                      minWidth: 75,
                      fontSize: 15,
                      marginTop: 4,
                      borderRadius: 14
                    }}
                    onClick={isRunning ? handleStopClick : handleStartClick}
                    disabled={status === "DONE"}
                  >
                    {isRunning ? 'Stop' : 'Start'}
                  </button>

                    {status!="DONE" ? 
                    <svg
                      className="status-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 24 24"
                      width="1em"
                      fill="currentColor"
                      style={{
                        marginLeft: 16,
                        fontSize: 35,
                        cursor: 'pointer'
                      }}
                      onClick={handleTaskDone}
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                    </svg>
                    : 
                    <svg
                    className="status-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 24 24"
                    width="1em"
                    fill="currentColor"
                    style={{
                      marginLeft: 16,
                      fontSize: 35,
                      cursor: 'pointer'
                    }}
                    onClick={handleTaskInProgress}
                  >
                      <path d="M12,5V2L8,6l4,4V7c3.31,0,6,2.69,6,6c0,2.97-2.17,5.43-5,5.91v2.02c3.95-0.49,7-3.85,7-7.93C20,8.58,16.42,5,12,5z"></path>
                      <path d="M6,13c0-1.65,0.67-3.15,1.76-4.24L6.34,7.34C4.9,8.79,4,10.79,4,13c0,4.08,3.05,7.44,7,7.93v-2.02 C8.17,18.43,6,15.97,6,13z"></path>
                  </svg>
                    }

                    
                  </div>
                </div>
              </div>
              <div
                className="d-inline-block float-end"
                style={{
                  width: "20%",
                  minWidth: "20%",
                  maxWidth: "20%",
                  height: "100%",
                  minHeight: "100%",
                  maxHeight: "100%",
                  marginTop: 8
                }}
              >
                <h6 style={{ color: "#820300" }}>Priority</h6>
                <i
                  className="fa fa-arrow-up arrow"
                  style={{ fontSize: 20, maxHeight: 31, cursor: 'pointer' }}
                  onClick={handleArrowUpClick}
                />
                <h5 style={{ height: 17, marginTop: "-5px", marginBottom: "3px", fontWeight: "bold" }}>
                  {currentPriority}
                </h5>
                <i
                  className="fa fa-arrow-down arrow" 
                  style={{ fontSize: 20, cursor: 'pointer'  }} 
                  onClick={handleArrowDownClick}
                 />
              </div>
              <div
                className="d-inline-block float-end"
                style={{
                  width: "20%",
                  minWidth: "20%",
                  maxWidth: "20%",
                  height: "100%",
                  minHeight: "100%",
                  maxHeight: "100%",
                  marginTop: 8
                }}
              >
                <svg
                  className='trash'
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ fontSize: 20, cursor: 'pointer'}}
                  onClick={handleDeleteTask}
                
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z"
                    fill="currentColor"
                  />
                  <path d="M9 9H11V17H9V9Z" fill="currentColor" />
                  <path d="M13 9H15V17H13V9Z" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
        </div>
  );
};

export default TaskCard;
