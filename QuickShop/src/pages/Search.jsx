import React from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/search";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const [values, setValues] = useSearch();
  const [cart,setCart]=useCart();
  const navigate = useNavigate();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          {/* <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`http://localhost:3000/api/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button class="btn btn-primary ms-1">More Details</button>






                  <button class="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div> */}
          <section className="text-gray-600 body-font">
                    <div className="container px-5 lg:px-0 py-5 mx-auto">
                        <div className="flex flex-wrap -m-4" >
                            {values?.results.map((p) => (
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
                                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
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
        </div>
      {/* </div> */}
    </Layout>
  );
};

export default Search;