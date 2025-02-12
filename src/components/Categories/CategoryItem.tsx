import {  MdDeleteSweep, MdEditDocument } from "react-icons/md";
import { Link } from "react-router-dom";
import DeleteCategory from "./DeleteCategory";
import { useState } from "react";



const CategoryItem = ({ data }: any) => {

    const [showDeleteDialog,setShowDeleteDialog] = useState(false);
  return (
    <>
    <tr>
      <td>{data?.name}</td>

      <td>{data?.description}</td>

      <td>
        <div className="avatar">
          <div className="mask mask-squircle h-12 w-12">
            <img src={data?.coverImage} alt="loading" />
          </div>
        </div>
      </td>
      <td>
        <div className="flex gap-4 items-center justify-center ">
            <Link to={`/categories/edit/${data?.name}`} className="btn p-2  ">

              <MdEditDocument color="gray"   size={23}/>
            </Link>
            <button onClick={()=> setShowDeleteDialog(true)} className="btn  p-2  ">

              <MdDeleteSweep color="gray"  size={23}/>
            </button>

   { showDeleteDialog &&  <DeleteCategory data={data} setShowDeleteDialog={setShowDeleteDialog}/>}

        </div>
      </td>
    </tr>
    </>
  );
};

export default CategoryItem;
