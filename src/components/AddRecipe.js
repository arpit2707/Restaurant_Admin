// src/components/AddRecipe.js
import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

const AddRecipe = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryCollection = collection(db, "categories");
      const categorySnapshot = await getDocs(categoryCollection);
      const categoryList = categorySnapshot.docs.map((doc) => doc.data());
      setCategories(categoryList);
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      const recipeRef = collection(db, "recipes");
      await addDoc(recipeRef, { name, category, ingredients, price, image });
      setName("");
      setCategory("");
      setIngredients("");
      setPrice("");
      setImage(null);
    }
  };

  return (
    <div>
      <h2>Add Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Recipe Name"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Ingredients"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
