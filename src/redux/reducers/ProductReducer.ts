import { createSlice } from '@reduxjs/toolkit'
import {  LOGGED_IN_USER, PRODUCTS } from '../../data/constants'

const initialState = {
  value: [],
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProducts : (state)=> {
      const products:any = localStorage.getItem(PRODUCTS);
      const productsParsed = JSON.parse(products) || [];
      state.value = productsParsed;
    },
    getUserProductsOnly : (state)=> {
        const products:any = localStorage.getItem(PRODUCTS);
        const loggedInUser:any = sessionStorage.getItem(LOGGED_IN_USER);
        const productsParsed = JSON.parse(products) || [];   
        const filteredProducts = productsParsed?.filter((data:any)=> data.userId == JSON.parse(loggedInUser))
        state.value = filteredProducts;
      },
    RunUpdateProductsNameTransaction : (state,action)=> {
     
      let oldName = action.payload.oldName;
      let newName = action.payload.newName;

      const products:any = localStorage.getItem(PRODUCTS);
      const loggedInUser:any = sessionStorage.getItem(LOGGED_IN_USER);
      const productsParsed = JSON.parse(products) || [];   
      const updatedProducts = productsParsed?.map((data:any)=> {
        if(data.userId == JSON.parse(loggedInUser) && data.category == oldName)
          {        
            data.category = newName;
          }
          return data;
      })

      console.log('first',updatedProducts)
      localStorage.setItem(PRODUCTS,JSON.stringify([...updatedProducts]));
      state.value = updatedProducts;
    },

    RunDeleteProductsTransaction : (state,action)=> {
     
      let categoryName = action.payload;

      const products:any = localStorage.getItem(PRODUCTS);
      const loggedInUser:any = sessionStorage.getItem(LOGGED_IN_USER);
      const productsParsed = JSON.parse(products) || [];   
      const updatedProducts = productsParsed?.filter((data:any)=> {
        if(data.userId == JSON.parse(loggedInUser) && data.category == categoryName)
        {
          return;
        }
        return data;
         
      })

      localStorage.setItem(PRODUCTS,JSON.stringify([...updatedProducts]));
      state.value = updatedProducts;
    }
   
  },
})

// Action creators are generated for each case reducer function
export const { getProducts, getUserProductsOnly, RunUpdateProductsNameTransaction, RunDeleteProductsTransaction } = productSlice.actions

export default productSlice.reducer