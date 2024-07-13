
import Layout from "../../components/layout/Layout";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import axios from "axios";

const UserDashboard = () => {
    const [auth, setAuth] = useAuth();
    //state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [userOrder, setUserOrder] = useState([]);

  
    //get user data
    useEffect(() => {
      const { email, name, phone, address } = auth?.user;
      setName(name);
    //   setPhone(phone);
      setEmail(email);
      setAddress(address);
    }, [auth?.user]);
  

    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/userorder");
        setOrders(data);
        console.log(orders)
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      if (auth?.token) getOrders();
    }, [auth?.token]);

    return (
        <Layout>
         
            <div className=" container mx-auto px-4 py-5 lg:py-8">
                {/* Top  */}
                <div className="top ">
                    {/* main  */}
                    <div className=" bg-pink-50 py-5 rounded-xl border border-pink-100">
                        {/* image  */}
                        <div className="flex justify-center">
                            <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="" />
                        </div>
                        {/* text  */}
                        <div className="">
                            {/* Name  */}
                            <h1 className=" text-center text-lg">
                                <span className=" font-bold">Name : </span>
                                {auth.user.name}
                            </h1>

                            {/* Email  */}
                            <h1 className=" text-center text-lg">
                                <span className=" font-bold">Email : </span>
                                {auth.user.email}
                            </h1>

                            {/* Role  */}
                            <h1 className=" text-center text-lg">
                                <span className=" font-bold">Role : </span>
                                {auth.user.role}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* bottom  */}
                {/* <div className="bottom"> */}
                    {/* main 1 */}
                    {/* <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0"> */}
                        {/* text  */}
                        {/* <h2 className=" text-2xl lg:text-3xl font-bold">Order Details</h2> */}

                        {/* main 2 */}
                        {/* {orders?.map((o,i) => ( */}
                         <div className="mt-5 flex flex-col overflow-hidden rounded-xl border border--100 md:flex-row">
                            {/* main 3  */}
                            {orders?.map((o,i) => (
                            <div className="w-full border-r border-pink-100 bg-pink-50 md:max-w-xs">
                                {/* left  */}
                                {/* {orders?.map((p) => ( */}
           

                                <div className="p-8">
                                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                                        <div className="mb-4">
                                            <div className="text-sm font-semibold text-black">Order Id</div>
                                            <div className="text-sm font-medium text-gray-900">{o.orderId}</div>
</div>

                                        <div className="mb-4">
                                            <div className="text-sm font-semibold">Date</div>
                                            <div className="text-sm font-medium text-gray-900">{o.orderDate}</div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="text-sm font-semibold">Total Amount</div>
                                            <div className="text-sm font-medium text-gray-900">{o.amount}</div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="text-sm font-semibold">Payment Status</div>
                                            <div className="text-sm font-medium text-green-800">{o.payStatus}</div>
                                        </div>
                                    </div>
                                </div>
                                {/* ))} */}
                            </div>
                        
                            ))}
                            {/* right  */}
                   
                        </div>
                       
                    {/* </div> */}

                {/* </div> */}
            </div>
        </Layout>
    );
}

export default UserDashboard;



