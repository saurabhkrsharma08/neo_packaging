"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { truncateText } from "../utills/utills";

const BlogLists = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const response = await axios.get('/api/blog?all=true');
          setBlogs(response.data);
        } catch (err) {
            console.log(err);
          setError('Failed to fetch blogs');
        } finally {
          setLoading(false);
        }
      };
  
      fetchBlogs();
    }, []);

  return (
    <div className="page-content py-3 mb-lg-3 py-lg-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Blog and events</li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="row">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
              blogs.map((blog) => (
                <div key={blog._id} className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                  <div className="card cardBlog">
                    <img src={blog.image} className="card-img-top" alt={blog.title} />
                    <div className="card-body">
                      <div className="card-title">{blog.title}</div>
                      <div className="is-divider"></div>
                      <p className="card-text">{truncateText(blog.shortDescription, 40)}</p>
                      <a href={`/${blog.slug}`} className="btn btn-readMore stretched-link" title={blog.title}>
                        READ MORE <FontAwesomeIcon icon={faPlus} />
                      </a>
                    </div>
                    <div className="cardBlogdate">
                      <div className="carddate">{new Date(blog.createdAt).getDate()}</div>
                      <p>{new Date(blog.createdAt).toLocaleString('default', { month: 'short' })}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
  );
};

export default BlogLists;
