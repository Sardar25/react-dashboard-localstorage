import {  MdDeleteSweep, MdEditDocument } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import DeleteProduct from "./DeleteProduct";



const ProductItem = ({ data }: any) => {

    const [showDeleteDialog,setShowDeleteDialog] = useState(false);
  return (
    <>
    <tr>
      <td>{data?.name}</td>

      <td>{data?.description}</td>

      <td>PKR {data?.price}</td>

      <td>{data?.category}</td>


      

 
      <td>
        <div className="flex gap-4 items-center justify-center ">
            <Link to={`/products/edit/${data?.name}`} className="btn p-2  ">

              <MdEditDocument color="gray"   size={23}/>
            </Link>
            <button onClick={()=> setShowDeleteDialog(true)} className="btn  p-2  ">

              <MdDeleteSweep color="gray"  size={23}/>
            </button>

   { showDeleteDialog &&  <DeleteProduct data={data} setShowDeleteDialog={setShowDeleteDialog}/>}

        </div>
      </td>
    </tr>
    </>
  );
};

export default ProductItem;
