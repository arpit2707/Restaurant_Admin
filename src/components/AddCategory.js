// src/components/AddCategory.js
import React, { useState } from "react";
import { db, storage } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      try {
        const imageRef = ref(storage, `categories/${image.name}`);

        await uploadBytes(imageRef, image);

        const imageUrl = await getDownloadURL(imageRef);

        const categoryRef = collection(db, "categories");
        await addDoc(categoryRef, { name, imageUrl });

        setName("");
        setImage(null);
        setError("");
      } catch (error) {
        console.error("Error adding category: ", error);
        setError("Error adding category. Please try again.");
      }
    } else {
      setError("Please select an image.");
    }
  };

  return (
    <div className="container">
      <h5 className="text-start">Add Category</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
        />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategory;
