import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PageHeading from "../../components/PageHeading";
import { FaImage } from "react-icons/fa6";
import { CATEGORIES } from "../../data/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/reducers/CategoryReducer";

export const CategoryForm = () => {
  const [imageUrl, setImageUrl] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const allCategories = useSelector((state: any) => state.categories.value);
  const loggedInUser = useSelector((state: any) => state.user.value);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
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

    let { name, description } = getValues();

    let categoryExist = allCategories?.find(
      (data: any) => data.userId == loggedInUser && data.name == name
    );

    if (categoryExist) {
      setError("name", {
        type: "manual",
        message: "Category already exist",
      });
      return;
    }
    let Category = {
      name,
      description,
      coverImage: imageUrl,
      userId: loggedInUser,
    };

    localStorage.setItem(
      CATEGORIES,
      JSON.stringify([...allCategories, Category])
    );
    setShowToast(true);
    setTimeout(() => {
      navigate("/categories");
    }, 1000);
  }, [getValues, imageUrl]);

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
      <PageHeading backButton={true} text="Create Category" />
      <div className="w-full flex items-center justify-center ">
        <form
          className="card shadow-black/20 shadow-xl bg-gray-100 p-6 w-[600px] mt-12"
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
            <span>Category Added Successfully</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryForm;
