import { useState } from 'react'
import './NewTrip.css'
import { useTrip } from "../TripContext";
import img from "/src/assets/coverImg.jpeg"
const API = import.meta.env.VITE_BACKEND_URL;

export default function CoverImages({ setFieldValue }) {
  const { tripData, setTripData } = useTrip();
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1️⃣ Show preview immediately
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    // 2️⃣ Prepare FormData for upload
    const formData = new FormData();
    formData.append("cover", file);

    try {
      setUploading(true);
      // 3️⃣ Upload to backend → backend uploads to Cloudinary
      const res = await fetch(`${API}/uploadCover`, {
        method: "POST",
        body: formData,
        credentials: "include"
      });

      const data = await res.json();

      if (data.success) {
        // 4️⃣ Save Cloudinary URL to global trip data
        //setTripData({ ...tripData, cover: data.imageUrl });
        // save data in formik state : 
        setFieldValue("cover", data.imageUrl);
      } else {
        alert("Failed to upload image.");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Something went wrong while uploading the cover image!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
     

    <div className="cover-section">
 <label htmlFor="cover">Cover</label>
      {preview ? (
        <img src={preview} alt="cover preview" className='cover-preview-box'/>
      ) : <img src={img} alt='jaipur' className='coverImg'/>}

      <div className="cover-actions">
        <label className="upload-btn">
          {uploading ? "Uploading..." : "Upload from Device"}
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            onChange={handleFileChange}
            hidden
          />
        </label>
      </div>
    </div>
    </>
  );
}
