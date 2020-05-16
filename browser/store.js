import { createStore, applyMiddleware } from 'redux';
import reduxLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

//  - action type
const ADDED_STUDENT = 'ADDED_STUDENT';
const GOT_STUDENTS = 'GOT_STUDENTS';

//  - action creator
export const addedStudent = (student) => ({ type: ADDED_STUDENT, student });
export const gotStudents = (students) => ({ type: GOT_STUDENTS, students });

// - thunks
export const addStudent = (student) => async dispatch => {
  const { data } = await axios.post('/student', student);
  return dispatch(addedStudent(data));
};

export const getStudents = () => async dispatch => {
  const { data } = await axios.get('/student');
  return dispatch(gotStudents(data));
};

//  - initial state
const initialState = {
  students: [],
};

//  - reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
  case ADDED_STUDENT:
    return {...state, students: [...state.students, action.student]};
  case GOT_STUDENTS:
    return {...state, students: action.students};
  default:
    return state;
  }
};

const store = createStore(reducer, applyMiddleware(reduxLogger, thunkMiddleware));

export default store;
