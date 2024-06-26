// src/components/AdminDashboard.js
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import AddCategory from "./AddCategory";
import AddRecipe from "./AddRecipe";
// import Orders from "./Orders";

const AdminDashboard = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/signin");
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryCollection = collection(db, "categories");
      const categorySnapshot = await getDocs(categoryCollection);
      const categoryList = categorySnapshot.docs.map((doc) => doc.data());
      setCategories(categoryList);
    };

    fetchCategories();
  }, []);

  return (
    <div className="container  ">
      <div className="d-flex justify-content-between">
        <h2>Admin Dashboard</h2>
        <button className="btn btn-primary" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
      <div className="d-flex flex-column ">
        <div className="mt-3 mb-3">
          <h3 className="text-center">Categories</h3>
          <ul>
            {categories.map((category, index) => (
              <li key={index}>{category.name}</li>
            ))}
          </ul>
          <div className="border p-3 rounded border-dark">
            <h4 className="text-center">Add New Category</h4>
            <AddCategory />
          </div>
        </div>
        <h3 className="text-center ">Recipes</h3>
        <div className="mt-3 mb-3 border p-3 rounded border-dark">
          <h3 className="text-center">Add New Recipe</h3>
          <AddRecipe />
        </div>
        {/* <div>
          <h3>Orders</h3>
          <Orders />
        </div> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
