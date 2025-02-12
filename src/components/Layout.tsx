import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose, IoLogOut } from "react-icons/io5";
import {  FaBoxOpen } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../redux/reducers/UserReducer";

export const Layout = ({ children }: { children: React.ReactElement }) => {
  const userName = useSelector((state: any) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col  px-6 pt-14 ">
        {/* Page content here */}

        {children}

        {/* Page content here */}

        <label
          htmlFor="my-drawer-2"
          className="btn  drawer-button lg:hidden absolute left-2 top-2"
        >
          <GiHamburgerMenu />
        </label>
      </div>
      <div className="drawer-side ">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-gray-100 lg:bg-gray-200 text-base-content min-h-full w-80 p-4 gap-3 ">
          <label
            htmlFor="my-drawer-2"
            className="btn self-end drawer-button lg:hidden "
          >
            <IoClose />
          </label>
          {/* Sidebar content here */}

          <div className="flex items-center justify-center flex-col gap-2 disabled mt-3 mb-4">
            <div className="w-[100px] h-[100px] rounded-full bg-gray-300 flex  items-center justify-center ">
              <p className="text-4xl">{userName.slice(0, 1).toUpperCase()}</p>
            </div>
            {userName}
          </div>
          {/* <li>
            <Link to={"/"} className="flex flex-row items-center gap-4 ">
              <FaHome color="gray" size={20} />
              <span>Home</span>
            </Link>
          </li> */}
          <li>
            <Link
              to={"/categories"}
              className="flex flex-row items-center gap-4 "
            >
              <BiSolidCategory color="gray" size={20} />
              <span>Categories</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/products"}
              className="flex flex-row items-center gap-4 "
            >
              <FaBoxOpen color="gray" size={20} />
              <span>Products</span>
            </Link>
          </li>

          <li onClick={ ()=> {
            dispatch(handleLogout());
            navigate('/auth')
            } }>
            <div className="flex flex-row items-center gap-4 ">
              <IoLogOut className="" color="gray" size={20} />
              <span>Logout</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Layout;
