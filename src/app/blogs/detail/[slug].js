"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import AboutUSImg from "../../../public/images/aboutUs-banner.jpg";
import styles from '../../../public/styles/page.module.scss';
import { faClock, faFilePdf, faFileText, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';

const formatDate = (value) => {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-GB", { timeZone: "UTC" });
};

const formatDateTime = (value) => {
  if (!value) return "";
  return new Date(value).toLocaleString("en-GB", {
    timeZone: "UTC",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      const fetchBlog = async () => {
        try {
          const response = await axios.get(`/api/blog/${slug}`);
          setBlog(response.data);
        } catch (err) {
          console.log(err)
          setError('Failed to fetch blog');
        } finally {
          setLoading(false);
        }
      };

      fetchBlog();
    }
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!blog) {
    return <p>No blog found</p>;
  }

  return (
    <>
      <div className="banner w-100">
        <Image src={AboutUSImg} alt="Banner" className="w-100" />
        <div className="banner-content">
          <h1>{blog.title}</h1>
        </div>
      </div>
      <div className="page-content py-3 mb-lg-3 py-lg-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/">Home</a></li>
                  <li className="breadcrumb-item"><a href="/blog">Blog and events</a></li>
                  <li className="breadcrumb-item active" aria-current="page">{blog.title}</li>
                </ol>
              </nav>
            </div>
            <div className="col-12 col-lg-7">
              <div id="post-2308" className="blog-detail">
                <div className="entry-header">
                  <h2 className="content-heading">{blog.title}</h2>
                  <div className="entry-meta d-flex mb-3">
                    <div className="by-author author"><span className="d-flex"><a href="#" title='admin'>
                      <FontAwesomeIcon icon={faUser} /> Admin </a></span>
                    </div>
                    <div className="date d-flex ms-3"><a href="#" title={formatDateTime(blog.date)}>
                      <FontAwesomeIcon icon={faClock} /> {formatDate(blog.date)} </a>
                    </div>
                  </div>
                </div>
                <div className="entry-content">
                  <div className="wp-caption">
                    <img aria-describedby="caption-attachment" decoding="async" className="img-fluid" src={blog.image} alt={blog.title} />
                    <p id="caption-attachment" className="wp-caption-text">{blog.imageCaption}</p>
                  </div>
                  <p>{blog.content}</p>
                  <h2 className="border-title mt-4">Benefits of Drag chain conveyors</h2>
                  <ul className="bullet-list mb-4 mb-lg-4">
                    {blog.benefits.map((benefit, index) => (
                      <li key={index}><strong>{benefit}</strong></li>
                    ))}
                  </ul>
                </div>
                <div className="entry-meta">
                  <span className="tag-links">
                    {blog.tags.map((tag, index) => (
                      <a key={index} href={`/tag/${tag}`} rel="tag">{tag}</a>
                    ))}
                  </span>
                </div>
                <ul className="default-wp-page">
                  {blog.previousPost && (
                    <li className="previous">
                      <a href={`/${blog.previousPost.slug}`} rel="prev"><span className="meta-nav">←</span> {blog.previousPost.title}</a>
                    </li>
                  )}
                  {blog.nextPost && (
                    <li className="next">
                      <a href={`/${blog.nextPost.slug}`} rel="next">{blog.nextPost.title} <span className="meta-nav">→</span></a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="col-12 col-lg-1"></div>
            <div className="col-12 col-lg-4">
              <div className="blog-sidebar">
                <h2 className="border-title color-black">Recent Posts</h2>
                <div className="recent-posts">
                  {blog.recentPosts.map((post) => (
                    <div key={post._id} className="post">
                      <img src={post.image} className="img-fluid" alt={post.title} />
                      <div className="recent-post-data">
                        <div className="recent-post-title">{post.title}</div>
                        <div className="date d-flex"><a href={`/${post.slug}`} title={formatDateTime(post.date)}>
                          <FontAwesomeIcon icon={faClock} /> {formatDate(post.date)} </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.homebrochureSection} container-fluid mt-3 mt-lg-3`}>
        <div className="row">
           <Link href="/contact" className={`${styles.homebrochureLeft} col-12 col-lg-6`}>
              <div>
                <FontAwesomeIcon icon={faFileText} />
                <h3>Get It Now</h3>
              </div>
            </Link>

            <Link href="../pdf/Catalog_Neo_Conveyors.pdf" target="_blank" rel="noopener noreferrer" className={`${styles.homebrochureRight} col-12 col-lg-6`}>
              <div>
                <FontAwesomeIcon icon={faFilePdf} />
                <h3>Discover Our Brochure</h3>
              </div>
            </Link>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;