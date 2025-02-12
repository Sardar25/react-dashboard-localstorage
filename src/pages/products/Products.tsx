import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import PageHeading from "../../components/PageHeading";
import { AiFillFileUnknown } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/products/ProductItem";
import { getUserProductsOnly } from "../../redux/reducers/ProductReducer";
import { getUserCategoriesOnly } from "../../redux/reducers/CategoryReducer";

const Products = () => {

  const productsData = useSelector((state:any)=>state.products.value)
  const userCategories = useSelector((state:any)=>state.categories.value)
  const loggedInUser = useSelector((state:any)=>state.user.value)

  const [noCategoryDialog,setNoCategoryDialog] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  useEffect(() => {
    
    dispatch(getUserProductsOnly());
    dispatch(getUserCategoriesOnly());

  }, []);

  function createNewProductHandler()
  {
     if(userCategories?.length)
     {
       return navigate('/products/add')
     }
     setNoCategoryDialog(true);
     setTimeout(()=>{
       setNoCategoryDialog(false);
     },2000)
  }

  return (
    <div>
        <div className="flex flex-col sm:flex-row  sm:items-center gap-5 items-start sm:justify-between">
      <PageHeading text="Products" />
      <button onClick={createNewProductHandler} className="btn btn-primary  ">
        Create New Product 
      </button>
      </div>

      <div className="overflow-x-auto card bg-gray-100 shadow-black/10 shadow-lg rounded-2xl p-2 mt-12">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th align="center">Actions</th>

            </tr>
          </thead>
          {productsData?.length ? (
            <tbody>
              {
               productsData?.filter((data:any)=> data.userId == loggedInUser ).map((data:any, ind:number) => (
                <ProductItem key={ind} data={data} />
              ))}
            </tbody>
          ) : (
            <tbody>
            <tr className="flex p-4 justify-center h-[150px] ">
                <td className="absolute gap-3 w-full left-0 flex justify-center items-center flex-col">
                  <div>
                  <AiFillFileUnknown className="text-gray-300" size={80}/>
                  </div>
                  <p className=" text-gray-500">No Products Found</p>
                </td>
            </tr>
            </tbody>
          )}
        </table>
      </div>
      {noCategoryDialog && (
        <div className="toast toast-center  toast-top">
          <div className="alert bg-red-400 flex flex-col items-start">
            <span className="text-white text-lg font-semibold ">No Category Found</span>
            <span className="text-white">Products cannot be created without any category</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
