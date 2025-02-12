import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  PRODUCTS } from "../../data/constants";
import { getProducts } from "../../redux/reducers/ProductReducer";

const DeleteProduct = ({ data,setShowDeleteDialog }: any) => {
  const allProducts = useSelector((state: any) => state.products.value);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getProducts());
  },[])

  function handleDeleteProduct() {

    let updatedProducts:any = allProducts?.filter((product:any)=> {
        if(product.name == data.name && product.userId == data.userId)
          return;
        return product;
      })
      localStorage.setItem(PRODUCTS,JSON.stringify([...updatedProducts]));
      window.location.reload();
  }

  return (
    <div className="fixed z-10 w-full min-h-[100vh] left-0 top-0  flex items-center justify-center">
      <div className="absolute w-full min-h-[100vh]  left-0 top-0 bg-black/70"></div>

      <div className="w-[500px] bg-white my-auto opacity-100 z-30 py-8 px-6 rounded-2xl">
        <p className="text-black/80 text-lg">
          Are You sure want to delete this Product
        </p>

        <div className="flex justify-end items-center gap-3 mt-12">
          <button onClick={()=> setShowDeleteDialog(false)} className="btn btn-success">No</button>
          <button onClick={handleDeleteProduct} className="btn btn-error opacity-100">Yes</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
