import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
import { setSession } from '../../utils/jwt';



// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  myProfile: null,
  users: [],
  userList: [],
  authenticatedUser: {},
  assignedUsersList: [],
  taskList: []
};


const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },


    // GET USERS
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.authenticatedUser = action.payload;
    },
    assignedUsersListSuccess(state, action) {
      state.isLoading = false;
      state.assignedUsersList = action.payload;
    },
    getTaskListSuccess(state, action) {
      state.isLoading = false;
      state.taskList = action.payload;
    },

    // DELETE USERS
    deleteSuccess(state, action) {
      console.log(action.payload.task_id)
      const deleteTask = filter(state.taskList, (task) => task.id !== action.payload.task_id);
      console.log(deleteTask)
      state.taskList = deleteTask;
    },

    createTaskSuccess(state, action) {
      const newEvent = action.payload;
      state.isLoading = false;
      state.taskList = [...state.taskList, newEvent];
    },

    // GET MANAGE Tasks
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { deleteUser } = slice.actions;

// ----------------------------------------------------------------------
export function login(email, password) {
  let body ={
    email: email,
    password : password
  }
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    // setSession(null);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, body);
      console.log(response.data.results.token);
      setSession(response.data.results.token);
      // window.localStorage.setItem('accessTokenn', response.data.results.token);
      dispatch(slice.actions.loginSuccess(response.data.results));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


export function createTask(body, company_id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    
    console.log(company_id);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${company_id}`, body);
      console.log(response.data.results);
      dispatch(slice.actions.createTaskSuccess(response.data.results));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getTasks(company_id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${company_id}`);
      console.log(response.data.results);
      dispatch(slice.actions.getTaskListSuccess(response.data.results));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateTask(task_id, company_id, body) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${task_id}?company_id=${company_id}`, body);
      console.log(response);
      dispatch(slice.actions.getUserListSuccess(response.data.results));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


export function assignedUsers(company_id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/team`, { params: { product: 'outreach', company_id: company_id } });
      console.log(response);
      dispatch(slice.actions.assignedUsersListSuccess(response.data.results.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteTask(task_id, company_id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${task_id}?company_id=${company_id}`);
      console.log(task_id);
      dispatch(slice.actions.deleteSuccess({ task_id }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
