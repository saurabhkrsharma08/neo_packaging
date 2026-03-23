"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFileText } from "@fortawesome/free-solid-svg-icons";
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
          <div className="row">
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
          <div className="row">
            <div className="col-lg-8">
              <h2 className="content-heading">{product.name} Manufacturer in India</h2>
              {product.description && (
                    <div dangerouslySetInnerHTML={{ __html: product.description }} />
                  )}
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-3">
              <div className="sidebar">
                <img src={product.image} className="img-fluid" alt={product.name} />
              </div>
            </div>
            {/* <div className="col-12 col-lg-12 mt-3 mt-lg-4">
           
            </div> */}
            <p>
              <a href="/contact" className="btn btn-outline-primary btn-lg">
                Get Best Deal
              </a>
            </p>
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

export default ProductDetail;