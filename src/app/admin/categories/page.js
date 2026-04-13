"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import AdminLayout from '../AdminLayout';
import withAuth from '../withAuth';

function CategoriesAdminPage() {
  const [categories, setCategories] = useState([]);
  const [categoryForm, setCategoryForm] = useState({ name: '', description: '' });
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/api/category?all=true');
      setCategories(response.data || []);
    } catch (err) {
      console.error('Failed to fetch categories', err);
      setError('Failed to load categories.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (event) => {
    const { name, value } = event.target;
    setCategoryForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveCategory = async () => {
    if (!categoryForm.name.trim()) {
      setError('Category name is required.');
      return;
    }
    setLoading(true);
    setError('');
    setSuccessMessage('');
    try {
      const token = sessionStorage.getItem('token');
      if (editingCategoryId) {
        await axios.put(`/api/category?id=${editingCategoryId}`, categoryForm, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccessMessage('Category updated successfully.');
      } else {
        await axios.post('/api/category', categoryForm, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccessMessage('Category added successfully.');
      }
      setCategoryForm({ name: '', description: '' });
      setEditingCategoryId(null);
      fetchCategories();
    } catch (err) {
      console.error('Failed to save category', err);
      setError('Failed to save category.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategory = (category) => {
    setCategoryForm({ name: category.name || '', description: category.description || '' });
    setEditingCategoryId(category._id);
    setError('');
    setSuccessMessage('');
  };

  const handleCancelEdit = () => {
    setCategoryForm({ name: '', description: '' });
    setEditingCategoryId(null);
    setError('');
    setSuccessMessage('');
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Delete this category?')) {
      return;
    }
    setLoading(true);
    setError('');
    setSuccessMessage('');
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`/api/category?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccessMessage('Category deleted successfully.');
      fetchCategories();
    } catch (err) {
      console.error('Failed to delete category', err);
      setError('Failed to delete category.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1>Manage Categories</h1>
            <p className="text-muted">Add, edit and delete product categories from the admin panel.</p>
          </div>
          <button className="btn btn-secondary" onClick={() => router.push('/admin')}>
            Back to Dashboard
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{editingCategoryId ? 'Edit Category' : 'Add Category'}</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Category Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={categoryForm.name}
                  onChange={handleCategoryChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  value={categoryForm.description}
                  onChange={handleCategoryChange}
                />
              </div>
            </div>
            <div className="mt-3">
              <button className="btn btn-primary me-2" onClick={handleSaveCategory} disabled={loading}>
                {editingCategoryId ? 'Update Category' : 'Add Category'}
              </button>
              {editingCategoryId && (
                <button className="btn btn-secondary" onClick={handleCancelEdit} disabled={loading}>
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Category List</h5>
            {loading && !categories.length ? (
              <p>Loading categories...</p>
            ) : categories.length === 0 ? (
              <p>No categories found.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th style={{ width: '180px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr key={category._id}>
                        <td>{category.name}</td>
                        <td>{category.description}</td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => handleEditCategory(category)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteCategory(category._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default withAuth(CategoriesAdminPage);
