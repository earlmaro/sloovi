import React, { useEffect, useState } from 'react';
import {
  AddTask, ListTask
} from '../components/pages';
import { useDispatch, useSelector } from '../redux/store';
import { createTask, updateTask, deleteTask, assignedUsers, login, getTasks } from '../redux/slices/user';
import { convertHMS } from '../utils/convertTime';




export default function Sloovi({ }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState();
  const [taskOwner, setAssignedUserTaskOwner] = useState();
  const [date, setDate] = useState();
  const [value, handleTimeChange] = useState('5:30');
  const { authenticatedUser, assignedUsersList, isLoading, taskList } = useSelector((state) => state.user);
  const [getAssigned, setGetAssignedUsers] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [showList, setShowList] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [currentTask, setCurrentTask] = useState();
  
  if (authenticatedUser?.company_id && getAssigned) {
    // window.localStorage.setItem('accessTokenn', authenticatedUser.token);
    setGetAssignedUsers(false);
    dispatch(assignedUsers(authenticatedUser.company_id));
    dispatch(getTasks(authenticatedUser.company_id));
    
  }
  
  // const handleTaskEdit = async (event) => {
  //   const task = taskList.find((task) => task.id === parseInt(event, 10));
  //   setCurrentTask(task);
  // }


  const handleTitleChange = async (event) => {
    setTitle(event.target.value);
  }
  const handleAssingedUser = async (event) => {
    console.log(event.target.value);
    setAssignedUserTaskOwner(event.target.value);
  }

  const handleEdit = async (event) => {
    const task = taskList.find((task) => task.id === event);
    setTitle(task.task_msg);
    handleTimeChange(convertHMS(task.task_time));
    setDate(task.task_date);
    setAssignedUserTaskOwner(task.assigned_user);

    setCurrentTask(task);
    setShowList(false);
    setShowEdit(true);
    setEditStatus(true);

  }

  const handleDateChange = async (event) => {
    console.log(event.target.value);
    setDate(event.target.value);
  }
  const handleCancel = async (event) => {
    setShowList(true);
    setShowEdit(false);
  }

  const handleAdd = async (event) => {
    
    if (showList) {
      setShowEdit(true);
      setShowList(false);
    }
    if (showEdit) {
      setShowEdit(false);
      setShowList(true);
    }
    setEditStatus(false);

    
  }

  // const handleTimeChange = async (event) => {
  //   console.log(event.target.value);

  //   setTime(event.target.value);
  // }


  const handleCreate = async (event) => {
    var hms = value;   // your input string
    console.log(value);
    var a = hms.split(':'); // split it at the colons
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60;

    console.log(seconds);
    let body = {
      assigned_user: taskOwner,
      task_date: date,
      task_time: seconds,
      is_completed: 0,
      time_zone: parseInt(seconds, 10),
      task_msg: title
    }
    console.log(body)
    try {
      dispatch(createTask(body, authenticatedUser.company_id));
      dispatch(getTasks(authenticatedUser.company_id));
      setShowEdit(false);
      setShowList(true);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDelete = async (event) => {
    try {
      dispatch(deleteTask(event, authenticatedUser.company_id));
      dispatch(getTasks(authenticatedUser.company_id));
      setShowList(true);
      setShowEdit(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (event) => {
    var hms = value;   // your input string
    console.log(value);
    var a = hms.split(':'); // split it at the colons
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60;

    console.log(seconds);
    let body = {
      assigned_user: taskOwner,
      task_date: date,
      task_time: parseInt(seconds, 10),
      is_completed: 0,
      time_zone: parseInt(seconds, 10),
      task_msg: title
    }
    console.log(body)
    try {
      dispatch(updateTask(event, authenticatedUser.company_id, body));
      setShowList(true);
      setShowEdit(false);
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(value);

  useEffect(() => {
    dispatch(login('smithwills1989@gmail.com', '12345678'));
    setGetAssignedUsers(true);
  }, [dispatch]);

  return (
    <React.Fragment >
      <div class="container">
        <div
          class='parent'
        >
          <div class="row ">
            <div class="col-11" style={{ borderBottom: "1px solid black" }}>
              Tasks {taskList.length}
            </div>
            <div class="col-1 text-center p-0" style={{ borderLeft: "1px solid black", borderBottom: "1px solid black" }}>
              
              {/* <button onClick={handleAdd} class="add_btn"> */}
                <i onClick={handleAdd} class="bi bi-plus-lg"></i>
              {/* </button> */}
            </div>
          </div>

          <div class="row" style={{ padding: "20px" }}>
            {showList && (
              <>
              {taskList.map((task) => (
                <ListTask task={task} handleEdit={handleEdit} />
              ))}
              </>
            )}

            {showEdit && (
            <AddTask
              onAddTask={handleCreate}
              changeTitle={handleTitleChange}
              changeDate={handleDateChange}
              changeTime={handleTimeChange}
              assignedOwner={handleAssingedUser}
              assignedUsersList={assignedUsersList}
              isEdit={editStatus}
              currentTask={currentTask}
              onUpTask={handleUpdate}
                handleCancel={handleCancel}
                handleDelete={handleDelete}
                taskOwner={taskOwner}
            />
            )}
            

          </div>
        </div>
      </div>

    </React.Fragment>
  );
}
