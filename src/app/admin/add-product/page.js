"use client";

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import dynamic from 'next/dynamic';
import AdminLayout from '../AdminLayout';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

function AddEditProductPageContent() {
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    description: '',
    url: '',
    image: '',
    category: '',
    subCategory: '',
    shortDescription: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    slug: '',
    canonicalUrl: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    googleSiteVerification: '',
    msvalidate: '',
    pDomainVerify: '',
    ogSiteName: '',
    ogType: '',
    articlePublishedTime: '',
    articleModifiedTime: '',
    twitterCard: '',
    twitterDomain: '',
    twitterTitle: '',
    twitterDescription: '',
    google: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [showAddSubCategory, setShowAddSubCategory] = useState(false);
  const [newSubCategory, setNewSubCategory] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const editor = useRef(null);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      fetchProduct(id);
    }
    fetchCategories();
  }, [searchParams]);

  const fetchCategories = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get('/api/category?all=true', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data || []);
    } catch (err) {
      console.error('Failed to fetch categories', err);
    }
  };

  const fetchSubCategories = async (categoryId) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(`/api/category?parent=${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubCategories(response.data || []);
    } catch (err) {
      console.error('Failed to fetch sub-categories', err);
    }
  };

  const fetchProduct = async (id) => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(`/api/product?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData(response.data);
      setIsEditing(true);
    } catch (err) {
      console.error('Failed to fetch product', err);
      setError('Failed to fetch product');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    const imageData = new FormData();
    imageData.append('image', file);
  
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post('/api/upload', imageData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData({ ...formData, [field]: response.data.imageUrl });
    } catch (err) {
      console.error('Failed to upload image', err);
      setError('Failed to upload image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const id = searchParams.get('id');
    try {
      const token = sessionStorage.getItem('token');
      if (isEditing) {
        await axios.put(`/api/product?id=${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post('/api/product', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      router.push('/admin');
    } catch (err) {
      console.error('Failed to save product', err);
      setError('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post('/api/category', { name: newCategory, description: '' }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories([...categories, response.data]);
      setFormData({ ...formData, category: newCategory });
      setNewCategory('');
      setShowAddCategory(false);
    } catch (err) {
      console.error('Failed to add category', err);
      setError('Failed to add category');
    }
  };

  const handleAddSubCategory = async () => {
    if (!newSubCategory.trim()) return;
    try {
      const token = sessionStorage.getItem('token');
      const selectedCat = categories.find(cat => cat.name === formData.category);
      if (!selectedCat) {
        setError('Please select a category first');
        return;
      }
      const response = await axios.post('/api/category', { 
        name: newSubCategory, 
        description: '',
        parentCategory: selectedCat._id 
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubCategories([...subCategories, response.data]);
      setFormData({ ...formData, subCategory: newSubCategory });
      setNewSubCategory('');
      setShowAddSubCategory(false);
    } catch (err) {
      console.error('Failed to add sub-category', err);
      setError('Failed to add sub-category');
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <AdminLayout>
      <div className="container mt-5">
        <button className="btn btn-secondary mb-3" onClick={handleBack}>
          Back
        </button>
        <h1>{isEditing ? 'Edit Product' : 'Add Product'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <JoditEditor
              ref={editor}
              value={formData.description}
              onChange={(newContent) => setFormData({ ...formData, description: newContent })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="url" className="form-label">URL</label>
            <input
              type="text"
              className="form-control"
              id="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Image</label>
            {formData.image && (
              <div className="mb-3">
                <img src={formData.image} alt="Current Image" style={{ maxWidth: '200px' }} />
              </div>
            )}
            <input
              type="file"
              className="form-control"
              id="image"
              onChange={(e) => handleImageUpload(e, 'image')}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              className="form-control"
              id="category"
              value={formData.category}
              onChange={(e) => {
                if (e.target.value === 'add-new') {
                  setShowAddCategory(true);
                } else {
                  setFormData({ ...formData, category: e.target.value, subCategory: '' });
                  setShowAddCategory(false);
                  // Fetch sub-categories for selected category
                  const selectedCat = categories.find(cat => cat.name === e.target.value);
                  if (selectedCat) {
                    fetchSubCategories(selectedCat._id);
                  }
                }
              }}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
              <option value="add-new">Add New Category</option>
            </select>
            {showAddCategory && (
              <div className="mt-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="New Category Name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-primary mt-2 me-2"
                  onClick={handleAddCategory}
                >
                  Add Category
                </button>
                <button
                  type="button"
                  className="btn btn-secondary mt-2"
                  onClick={() => setShowAddCategory(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="subCategory" className="form-label">Sub Category</label>
            <select
              className="form-control"
              id="subCategory"
              value={formData.subCategory}
              onChange={(e) => {
                if (e.target.value === 'add-new') {
                  setShowAddSubCategory(true);
                } else {
                  setFormData({ ...formData, subCategory: e.target.value });
                  setShowAddSubCategory(false);
                }
              }}
            >
              <option value="">Select Sub Category (Optional)</option>
              {subCategories.map((subCat) => (
                <option key={subCat._id} value={subCat.name}>
                  {subCat.name}
                </option>
              ))}
              <option value="add-new">Add New Sub Category</option>
            </select>
            {showAddSubCategory && (
              <div className="mt-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="New Sub Category Name"
                  value={newSubCategory}
                  onChange={(e) => setNewSubCategory(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-primary mt-2 me-2"
                  onClick={handleAddSubCategory}
                >
                  Add Sub Category
                </button>
                <button
                  type="button"
                  className="btn btn-secondary mt-2"
                  onClick={() => setShowAddSubCategory(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="shortDescription" className="form-label">Short Description</label>
            <textarea
              className="form-control"
              id="shortDescription"
              rows="2"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="metaTitle" className="form-label">Meta Title</label>
            <input
              type="text"
              className="form-control"
              id="metaTitle"
              value={formData.metaTitle}
              onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="metaDescription" className="form-label">Meta Description</label>
            <textarea
              className="form-control"
              id="metaDescription"
              rows="2"
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="metaKeywords" className="form-label">Meta Keywords</label>
            <input
              type="text"
              className="form-control"
              id="metaKeywords"
              value={formData.metaKeywords}
              onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="slug" className="form-label">Slug</label>
            <input
              type="text"
              className="form-control"
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="canonicalUrl" className="form-label">Canonical URL</label>
            <input
              type="text"
              className="form-control"
              id="canonicalUrl"
              value={formData.canonicalUrl}
              onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ogTitle" className="form-label">OG Title</label>
            <input
              type="text"
              className="form-control"
              id="ogTitle"
              value={formData.ogTitle}
              onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ogDescription" className="form-label">OG Description</label>
            <textarea
              className="form-control"
              id="ogDescription"
              rows="2"
              value={formData.ogDescription}
              onChange={(e) => setFormData({ ...formData, ogDescription: e.target.value })}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="ogImage" className="form-label">OG Image</label>
            {formData.ogImage && (
              <div className="mb-3">
                <img src={formData.ogImage} alt="Current OG Image" style={{ maxWidth: '200px' }} />
              </div>
            )}
            <input
              type="file"
              className="form-control"
              id="ogImage"
              onChange={(e) => handleImageUpload(e, 'ogImage')}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="googleSiteVerification" className="form-label">Google Site Verification</label>
            <input
              type="text"
              className="form-control"
              id="googleSiteVerification"
              value={formData.googleSiteVerification}
              onChange={(e) => setFormData({ ...formData, googleSiteVerification: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="msvalidate" className="form-label">MS Validate</label>
            <input
              type="text"
              className="form-control"
              id="msvalidate"
              value={formData.msvalidate}
              onChange={(e) => setFormData({ ...formData, msvalidate: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pDomainVerify" className="form-label">P Domain Verify</label>
            <input
              type="text"
              className="form-control"
              id="pDomainVerify"
              value={formData.pDomainVerify}
              onChange={(e) => setFormData({ ...formData, pDomainVerify: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ogSiteName" className="form-label">OG Site Name</label>
            <input
              type="text"
              className="form-control"
              id="ogSiteName"
              value={formData.ogSiteName}
              onChange={(e) => setFormData({ ...formData, ogSiteName: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ogType" className="form-label">OG Type</label>
            <input
              type="text"
              className="form-control"
              id="ogType"
              value={formData.ogType}
              onChange={(e) => setFormData({ ...formData, ogType: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="articlePublishedTime" className="form-label">Article Published Time</label>
            <input
              type="text"
              className="form-control"
              id="articlePublishedTime"
              value={formData.articlePublishedTime}
              onChange={(e) => setFormData({ ...formData, articlePublishedTime: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="articleModifiedTime" className="form-label">Article Modified Time</label>
            <input
              type="text"
              className="form-control"
              id="articleModifiedTime"
              value={formData.articleModifiedTime}
              onChange={(e) => setFormData({ ...formData, articleModifiedTime: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="twitterCard" className="form-label">Twitter Card</label>
            <input
              type="text"
              className="form-control"
              id="twitterCard"
              value={formData.twitterCard}
              onChange={(e) => setFormData({ ...formData, twitterCard: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="twitterDomain" className="form-label">Twitter Domain</label>
            <input
              type="text"
              className="form-control"
              id="twitterDomain"
              value={formData.twitterDomain}
              onChange={(e) => setFormData({ ...formData, twitterDomain: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="twitterTitle" className="form-label">Twitter Title</label>
            <input
              type="text"
              className="form-control"
              id="twitterTitle"
              value={formData.twitterTitle}
              onChange={(e) => setFormData({ ...formData, twitterTitle: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="twitterDescription" className="form-label">Twitter Description</label>
            <input
              type="text"
              className="form-control"
              id="twitterDescription"
              value={formData.twitterDescription}
              onChange={(e) => setFormData({ ...formData, twitterDescription: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="google" className="form-label">Google</label>
            <input
              type="text"
              className="form-control"
              id="google"
              value={formData.google}
              onChange={(e) => setFormData({ ...formData, google: e.target.value })}
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? 'Saving...' : isEditing ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}

export default function AddEditProductPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddEditProductPageContent />
    </Suspense>
  );
}