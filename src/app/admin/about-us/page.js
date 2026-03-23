"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/navigation'; // Removed useSearchParams as it's not used
import dynamic from "next/dynamic";
import axios from "axios";
import AdminLayout from "../AdminLayout";

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function AboutUsEditor() {
  const [form, setForm] = useState({
    content: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const editor = useRef(null);

  useEffect(() => {
    // Fetch existing "About Us" content and metadata
    axios.get("/api/about").then(res => {
      if (res.data) {
        setForm({
          content: res.data.content || "",
          metaTitle: res.data.metaTitle || "",
          metaDescription: res.data.metaDescription || "",
          metaKeywords: res.data.metaKeywords || "",
        });
      }
    }).catch(err => {
      console.error("Failed to fetch About Us data:", err);
      setMessage("Failed to load About Us data.");
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleContentChange = (newContent) => {
    setForm(prevForm => ({
      ...prevForm,
      content: newContent,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      // Send all form data, including new meta fields, to the API
      await axios.put("/api/about", form);
      setMessage("About Us updated successfully!");
    } catch (err) {
      console.error("Error updating About Us:", err);
      setMessage("Failed to update About Us. Please try again.");
    }
    setLoading(false);
  };

  const handleBack = () => {
    router.push('/admin');
  };

  return (
    <AdminLayout>
      <div className="container py-4">
        <button className="btn btn-secondary mb-3" onClick={handleBack}>
          Back
        </button>
        <h2>Edit About Us</h2>
        <form onSubmit={handleSubmit}>
          {/* Meta Title */}
          <div className="mb-3">
            <label htmlFor="metaTitle" className="form-label">Meta Title</label>
            <input
              type="text"
              className="form-control"
              id="metaTitle"
              name="metaTitle"
              value={form.metaTitle}
              onChange={handleChange}
              placeholder="Enter meta title for SEO"
            />
          </div>

          {/* Meta Description */}
          <div className="mb-3">
            <label htmlFor="metaDescription" className="form-label">Meta Description</label>
            <textarea
              className="form-control"
              id="metaDescription"
              name="metaDescription"
              rows="3"
              value={form.metaDescription}
              onChange={handleChange}
              placeholder="Enter meta description for SEO"
            ></textarea>
          </div>

          {/* Meta Keywords */}
          <div className="mb-3">
            <label htmlFor="metaKeywords" className="form-label">Meta Keywords</label>
            <input
              type="text"
              className="form-control"
              id="metaKeywords"
              name="metaKeywords"
              value={form.metaKeywords}
              onChange={handleChange}
              placeholder="Enter comma-separated keywords for SEO"
            />
          </div>

          {/* Content Editor */}
          <div className="mb-3">
            <label>Content</label>
            <JoditEditor
              ref={editor}
              value={form.content || ""}
              onChange={handleContentChange}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
          {message && (
            <div
              className={`mt-3 alert ${message.includes("successfully") ? "alert-success" : "alert-danger"}`}
              role="alert"
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </AdminLayout>
  );
}