import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/reducers/CategoryReducer";
import { CATEGORIES } from "../../data/constants";
import { RunDeleteProductsTransaction } from "../../redux/reducers/ProductReducer";

const DeleteCategory = ({ data,setShowDeleteDialog }: any) => {
  const allCategories = useSelector((state: any) => state.categories.value);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);



  function handleDeleteCategory() {
      let updatedCategories:any = allCategories?.filter((category:any)=> {
        if(category.name == data.name && category.userId == data.userId)
        {
          return;
        }
        return category;
      })

      localStorage.setItem(CATEGORIES,JSON.stringify([...updatedCategories]));
      dispatch(RunDeleteProductsTransaction(data.name))
      window.location.reload();
  }

  return (
    <div className="fixed z-10 w-full min-h-[100vh] left-0 top-0  flex items-center justify-center">
      <div className="absolute w-full min-h-[100vh]  left-0 top-0 bg-black/70 "></div>

      <div className="w-[500px] bg-white my-auto opacity-100 z-30 py-8 px-6 rounded-2xl">
        <p className="text-black/80 text-lg">
          Are You sure want to delete this Category
        </p>

        <p className="text-red-500 mt-1">
          All the products under this category will also get deleted
        </p>

        <div className="flex justify-end items-center gap-3 mt-9">
          <button onClick={()=> setShowDeleteDialog(false)} className="btn btn-success">No</button>
          <button onClick={handleDeleteCategory} className="btn btn-error opacity-100">Yes</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategory;
