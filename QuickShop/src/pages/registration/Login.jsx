/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link,useNavigate} from 'react-router-dom'
// import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { useAuth } from "../../context/auth";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
  
    const navigate = useNavigate();
    // const location = useLocation();
  
    // form function
    const handlelogin = async (e) => {
      e.preventDefault();
      if (email === "" || password === "") {
        return toast.error("All fields are required")
    }
      try {
        const res = await axios.post("http://localhost:3000/api/login", {
          email,
          password,
        });
        if (res.data.success) {
        //   toast.success(res.data && res.data.message);
          localStorage.setItem("token",res.data.token)
          console.log(localStorage.getItem("token"))
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
          });
          localStorage.setItem("auth", JSON.stringify(res.data));
        toast.success("Login Successfully")
          navigate("/");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

  
// let navigate=useNavigate();
//     const handlelogin = async (e) => {
//         e.preventDefault();
        // if (email === "" || password === "") {
        //     return toast.error("All fields are required")
        // }
//         console.log(email,password)
 
        
          
// const response= await fetch('http://localhost:3000/api/login', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         email,password
//     })
// });
// const json=await response.json()
// console.log(json);

// if(!json.success){
// alert("enter valid")
//       }
//     if(json.success){
        // localStorage.setItem("token",json.token)
        // console.log(localStorage.getItem("token"))

        // toast.success("Login Successfully")
//         navigate("/");
//     }
    
    
//     }
    return (
        <form onSubmit={handlelogin}>
        <div className=' flex justify-center items-center h-screen'>
            {/* {loading && <Loader/>} */}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
                </div>

                <div>
                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                        // onSubmit={handlesignup}
                        className=' bg-blue-500 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                        Login
                    </button>
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                        // onSubmit={handlesignup}
                        onClick={()=>{navigate('/forgot-password')}}
                        className=' bg-balck-500 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                        Forgot Password ?
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Don't Have an account <Link className=' text-red-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
      </form>
    );
}

export default Login;
