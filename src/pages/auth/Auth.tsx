import  { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { LOG_IN,   SIGN_IN, USERS } from "../../data/constants";
import { setLoggedInUser } from "../../redux/reducers/UserReducer";
import { useDispatch } from "react-redux";



const Auth = () => {


  const dispatch = useDispatch();
  const [authState, setAuthState] = useState(LOG_IN);
  const [userNameValue,setUserNameValue] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function changeAuthStateHandler(state:any) {

    setAuthState(state);
    setErrorMsg(null);
    setUserNameValue('');

  }

  const LoginHandler = (userExist: any) => {
    if (userExist) {
      return true;
    } else {
      setLoading(false);
      setErrorMsg("User does not exist");
      return false;
    }
  };

  const SignInHandler = (userExist:any,username:any,parsedUsers:any)=> {

    if (userExist) {
      setErrorMsg("User already exists");
      setLoading(false);
      return false;
    }
    localStorage.setItem(USERS, JSON.stringify([...parsedUsers, username]));
    return true;

  }

  const formSubmitHandler = (e: any) => {
    e.preventDefault();
    let username = e.target.username.value;

    if(username.trim().length < 3)
    {
      setErrorMsg('username must be three characters long')
      return;
    }
    
    setLoading(true);
    let users: any = localStorage.getItem(USERS);
    let parsedUsers: any = users ? JSON.parse(users) : [];

    let userExist = parsedUsers.find((data: any) => data == username);
    
    let successCase = false;

    if (authState == LOG_IN) {
      successCase = LoginHandler(userExist);
    }
    else {
      successCase = SignInHandler(userExist,username,parsedUsers)
    }

    if(successCase == false) 
    {
      return;
    }

    setShowToast(true);
    setErrorMsg(null);

    setTimeout(
      () => {
        setShowToast(false);
        navigate("/categories");
        setLoading(false);
    }, 1000);

    dispatch(setLoggedInUser(username));    
  };

  return (
    <div className="w-full h-[100vh] bg-[#efeff6] flex justify-center items-center">
      <form
        onSubmit={formSubmitHandler}
        className="flex flex-col bg-white shadow shadow-black/20 rounded-xl p-5 w-[90%] sm:w-[450px]"
      >
        <p className="text-4xl font-semibold mb-6 mt-1">{authState}</p>

        <label>username</label>
        <input
        onChange={(e)=> setUserNameValue(e.target.value)}
        className="rounded p-2 mt-1 " value={userNameValue} name="username" type="text" />
        <p className="text-sm text-red-500">{errorMsg}</p>
        <button
          disabled={loading}
          type="submit"
          className="btn btn-primary mt-6"
        >
          {authState}
        </button>
        <div className="bg-gray-300 h-[0.3px] my-8 w-[90%] mx-auto"></div>
        {authState === LOG_IN ? (
          <div className="flex flex-col   gap-3 mb-3 ">
            <p className="text-lg">don't have an account</p>
            <p
              onClick={() => changeAuthStateHandler(SIGN_IN)}
              className="btn btn-outline btn-neutral  w-full"
            >
              Create New
            </p>
          </div>
        ) : (
          <div className="flex flex-col   gap-3 mb-3 ">
            <p className="text-lg">already have an account</p>
            <p
              onClick={() => changeAuthStateHandler(LOG_IN)}
              className="btn bg-green-500 text-white w-full"
            >
              Login
            </p>
          </div>
        )}

      </form>
      {showToast && (
        <div className="toast toast-center toast-top">
          <div className="alert alert-success">
            <span>
              {
                authState == LOG_IN ? 
                'Successfully Loged In' 
                : 
                'Account Created Successfully'
              }
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
