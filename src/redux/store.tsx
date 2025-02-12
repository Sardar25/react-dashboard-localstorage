import { configureStore } from '@reduxjs/toolkit'
import CategoryReducer from './reducers/CategoryReducer';
import ProductReducer from './reducers/ProductReducer';

import UserReducer from './reducers/UserReducer';


export const store = configureStore({
  reducer: {
    categories : CategoryReducer,
    user : UserReducer,
    products:ProductReducer
  },
});