"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Dnd Kit Imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import withAuth from './withAuth';
import AdminLayout from './AdminLayout';

// Component to make each table row sortable
function SortableProductRow({ product, index, handleEdit, handleDeleteProduct }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: product._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 'auto',
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={isDragging ? 'table-primary' : ''}
    >
      {/* Drag handle icon */}
      <td {...listeners} style={{ cursor: 'grab' }} title="Drag to reorder">
        ≡
      </td>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>
        <button
          className="btn btn-warning btn-sm me-2"
          onClick={(e) => {
            e.stopPropagation(); // Prevent drag if clicked
            handleEdit(product._id);
          }}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={(e) => {
            e.stopPropagation(); // Prevent drag if clicked
            handleDeleteProduct(product._id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}


function AdminPage() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [about, setAbout] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryForm, setCategoryForm] = useState({ name: '', description: '' });
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [productDescription, setProductDescription] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  // Dnd Kit Sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    // Re-fetch data when activeTab changes, but only for the specific tab
    if (activeTab === 'products') {
      fetchProducts();
    } else if (activeTab === 'blogs') {
      fetchBlogs();
    } else if (activeTab === 'contacts') {
      fetchContacts();
    } else if (activeTab === 'about') {
      fetchAbout();
    } else if (activeTab === 'categories') {
      fetchCategories();
    } else if (activeTab === 'description') {
      fetchProductDescription();
    }
  }, [activeTab]); // Fetch data whenever the activeTab changes

  const fetchProducts = async () => {
    setLoading(true);
    setError(''); // Clear previous errors
    try {
      const response = await axios.get('/api/product?all=true');
      // Assume products come sorted by priority from the backend initially
      setProducts(response.data);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogs = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/api/blog?all=true');
      setBlogs(response.data);
    } catch (err) {
      setError('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const fetchContacts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/api/contact');
      setContacts(response.data);
    } catch (err) {
      setError('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/api/category?all=true');
      setCategories(response.data);
    } catch (err) {
      setError('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const fetchProductDescription = async () => {
    setError('');
    try {
      const response = await axios.get('/api/product-description');
      setProductDescription(response.data || { title: '', description: '' });
    } catch (err) {
      setError('Failed to fetch product description');
    }
  };

  const fetchAbout = async () => {
    setError('');
    try {
      const response = await axios.get('/api/about');
      setAbout(response.data);
    } catch (err) {
      setError('Failed to fetch about info');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    setError('');
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`/api/product?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts(); // Re-fetch products to update the list
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) {
      return;
    }
    setError('');
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`/api/blog?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchBlogs(); // Re-fetch blogs to update the list
    } catch (err) {
      setError('Failed to delete blog');
    }
  };

  const handleEdit = (id) => {
    if (activeTab === 'products') {
      router.push(`/admin/add-product?id=${id}`);
    } else if (activeTab === 'blogs') {
      router.push(`/admin/add-blog?id=${id}`);
    }
  };

  const handleAdd = () => {
    if (activeTab === 'products') {
      router.push('/admin/add-product');
    } else if (activeTab === 'blogs') {
      router.push('/admin/add-blog');
    }
  };

  const handleCategoryFormChange = (e) => {
    const { name, value } = e.target;
    setCategoryForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveCategory = async () => {
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
      setError('Failed to save category');
    }
  };

  const handleEditCategory = (category) => {
    setCategoryForm({ name: category.name, description: category.description || '' });
    setEditingCategoryId(category._id);
    setSuccessMessage('');
    setError('');
  };

  const handleCancelCategoryEdit = () => {
    setCategoryForm({ name: '', description: '' });
    setEditingCategoryId(null);
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }
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
      setError('Failed to delete category');
    }
  };

  const handleSaveDescription = async () => {
    setError('');
    setSuccessMessage('');
    try {
      const token = sessionStorage.getItem('token');
      await axios.put('/api/product-description', productDescription, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccessMessage('Product description updated successfully.');
      fetchProductDescription();
    } catch (err) {
      setError('Failed to save product description');
    }
  };

  const handleDescriptionChange = (e) => {
    const { name, value } = e.target;
    setProductDescription((prev) => ({ ...prev, [name]: value }));
  };

  // --- Dnd Kit Logic for Products ---
  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setProducts((items) => {
        const oldIndex = items.findIndex((item) => item._id === active.id);
        const newIndex = items.findIndex((item) => item._id === over.id);

        const newOrder = arrayMove(items, oldIndex, newIndex);

        // Prepare updates for the database
        const updates = newOrder.map((product, index) => ({
          id: product._id,
          priority: index, // Assign new priority based on the new order (0, 1, 2...)
        }));

        // Send updates to the backend
        setLoading(true);
        setError('');
        setSuccessMessage('');
        const token = sessionStorage.getItem('token');
        axios.put('/api/product/reorder', { updates }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
           setSuccessMessage('Product priorities updated successfully!'); // Set success message
          // Optionally, hide the message after a few seconds
          setTimeout(() => setSuccessMessage(''), 3000);
        })
        .catch(err => {
          setError('Failed to reorder products. Please refresh and try again.');
          // If saving fails, re-fetch original order to revert visual changes
          fetchProducts();
        })
        .finally(() => {
          setLoading(false);
        });

        return newOrder; // Update local state immediately for smooth UI
      });
    }
  }
  // --- End Dnd Kit Logic ---

  return (
    <AdminLayout>
      <div className="container mt-4">
        <h1>Admin Dashboard</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>} {/* Add this line */}
        {loading && <div className="alert alert-info">Loading...</div>}

        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              About Us
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              Products
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 'blogs' ? 'active' : ''}`}
              onClick={() => setActiveTab('blogs')}
            >
              Blogs
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 'categories' ? 'active' : ''}`}
              onClick={() => setActiveTab('categories')}
            >
              Categories
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 'contacts' ? 'active' : ''}`}
              onClick={() => setActiveTab('contacts')}
            >
              Contacts
            </a>
          </li>
        </ul>

        <div className="tab-content mt-3">
          {activeTab === 'about' && (
            <div className="tab-pane fade show active">
              <button
                className="btn btn-primary mb-3"
                onClick={() => router.push('/admin/about-us')}
              >
                Edit About Us
              </button>
              {about ? (
                <div className="card">
                  {about.bannerImage && (
                    <img
                      src={about.bannerImage}
                      alt="Banner"
                      className="card-img-top"
                      style={{ maxHeight: 200, objectFit: 'cover' }}
                    />
                  )}
                  <div className="card-body">
                    <div dangerouslySetInnerHTML={{ __html: about.content }} />
                  </div>
                </div>
              ) : (
                <p>No About Us content found.</p>
              )}
            </div>
          )}

          {activeTab === 'products' && (
            <div className="tab-pane fade show active">
              <button className="btn btn-primary mb-3" onClick={handleAdd}>
                Add Product
              </button>
              {loading && products.length === 0 ? (
                <p>Loading products...</p>
              ) : error ? (
                <p className="text-danger">{error}</p>
              ) : (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={products.map(p => p._id)} // Pass only the IDs to SortableContext
                    strategy={verticalListSortingStrategy}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Priority</th>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product, index) => (
                          <SortableProductRow
                            key={product._id}
                            product={product}
                            index={index}
                            handleEdit={handleEdit}
                            handleDeleteProduct={handleDeleteProduct}
                          />
                        ))}
                      </tbody>
                    </table>
                  </SortableContext>
                </DndContext>
              )}
            </div>
          )}

          {activeTab === 'blogs' && (
            <div className="tab-pane fade show active">
              <button className="btn btn-primary mb-3" onClick={handleAdd}>
                Add Blog
              </button>
              {loading && blogs.length === 0 ? (
                <p>Loading blogs...</p>
              ) : error ? (
                <p className="text-danger">{error}</p>
              ) : (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.map((blog) => (
                      <tr key={blog._id}>
                        <td>{blog.title}</td>
                        <td>{blog.author}</td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => handleEdit(blog._id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteBlog(blog._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="tab-pane fade show active">
              <div className="card mb-4">
                <div className="card-body">
                  <h5>{editingCategoryId ? 'Edit Category' : 'Add Category'}</h5>
                  <div className="mb-3">
                    <label className="form-label">Category Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={categoryForm.name}
                      onChange={handleCategoryFormChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      name="description"
                      className="form-control"
                      rows="3"
                      value={categoryForm.description}
                      onChange={handleCategoryFormChange}
                    />
                  </div>
                  <button className="btn btn-primary me-2" onClick={handleSaveCategory}>
                    {editingCategoryId ? 'Update Category' : 'Add Category'}
                  </button>
                  {editingCategoryId && (
                    <button className="btn btn-secondary" onClick={handleCancelCategoryEdit}>
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {loading && categories.length === 0 ? (
                <p>Loading categories...</p>
              ) : error ? (
                <p className="text-danger">{error}</p>
              ) : (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Actions</th>
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
              )}
            </div>
          )}

          {activeTab === 'description' && (
            <div className="tab-pane fade show active">
              <div className="card mb-4">
                <div className="card-body">
                  <h5>Edit Product Description</h5>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={productDescription.title}
                      onChange={handleDescriptionChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      name="description"
                      className="form-control"
                      rows="6"
                      value={productDescription.description}
                      onChange={handleDescriptionChange}
                    />
                  </div>
                  <button className="btn btn-primary" onClick={handleSaveDescription}>
                    Save Description
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="tab-pane fade show active">
              {loading && contacts.length === 0 ? (
                <p>Loading contacts...</p>
              ) : error ? (
                <p className="text-danger">{error}</p>
              ) : (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Company</th>
                      <th>Country</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact._id}>
                        <td>{contact.contact_name}</td>
                        <td>{contact.contact_email}</td>
                        <td>{contact.contact_mobile}</td>
                        <td>{contact.company_name}</td>
                        <td>{contact.contact_country}</td>
                        <td>{contact.contact_message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default withAuth(AdminPage);