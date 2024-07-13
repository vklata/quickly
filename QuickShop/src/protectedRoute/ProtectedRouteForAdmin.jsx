/* eslint-disable react/prop-types */
import { Navigate } from "react-router"
// import User from "../../../backend2/models/User";
import { useAuth } from "../context/auth"

export const ProtectedRouteForAdmin =({children}) => {
    const [auth,setAuth]=useAuth();
    try{
    if (auth.user.role === 1) {
      return children
    }
    else {
      return <Navigate to={'/login'}/>
    }}catch (error) {
        console.log("error",error);
  
      }
}
