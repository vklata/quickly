import { Link,useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import useCategory from "../../hooks/useCategory";



const Navbar = () => {
    const categories = useCategory();
    const [auth,setAuth]=useAuth();
    const[cart]=useCart();
    const navigate=useNavigate();
    const handlelogout=()=>{
        setAuth({
            ...auth,user:null,token:''
        })
        localStorage.removeItem("auth");
localStorage.removeItem("token");
toast.success("Logout Successfully")
navigate("/login")
    }
    // navList Data
    const navList = (
        <ul className="flex space-x-10 text-white font-bold text-md px-5 mt-6">
            {/* Home */}
            <li>
                <Link to={'/'}>Home</Link>
            </li>

            {/* All Product */}
            {(auth?.user?.role==1)?
            <li>
                <Link to={'/allproduct'}>Update-Products</Link>
            </li>:""}
            {(auth?.user?.role==0)?<li><Link to={'/user-dashboard'}>My orders</Link></li>:""}

            {/* Signup */}
            {(!localStorage.getItem("token"))?
            <li>
                <Link to={'/signup'}>Signup</Link>
            </li>:""}

            {(!localStorage.getItem("token"))?
            <li>
                <Link to={'/login'}>Login</Link>
            </li>:""}


         {(auth?.user?.role==1)?
                <li>
                <Link to={'/admin-dashboard'}>Admin</Link>
            </li>:""}

                        {(auth?.user?.role==0)?
                            <li>
                            <Link to={'/cart'}>
                            <Badge count={cart?.length} showZero offset={[10, -4]}>
                    Cart
                  </Badge>
                            </Link>
                        </li>:""}
                        {(auth?.user?.role==1)?
                            <li>
                            <Link to={'/cart'}>
                            <Badge count={cart?.length} showZero offset={[10, -4]}>
                    Cart
                  </Badge>
                            </Link>
                        </li>:""}


             
                        <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                //   to={"/categories"}
                  data-bs-toggle="dropdown"
                  role="button"
                  href="#"
                  aria-expanded="false"
                >
                  Categories
                </a>
                <ul className="dropdown-menu">
               
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        // href="#"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
             ))}
                </ul>
                    
              </li>



            {(localStorage.getItem("token"))?
            <li onClick={handlelogout}>
                 <Link to={""}>
                     Logout
                 </Link>
             </li>:""}



        </ul>
    )
    return (
        <nav className="bg-blue-700 sticky top-0">
            {/* main  */}
            <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
                {/* left  */}
                <div className="left py-3 lg:py-0">
                    <Link to={'/'}>
                    <h2 className=" font-bold text-white text-2xl text-center">Quick-Order</h2>
                    </Link>
                </div>

                {/* right  */}
                <div className="right flex justify-center mb-4 lg:mb-0">
                    {navList}
                </div>

                {/* Search Bar  */}
                <SearchBar />
            </div>
        </nav>
    );
}

export default Navbar;