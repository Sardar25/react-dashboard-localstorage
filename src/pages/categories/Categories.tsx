import { useEffect } from "react";
import CategoryItem from "../../components/Categories/CategoryItem";
import { Link } from "react-router-dom";
import PageHeading from "../../components/PageHeading";
import { AiFillFileUnknown } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getUserCategoriesOnly } from "../../redux/reducers/CategoryReducer";

const Categories = () => {

  const categoriesData = useSelector((state:any)=>state.categories.value)
  const loggedInUser = useSelector((state:any)=>state.user.value)

  const dispatch = useDispatch();
  

  useEffect(() => {
    
    dispatch(getUserCategoriesOnly());
  }, []);

  console.log(categoriesData)

  return (
    <div>
        <div className="flex flex-col sm:flex-row  sm:items-center gap-5 items-start sm:justify-between">
      <PageHeading text="Categories" />
      <Link to={"/categories/add"} className="btn btn-primary  ">
        Create New Category 
      </Link>
      </div>

      <div className="overflow-x-auto card bg-gray-100 shadow-black/10 shadow-lg rounded-2xl p-2 mt-12">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Cover Image</th>
              <th align="center">Actions</th>

            </tr>
          </thead>
          {categoriesData?.length ? (
            <tbody>
              { 
                categoriesData?.filter((value:any) => value.userId == loggedInUser ).map((data:any, ind:number) => (
                 <CategoryItem key={ind} data={data} /> 
              ))}
            </tbody>
          ) : (
            <tbody>
            <tr className="flex p-4 justify-center h-[150px] ">
                <td className="absolute gap-3 w-full left-0 flex justify-center items-center flex-col">
                  <div>
                  <AiFillFileUnknown className="text-gray-300" size={80}/>
                  </div>
                  <p className=" text-gray-500">No Categories Found</p>
                </td>
            </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Categories;
