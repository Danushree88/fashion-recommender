import { useState } from "react";

function Upload() {
  const [image, setImage] = useState(null);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Upload Your Outfit</h2>
      <input type="file" accept="image/*" onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))} />
      {image && <img src={image} alt="Preview" className="mt-4 w-64 rounded" />}
    </div>
  );
}

export default Upload;
