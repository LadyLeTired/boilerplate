import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import axios from "axios";

const initialState = {
  user: {}
};

//ACTION TYPES

const GET_USER = "GET_USER";
const CREATE_USER = "CREATE_USER";

//ACTION CREATORS

const gotMe = user => ({
  type: GET_USER,
  user
});

export const createUser = newUser => ({
  type: CREATE_USER,
  newUser
});

//THUNK STUFF

export const getMe = () => dispatch => {
  return axios
    .get("/auth/me")
    .then(res => res.data)
    .then(user => dispatch(gotMe(user)))
    .catch(console.error.bind(console));
};

export const login = formData => dispatch => {
  return axios
    .put("/auth/login", formData)
    .then(res => res.data)
    .then(user => dispatch(gotMe(user)))
    .catch(console.error.bind(console));
};

export const logout = () => dispatch => {
  return axios
    .delete("/auth/logout")
    .then(() => dispatch(gotMe(initialState.user)))
    .catch(console.error.bind(console));
};

export const createNewUserThunk = newDude => async dispatch => {
  try {
    const { data: newUser } = await axios.post("/auth/signup", newDude);
    dispatch(createUser(newUser));
  } catch (err) {
    throw err;
  }
};

//REDUCER STUFF

const reducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_USER:
      newState.user = action.user;
      return newState;
    case CREATE_USER:
      newState.user = [...state.user, action.newUser];
      return newState;
    default:
      return state;
  }
};

export default reducer;

// export default createStore(
//   reducer,
//   applyMiddleware(thunkMiddleware, loggerMiddleware)
// );
