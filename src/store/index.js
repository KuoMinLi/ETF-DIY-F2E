import { createStore } from 'redux';
import AuthReducer from '../Reducer/Reducer';

const store = createStore(AuthReducer);

export default store;