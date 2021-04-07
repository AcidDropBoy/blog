import { combineReducers } from 'redux';
import articlesReducer from './articlesReducer';
import usersReducer from './usersReducer';

export default combineReducers({
  articlesReducer,
  usersReducer,
});
