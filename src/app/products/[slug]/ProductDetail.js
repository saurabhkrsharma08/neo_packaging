"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFileText, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import styles from "../../../../public/styles/page.module.scss";
import Link from "next/link";

const ProductDetail = ({ product }) => {
  if (!product) return <p>No product found</p>;

  return (
    <>
      <div className="banner w-100">
        <img
          src='../../../../../images/aboutUs-banner.jpg'
          alt={product.name}
          className="w-100"
        />
        <div className="banner-content">
          <h1>{product.name}</h1>
        </div>
      </div>
      <div className="page-content prpDetail-content py-3 mb-lg-1 py-lg-4">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/products">Products</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {product.name}
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="row gy-5">
            {/* Left Sidebar - Category Card */}
            <div className="col-lg-4">
              <div className="product-category-sidebar">
                <div className="product-category-card">
                  <div className="product-category-card-header">
                    <h3 className="category-title">{product.category}</h3>
                  </div>
                  <div className="product-category-card-body">
                    <span className="category-badge">{product.category}</span>
                    <p className="category-description">
                      Explore our comprehensive range of {product.category} designed for efficiency and reliability.
                    </p>
                    <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="category-link">
                      View All {product.category}
                      <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content Section */}
            <div className="col-lg-8">
              <div className="product-detail-content">
                <div className="product-detail-header mb-5">
                  <h1 className="product-detail-title">{product.name}</h1>
                  <p className="product-detail-subtitle">
                    Premium {product.category} Manufacturer in India
                  </p>
                </div>

                {/* Short Description */}
                {product.shortDescription && (
                  <div className="product-detail-intro mb-5 pb-4 border-bottom">
                    <p className="product-detail-intro-text">
                      {product.shortDescription}
                    </p>
                  </div>
                )}

                {/* Full Description */}
                {product.description && (
                  <div className="product-detail-description">
                    <div className="product-description-content">
                      <div dangerouslySetInnerHTML={{ __html: product.description }} />
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                <div className="product-detail-cta mt-5">
                  <Link href="/contact" className="btn btn-lg btn-primary-solid">
                    Get Best Deal
                    <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Brochure Section */}
      <div className={`${styles.homebrochureSection} container-fluid mt-5 mt-lg-5`}>
        <div className="row g-0">
          <Link href="/contact" className={`${styles.homebrochureLeft} col-12 col-lg-6`}>
            <div>
              <FontAwesomeIcon icon={faFileText} />
              <h3>Get It Now</h3>
              <p>Reach out to us for more information</p>
            </div>
          </Link>

          <Link href="/pdf/Catalog_Neo_Conveyors.pdf" target="_blank" rel="noopener noreferrer" className={`${styles.homebrochureRight} col-12 col-lg-6`}>
            <div>
              <FontAwesomeIcon icon={faFilePdf} />
              <h3>Discover Our Brochure</h3>
              <p>Download our comprehensive catalog</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;