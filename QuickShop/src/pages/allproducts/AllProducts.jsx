import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { useState ,useEffect} from "react";
import { toast } from 'react-toastify';
import axios from "axios";
import { useCart } from "../../context/cart";

const AllProducts = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const[cart,setCart]=useCart();

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
    return (
        <Layout>
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
                                            className="lg:h-60  h-96 w-full"
                                     
                                        src={`http://localhost:3000/api/product-photo/${p._id}`}
                                      
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
                                                              );  toast.success("Add Product Sucessfully")
                                                    }}>
                                                    Add To Cart
                                                </button>
                                                <button className=" bg-blue-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold m-1" onClick={()=> navigate(`/allproduct/${p.slug}`)}>
                                                    Update-Product
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
        </Layout>
    // <Layout>
//     <div className="row dashboard">

//       <div className="col-md-9 ">
//         <h1 className="text-center">All Products List</h1>
//         <div className="d-flex flex-wrap">
//           {products?.map((p) => (
//             <Link
//               key={p._id}
            //   to={`/dashboard/admin/product/${p.slug}`}
//               className="product-link"
//             >
//               <div className="card m-2" style={{ width: "18rem" }}>
//                 <img
//                   src={`http://localhost:3000/api/product-photo/${p._id}`}
//                   className="card-img-top"
//                   alt={p.name}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{p.name}</h5>
//                   <p className="card-text">{p.description}</p>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   </Layout>
    );
}

export default AllProducts;
