import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";
const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const[cart,setCart]=useCart();

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
       <div className="py-8">
                {/* Heading  */}
                <div className="text-bold">
                    <h1 className=" text-center mb-5 text-2xl font-semibold">Category-{category?.name}</h1>
                    <h4 className="text-center">{products?.length} result found </h4>
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
                                                <button className=" bg-green-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold m-1"onClick={()=>{setCart([...cart,p])
                                                              localStorage.setItem(
                                                                "cart",
                                                                JSON.stringify([...cart, p])
                                                              ); toast.success("Add Product Sucessfully")
                                                    }}>
                                                        Add To Cart
                                                    </button>
                                                     <button className=" bg-blue-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold m-1"
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
           
      {/* <div className="container mt-3 category">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div className="card m-2" key={p._id}>
                  <img
                    src={`http://localhost:3000/api/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title">{p.name}</h5>
                      <h5 className="card-title card-price">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </h5>
                    </div>
                    <p className="card-text ">
                      {p.description.substring(0, 60)}...
                    </p>
                    <div className="card-name-price">
                      <button
                        className="btn btn-info ms-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button> */}
                      {/* <button
                    className="btn btn-dark ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    ADD TO CART
                  </button> */}
                    {/* </div>
                  </div>
                </div>
              ))}
            </div> */}
            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
          {/* </div>
        </div>
      </div> */}
    </Layout>
  );
};

export default CategoryProduct;