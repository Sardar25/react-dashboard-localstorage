import { BrowserRouter, Route, Routes } from "react-router-dom"
import Auth from "./pages/auth/Auth"
import ProtectedRoute from "./components/ProtectedRoute"
import Categories from "./pages/categories/Categories"
import CategoryForm from "./pages/categories/CategoryForm"
import CategoryEdit from "./pages/categories/CategoryEdit"
import Products from "./pages/products/Products"
import ProductForm from "./pages/products/ProductForm"
import ProductEdit from "./pages/products/ProductEdit"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/auth" element={<Auth />} />    
      
      <Route element={<ProtectedRoute />} >

         <Route path="/categories" element={<Categories/>}/>
         <Route path="/categories/add" element={<CategoryForm/>}/>
         <Route path="/categories/edit/:id" element={<CategoryEdit/>}/>

         <Route path="/products" element={<Products/>}/>
         <Route path="/products/add" element={<ProductForm/>}/>
         <Route path="/products/edit/:id" element={<ProductEdit/>}/>

         <Route path="*" element={
          <div className="w-full h-[90vh] flex items-center justify-center">
            <p>404 | Page Not found</p>
          </div>
         }/>







      </Route>    


    </Routes>
  </BrowserRouter>
  )
}

export default App
