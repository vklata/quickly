
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../../context/cart";
import { toast } from "react-toastify";


const HomePageProductCard = () => {
    const navigate = useNavigate();
    const [cart,setCart]=useCart();
    const [products, setProducts] = useState([]);
    // const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);



      //get products
      const getAllProducts = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(`http://localhost:3000/api/get-product`);
          setLoading(false);
          setProducts(data.products);
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      };
      useEffect(() => {
      getAllProducts();
      }, []);
    
  
    return (
      
        <div className="py-8">
                {/* Heading  */}
                <div className="">
                    <h1 className=" text-center mb-5 text-2xl font-semibold">All Products</h1>
                </div>
    
                {/* main  */}
                <section className="text-gray-600 body-font">
                    <div className="container px-5 lg:px-0 py-5 mx-auto">
                        <div className="flex flex-wrap -m-4" >
                            {products?.map((p) => (
                                // const { image, title, price } = item
                            
                                // return (
                                    <div key={p._id} className="p-4 w-full md:w-1/4">
                                        <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                                            <img
                                            // onClick={()=> navigate(`/allproduct/${p.slug}`)}
                                                className="lg:h-60  h-96 w-full"
                                            //     src={image}
                                            //     alt="blog"
                                            src={`http://localhost:3000/api/product-photo/${p._id}`}
                                            // className="card-img-top"
                                            alt={p.name}
                                            />
                                            <div className="p-6">
                                                <h2 className="tracking-widest text-xs title-font font-medium text-red-400 mb-1">
                                                   {p.name}
                                                </h2>
                                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                    {/* {title.substring(0, 25)} */}
                                                    {p.description}
                                                </h1>
                                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                    ₹{p.price}
                                                </h1>
    
                                                <div className="flex justify-center ">
                                                    <button className=" bg-green-700 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold m-1" onClick={()=>{setCart([...cart,p])
                                                              localStorage.setItem(
                                                                "cart",
                                                                JSON.stringify([...cart, p])
                                                              ); toast.success("Add Product Sucessfully")
                                                    }}>
                                                        Add To Cart
                                                    </button>
                                                     <button className=" bg-blue-600 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold m-1"
                                                     onClick={()=> navigate(`/productinfo/${p.slug}`)}>
                                                        More Info..
                                                    </button>
                                                  
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                //  ) 
                                
                            ))}
                        </div>
                    </div>
                </section>
            </div>
           
    );
}

export default HomePageProductCard;
