"use client";

import Image from "next/image";
import Link from "next/link";
import AboutUSImg from "../../../../public/images/aboutUs-banner.jpg";
import styles from "../../../../public/styles/page.module.scss";
import { faClock, faFilePdf, faFileText, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";

const BlogDetail = ({ blog }) => {
  if (!blog) return <p>No blog found</p>;

  return (
    <>
      <Head>
        <title>{blog.metaTitle || blog.title}</title>
        <meta name="description" content={blog.metaDescription || blog.description} />
        <meta name="keywords" content={blog.metaKeywords || "default, keywords"} />
        {blog.canonicalUrl && (
          <link
            rel="canonical"
            href={`https://www.neoconveyors.com/blogs/${blog.canonicalUrl}`}
          />
        )}
        {blog.ogTitle && <meta property="og:title" content={blog.ogTitle} />}
        {blog.ogDescription && <meta property="og:description" content={blog.ogDescription} />}
        {blog.ogImage && <meta property="og:image" content={blog.ogImage} />}
      </Head>
      <div className="banner w-100">
        <Image src={AboutUSImg} alt="Banner" className="w-100" />
        <div className="banner-content">
          <h1>{blog.title}</h1>
        </div>
      </div>
      <div className="page-content prpDetail-content py-3 mb-lg-3 py-lg-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/">Home</a></li>
                  <li className="breadcrumb-item"><a href="/blogs">Blog and Events</a></li>
                  <li className="breadcrumb-item active" aria-current="page">{blog.title}</li>
                </ol>
              </nav>
            </div>
            <div className="col-12 col-lg-7">
              <div className="blog-detail">
                <div className="entry-header">
                  <h2 className="content-heading">{blog.title}</h2>
                  <div className="entry-meta d-flex mb-3">
                    <div className="by-author author">
                      <span className="d-flex">
                        <a href="#" title={blog.author}>
                          <FontAwesomeIcon icon={faUser} /> {blog.author}
                        </a>
                      </span>
                    </div>
                    <div className="date d-flex ms-3">
                      <a href="#" title={new Date(blog.createdAt).toLocaleString()}>
                        <FontAwesomeIcon icon={faClock} /> {new Date(blog.createdAt).toLocaleDateString()}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="entry-content">
                  {blog.image && (
                    <div className="wp-caption">
                      <img className="img-fluid" src={blog.image} alt={blog.title} />
                      {blog.imageCaption && <p className="wp-caption-text">{blog.imageCaption}</p>}
                    </div>
                  )}
                  {/* <p>{blog.content}</p> */}
                  {blog.description && (
                    <div dangerouslySetInnerHTML={{ __html: blog.description }} />
                  )}
                </div>
                <div className="entry-meta">
                  <span className="tag-links">
                    {blog.tags?.map((tag, index) => (
                      <a key={index} href={`/tag/${tag}`} rel="tag">{tag}</a>
                    ))}
                  </span>
                </div>
                <ul className="default-wp-page">
                  {blog.previousPost && (
                    <li className="previous">
                      <a href={`/blogs/${blog.previousPost.slug}`} rel="prev">
                        <span className="meta-nav">←</span> {blog.previousPost.title}
                      </a>
                    </li>
                  )}
                  {blog.nextPost && (
                    <li className="next">
                      <a href={`/blogs/${blog.nextPost.slug}`} rel="next">
                        {blog.nextPost.title} <span className="meta-nav">→</span>
                      </a>
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
                  {blog.recentPosts?.map((post) => (
                    <Link href={`/blogs/${post.slug}`} key={post._id} className="post">
                      <img src={post.image} className="img-fluid" alt={post.title} />
                      <div className="recent-post-data">
                        <div className="recent-post-title">{post.title}</div>
                        <div className="date d-flex">
                          <a href={`/blogs/${post.slug}`} title={new Date(post.createdAt).toLocaleString()}>
                            <FontAwesomeIcon icon={faClock} /> {new Date(post.createdAt).toLocaleDateString()}
                          </a>
                        </div>
                      </div>
                    </Link>
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