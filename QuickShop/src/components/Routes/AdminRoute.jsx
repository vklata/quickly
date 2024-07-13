// import { useState, useEffect } from "react";
// import { useAuth } from "../../context/auth";
// import { Outlet } from "react-router-dom";
// import axios from "axios";
// import Spinner from "./Spinner";

// export const AdminRoute=({childern})=> {
//   const [ok, setOk] = useState(false);
//   const [auth, setAuth] = useAuth();

//   useEffect(() => {
//     const authCheck = async () => {
//       const res = await axios.get("http://localhost:3000/api/admin-auth");
//       if (res.data.ok) {
//         setOk(true);
//       } else {
//         setOk(false);
//       }
//     };
//     if (auth?.token) authCheck();
//   }, [auth?.token]);

//   return ok ? childern : <Spinner path="" />;
// }
/* eslint-disable react/prop-types */
import { Navigate } from "react-router"

export const AdminRoute = ({children}) => {
    const user = JSON.parse(localStorage.getItem('users'))
    if (user?.role === 1) {
      return children
    }
    else {
      return <Navigate to={'/login'}/>
    }
}
