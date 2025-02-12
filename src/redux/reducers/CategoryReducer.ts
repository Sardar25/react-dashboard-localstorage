import { createSlice } from '@reduxjs/toolkit'
import { CATEGORIES, LOGGED_IN_USER } from '../../data/constants'

const initialState = {
  value: [],
}

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategories : (state)=> {
      const categories:any = localStorage.getItem(CATEGORIES);
      const categoriesParsed = JSON.parse(categories) || [];
      state.value = categoriesParsed;
    },
    getUserCategoriesOnly : (state)=> {
        const categories:any = localStorage.getItem(CATEGORIES);
        const loggedInUser:any = sessionStorage.getItem(LOGGED_IN_USER);
        const categoriesParsed = JSON.parse(categories) || [];   
        const filteredCategory = categoriesParsed?.filter((data:any)=> data.userId == JSON.parse(loggedInUser))
        state.value = filteredCategory;
      },
   
  },
})

// Action creators are generated for each case reducer function
export const { getCategories,getUserCategoriesOnly } = categorySlice.actions

export default categorySlice.reducer