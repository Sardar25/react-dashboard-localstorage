import { Navigate, Outlet } from 'react-router-dom';
import Layout from './Layout';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {


    const loggedInStatus = useSelector((state:any)=>state.user.value);
    
console.log(loggedInStatus)
    return loggedInStatus 
    ? <Layout>
        <Outlet /> 
      </Layout>
    : <Navigate to="/auth" />;
};

export default ProtectedRoute;