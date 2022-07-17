import React, { useEffect } from "react";
import { useState } from "react";
import { storage } from "./firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import "./app.css";

const App = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const imageListRef = ref(storage, "profile-images/");
  const [imageURL, setImageURL] = useState([]);

  const uploadImage = async () => {
    if (imageUpload == null) return;

    try {
      const imageRef = ref(
        storage,
        `profile-images/${imageUpload.name + v4()}`
      );
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageURL((prev) => [...prev, url]);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // load the pictures each time it is uploaded
  useEffect(() => {
    try {
      listAll(imageListRef).then((res) => {
        console.log(res.items);
        res.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageURL((prev) => [...prev, url]);
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="App">
      <input type="file" onChange={(e) => setImageUpload(e.target.files[0])} />

      <button onClick={uploadImage}>Upload Image</button>

      {imageURL.map((url) => {
        return <img src={url} alt="/" className="img" />;
      })}
    </div>
  );
};

export default App;
