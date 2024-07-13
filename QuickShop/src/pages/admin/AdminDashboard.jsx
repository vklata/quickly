// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import ProductDetail from '../../components/admin/CreateProduct';
// import CreateCategory from '../../components/admin/CreateCategory';
// import UserDetail from '../../components/admin/UserDetail'
import { NavLink,Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {
    const [auth,setAuth]=useAuth();
    return (
       < Layout>
        <div>
            {/* Top */}
            {/* <div className="top mb-5 px-5 mt-5">
                <div className=" bg-pink-50 py-5 border border-pink-100 rounded-lg">
                    <h1 className=" text-center text-2xl font-bold text-pink-500">Admin Dashboard</h1>
                </div>
            </div> */}

            <div className="px-5">
                {/* Mid  */}
                <div className="mid mb-5">
                    {/* main  */}
                    <div className=" bg-pink-50 py-5 rounded-xl border border-pink-100">
                        {/* image  */}
                        <div className="flex justify-center">
                            <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="" />
                        </div>
                        {/* text  */}
                        <div className="">
                            <h1 className=" text-center text-lg text-pink-500"><span className=" font-bold">Name :</span>{auth.user.name}</h1>
                            <h1 className=" text-center text-lg text-pink-500"><span className=" font-bold">Email :</span>{auth.user.email}</h1>
                        </div>
                    </div>
                </div>
        <div className='text-center text-3xl font-bold text-black-500'><h1>Admin Panel</h1></div>

                {/* Bottom */}
                <div className="list-group  list-group-item-action top mb-5 px-5 mt-5">
  <Link to="/create-category" className="list-group-item list-group-item-action text-center text-2xl font-bold text-blue-500">Create Category</Link>
  <Link  to="/create-product" className="list-group-item list-group-item-action text-center text-2xl font-bold text-pink-500">Create Product</Link>
  <Link to="/users" className="list-group-item list-group-item-action text-center text-2xl font-bold text-yellow-500">Users</Link>
</div>
            </div>
        </div>
       
        </Layout>
    );
  
}

export default AdminDashboard;
