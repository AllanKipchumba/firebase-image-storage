import React from "react";
import { useState } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const App = () => {
  const [imageUpload, setImageUpload] = useState(null);

  const uploadImage = async () => {
    if (imageUpload == null) return;

    try {
      const imageRef = ref(
        storage,
        `profile-images/${imageUpload.name + v4()}`
      );
      await uploadBytes(imageRef, imageUpload);
      alert("uploaded");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setImageUpload(e.target.files[0])} />

      <button onClick={uploadImage}>Upload Image</button>
    </div>
  );
};

export default App;
