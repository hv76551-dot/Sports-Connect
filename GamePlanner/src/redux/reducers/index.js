import { combineReducers } from 'redux';
import indexReducer from './indexReducer'; 

const rootReducer = combineReducers({
  indexReducer: indexReducer, 
});

export default rootReducer;
