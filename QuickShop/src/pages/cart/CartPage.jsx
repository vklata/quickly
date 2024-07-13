
import { Trash } from 'lucide-react'
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
// import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify"; 


const CartPage = () => {
    const[auth,setAuth]=useAuth();
    const[cart,setCart]=useCart();
    const navigate = useNavigate();
    const totalPrice = () => {
        try {
          let total = 0;
          cart?.map((items) => {
            total = total + items.price;
          });
          return total
        } catch (error) {
          console.log(error);
        }
      };
      const grantotal=totalPrice();
      
      //detele item
      const removeCartItem = (pid) => {
        try {
          let myCart = [...cart];
          let index = myCart.findIndex((items) => items._id === pid);
          myCart.splice(index, 1);
          setCart(myCart);
          localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
          console.log(error);
        }
      };

      const handlePayment = async (e) => {
        e.preventDefault();
        try {
          const orderRepons = await axios.post("http://localhost:3000/api/checkout", {
           
            amount: grantotal,
            // qty: qty,
            cartItems: cart,
            // userShipping: userAddress,
            userId:auth.user._id
          });
          
          console.log(" order response ", orderRepons);
          const { orderId, amount: orderAmount } = orderRepons.data;
    
          var options = {
            key: "rzp_test_1cagsZQpwRSozd", // Enter the Key ID generated from the Dashboard
            amount: grantotal * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Quick-Shop",
            description: "Quick-Shop",
    
            order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: async function (response) {
              const paymentData = {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                amount: orderAmount,
                orderItems: cart,
                userId: auth.user._id,
              };
    
              const api = await axios.post(
                `http://localhost:3000/api/verify-payment`,
                paymentData
              );
    
              console.log("razorpay res ", api.data);
    
              if (api.data.success) {
                // clearCart();
                localStorage.removeItem("cart");
                setCart([]);
                toast.success("Payment Successfully Done")
                navigate("/");
              }
            },
            prefill: {
              name: "Vk",
              email: "Vk123@gmail.com",
              contact: "9000090000",
            },
            notes: {
              address: "Vijay Nagar Indore",
            },
            theme: {
              color: "#3399cc",
            },
          };
          const rzp = new window.Razorpay(options);
          rzp.open();
        } catch (error) {
          console.log(error);}
        };
    return (
        <Layout>
                    <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
            <div className="container mx-auto px-4 max-w-7xl px-2 lg:px-0">
                <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Shopping Cart
                    </h1>
                    <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                        <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
                            <h2 id="cart-heading" className="sr-only">
                                Items in your shopping cart
                            </h2>
                            <ul role="list" className="divide-y divide-gray-200">
                                {cart?.map((p) => (
                                    <div key={p._id} className="">
                                        <li className="flex py-6 sm:py-6 ">
                                            <div className="flex-shrink-0">
                                                <img
                                                 src={`http://localhost:3000/api/product-photo/${p._id}`}
                                                    alt={p.name}
                                                    className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                    <div>
                                                        <div className="flex justify-between">
                                                            <h3 className="text-sm">
                                                                <a href={p.href} className="font-semibold text-black">
                                                                    {p.name}
                                                                </a>
                                                            </h3>
                                                        </div>
                                                        <div className="mt-1 flex text-sm">
                                                            <p className="text-sm text-gray-500">{p.color}</p>
                                                            {p.size ? (
                                                                <p className="ml-4 border-l border-gray-200 pl-4 text-sm text-gray-500">
                                                                    {p.size}
                                                                </p>
                                                            ) : null}
                                                        </div>
                                                        <div className="mt-1 flex items-end">
                                                            <p className="text-xs font-medium text-gray-500 line-through">
                                                                {p.originalPrice}
                                                            </p>
                                                            <p className="text-sm font-medium text-gray-900">
                                                                Price:₹{p.price}
                                                            </p>
                                                            &nbsp;&nbsp;
                                                            <p className="text-sm font-medium text-green-500">{p.discount}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <div className="mb-2 flex">
                                            <div className="ml-6 flex text-sm">
                                                <button type="button" className="flex items-center space-x-1 px-2 py-1 pl-0" onClick={() => removeCartItem(p._id)}>
                                                    <Trash size={12} className="text-red-500" />
                                                    <span className="text-xs font-medium text-red-500">Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        </section>
                        {/* Order summary */}
                        <section
                            aria-labelledby="summary-heading"
                            className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
                        >
                            <h2
                                id="summary-heading"
                                className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
                            >
                                Price Details
                            </h2>
                            <div>
                                <dl className=" space-y-1 px-2 py-4">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm text-gray-800">Price of {cart?.length} Products</dt>
                                        <dd className="text-sm font-medium text-gray-900">₹{grantotal}</dd>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="flex text-sm text-gray-800">
                                            <span>Delivery Charges</span>
                                        </dt>
                                        <dd className="text-sm font-medium text-green-700">Free</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-y border-dashed py-4 ">
                                        <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                                        <dd className="text-base font-medium text-gray-900">₹{grantotal}</dd>
                                    </div>
                                </dl>
                                <div className="px-2 pb-4 font-medium text-green-700">
                                <div className="flex gap-4 mb-6" >
                                    <button
                                        className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent dark:border-gray-700 hover:border-pink-500 hover:text-pink-700 hover:bg-pink-100 rounded-xl"
                                      onClick={handlePayment} >
                                        Buy now
                                    </button>

                                </div>
                                </div>
                            </div>
                        </section>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default CartPage;


