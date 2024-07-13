import { useState } from "react";
import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";


// // Search Data
// const searchData = [
//   {
//       name: 'Fashion',
//       image: 'https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg'
//   },
//   {
//       name: 'Shirt',
//       image: 'https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg'
//   },
//   {
//       name: 'Jacket',
//       image: 'https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg'
//   },
//   {
//       name: 'Mobile',
//       image: 'https://i.pinimg.com/564x/22/80/8d/22808d88ada424962f2e064f3075b2d1.jpg'
//   },
//   {
//       name: 'Laptop',
//       image: 'https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg'
//   },
//   {
//       name: 'Home',
//       image: 'https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg'
//   },
//   {
//       name: 'book',
//       image: 'https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg'
//   },
// ]

const SearchBar = () => {
   // Search State 
//    const [search, setSearch] = useState("");
   const [values, setValues] = useSearch();
   const navigate = useNavigate();
 
   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       const { data } = await axios.get(
         `http://localhost:3000/api/search/${values.keyword}`
       );
       setValues({ ...values, results: data });

       navigate("/search");
       
     } catch (error) {
       console.log(error);
     }
   };

  return(
<div>
<form
  className="d-flex search-form"
  role="search"
  onSubmit={handleSubmit}
>
  <input
    className="form-control me-2"
    type="search"
    placeholder="Search"
    aria-label="Search"
    value={values.keyword}
   
    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
  />
  <button className="btn  bg-orange-500 " type="submit">
    Search
  </button>
</form>
</div>
);
};


export default SearchBar;