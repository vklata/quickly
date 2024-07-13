import React from 'react'
import { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
// import Layout from '../../components/layout/Layout'

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
  
    const navigate = useNavigate();
    // const location = useLocation();
  
    // form function
    const handlereset = async (e) => {
      e.preventDefault();
      if (email === "" || newPassword === ""||answer==="") {
        return toast.error("All fields are required")
    }
    try {
        const res = await axios.post("http://localhost:3000/api/forgot-password", {
          email,
          newPassword,
          answer,
    
        });
        if (res && res.data.success) {
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    //   try {
    //     const res = await axios.post("http://localhost:3000/api/forgot-password", {
    //       email,
    //       newPassword,
    //       answer,
    //     });
    //     if (res.data.success) {
    //     //   toast.success(res.data && res.data.message);
    //     toast.success("Rest Successfully")
    //       navigate("/login");
    //     } else {
    //       toast.error(res.data.message);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     toast.error("Something went wrong");
    //   }
    };
  return (
    <form onSubmit={handlereset}>
        <div className=' flex justify-center items-center h-screen'>
            {/* {loading && <Loader/>} */}
            <div className=' bg-red-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Reset Password</h1>
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
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='what is your nick name'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                        // onSubmit={handlesignup}
                        onClick={()=>{navigate("/login")}}
                        className=' bg-blue-500 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                        Reset
                    </button>
                </div>
  
                <div>
                    <h2 className='text-white'>Don't Have an account <Link className=' text-green-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>
            </div>
        </div>
    //   </form>
    
  )
}
