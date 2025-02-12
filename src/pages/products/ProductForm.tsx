import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PageHeading from "../../components/PageHeading";
import { FaImage } from "react-icons/fa6";
import {  PRODUCTS } from "../../data/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  getUserCategoriesOnly } from "../../redux/reducers/CategoryReducer";
import { getProducts } from "../../redux/reducers/ProductReducer";

export const ProductForm = () => {
  const [imageUrl, setImageUrl] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const userCategories = useSelector((state: any) => state.categories.value);
  const loggedInUser = useSelector((state: any) => state.user.value);
  const [categorySelected,setCategorySelected] = useState(null);
  const allProducts = useSelector((state: any) => state.products.value);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserCategoriesOnly());
    dispatch(getProducts());
  }, []);

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  }: any = useForm();

  const onSubmit = useCallback(() => {

  

    
    if (!imageUrl) {
      return;
    }

    let { name, description, price } = getValues();

    let productExist = allProducts?.find(
      (data: any) => data.userId == loggedInUser && data.name == name
    );

    if (productExist) {
      setError("name", {
        type: "manual",
        message: "Product already exist",
      });
      return;
    }

    let Product = {
      name,
      description,
      coverImage: imageUrl,
      userId: loggedInUser,
      category : categorySelected || userCategories[0].name,
      price: price
    };

   
    localStorage.setItem(
      PRODUCTS,
      JSON.stringify([...allProducts, Product])
    );

    setShowToast(true);
    setTimeout(() => {
      navigate("/products");
    }, 1000);
  }, [getValues, imageUrl, categorySelected]);

  const handleImage = (e: any) => {
    const fileData = e.target.files[0];
    if (fileData.type === "image/png" || fileData.type === "image/jpeg") {
      const reader = new FileReader();
      reader.readAsDataURL(fileData);
      reader.onload = () => {
        setImageUrl(reader.result);
      };
    } else {
      setImageUrl(null);
    }
  };


  return (
    <div>
      <PageHeading backButton={true} text="Create Product" />
      <div className="w-full flex items-center justify-center ">
        <form
          className="card shadow-black/20 shadow-xl bg-gray-100 p-6 w-[600px] mt-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="name">Name</label>
          <input
            placeholder="name"
            className="p-2 rounded my-1"
            {...register("name", {
              required: {
                value: true,
                message: "Name must be filled",
              },
            })}
          />
          <p className="text-xs text-red-500 mb-3">{errors?.name?.message}</p>

          <label htmlFor="description">Description</label>
          <input
            className="p-2 rounded my-1"
            placeholder="description"
            {...register("description", {
              required: {
                value: true,
                message: "Description must be filled",
              },
              minLength: {
                value: 15,
                message: "Description must be at least 15 characters long",
              },
            })}
          />
          <p className="text-xs text-red-500 mb-3">
            {errors?.description?.message}
          </p>
          
          <label htmlFor="category">Category</label>

          <select  onChange={(e:any)=> setCategorySelected(e.target.value)} name="category" className="p-2 rounded mt-1 mb-4">
            {
              userCategories?.map((data:any,ind:number)=> 
             <option key={ind} value={data.name}>{ data.name }</option>
              
              )
            }
             
          </select>
          

          <label  htmlFor="price">Price (PKR)</label>
          <input
          prefix="RS"
          type="number"
            className="p-2 rounded my-1"
            placeholder="price"
            {...register("price", {
              required: {
                value: true,
                message: "price must be filled",
              },
             
            })}
          />
          <p className="text-xs text-red-500 mb-3">
            {errors?.price?.message}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-4">
            <input
              hidden
              id="image"
              onChange={handleImage}
              type="file"
              accept="image/png,image/jpeg"
            />

            <FaImage />
            <label className="btn" htmlFor="image">
              {" "}
              Upload Cover Image{" "}
            </label>

            {imageUrl ? (
              <img className="ml-auto" width={30} height={30} src={imageUrl} />
            ) : (
              <p className="text-xs text-red-500 mt-2 sm:ml-auto">
                Add png or jpeg images only
              </p>
            )}
          </div>
          {!imageUrl && (
            <p className="text-xs text-red-500 mt-2">
              Cover Image Must be added
            </p>
          )}

          <button
            disabled={showToast}
            className="btn btn-primary mt-8"
            type="submit"
          >
            Create
          </button>
        </form>
      </div>
      {showToast && (
        <div className="toast toast-center toast-top">
          <div className="alert alert-success">
            <span>Product Created Successfully</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductForm;
