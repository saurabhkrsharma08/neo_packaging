"use client";

import { useState, useEffect } from "react";
import styles from '../../../public/styles/page.module.scss';
import { truncateText } from '../utills/utills';


const ProdcutLists = () => {
    const [products, setProducts] = useState([]);
  const [rangeOffered, setRangeOffered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/product?all=true");
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        setProducts(data);

        // Extract unique "Range Offered" categories
        const uniqueRanges = [...new Set(data.map((p) => p.slug))];
        const shuffledRanges = uniqueRanges.sort(() => Math.random() - 0.7);

        setRangeOffered(shuffledRanges.slice(0, 7));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="page-content py-3 mb-lg-3 py-lg-4">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Products</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Loading State */}
      {loading && <p>Loading products...</p>}

      {/* Error State */}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <>
          <div className="row">
            <div className="col-lg-8">
              <p> We specialize in the manufacture of Belt Conveyors and are one of best manufacturer and exporter of belt conveyors in India, which you can avail at Neo Conveyors at competitive price with best quality. We have a huge range of Belt Conveyors, which are in demand due to its robust construction and tensile strength. Belt Conveyors are fabricated with superior quality raw materials and standard bought out items such as Gear Box, Motors, Belts and accessories, to give high strength and durability to conveyors system.</p>

              <p>Neo conveyors provide best Belt conveyors for production flow line. Belt conveyors are employed for conveying various bulk and unit loads along horizontal or slightly inclined paths and for transporting articles between various operations and are the main means of mechanical transport. Belt conveyors make material handling easy and cost effective as it improves production process and save from human error.</p>
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-3">
              <div className="sidebar">
                <h2 className="border-title color-black">Range Offered</h2>
                <ul>
                  {rangeOffered.map((range, index) => (
                    <li key={index}><a href={`/products/${range}/`}>{range}</a></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-lg-3 col-md-6 col-12 mb-3 mb-lg-4">
                <div className={styles.homegalleryCard}>
                  <a href={`/products/${product.slug}/`} className={styles.homegalleryLink}></a>
                  <img src={product.image} className="img-fluid" alt={product.name} />
                  <div className={styles.homegalleryoverlay}>
                    <h4 aria-hidden="true">{product.name}</h4>
                    <div className={styles.homegallerybody}>
                      <p className="mb-5">{truncateText(product.shortDescription, 40)}</p>
                      <a href={`/products/${product.slug}/`}><small className="color-white">Read More</small></a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  </div>
  );
};

export default ProdcutLists;
