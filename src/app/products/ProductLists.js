"use client";

import { useState, useEffect } from "react";
import styles from '../../../public/styles/page.module.scss';
import { truncateText } from '../utills/utills';

const ProdcutLists = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productDescription, setProductDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const buildCategoryCards = (items) => {
    const counts = items.reduce((result, item) => {
      if (!item.category) return result;
      const key = item.category.trim();
      result[key] = (result[key] || 0) + 1;
      return result;
    }, {});

    return Object.entries(counts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 2)
      .map(([category]) => ({
        category,
        description: `Explore our ${category.toLowerCase()} designed for bulk material handling, automation and smooth production flow.`
      }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [productResponse, descriptionResponse] = await Promise.all([
          fetch("/api/product?all=true"),
          fetch("/api/product-description")
        ]);

        if (!productResponse.ok) throw new Error("Failed to fetch products");
        if (!descriptionResponse.ok) throw new Error("Failed to fetch product description");

        const productData = await productResponse.json();
        const descriptionData = await descriptionResponse.json();

        const productItems = productData || [];
        setProducts(productItems);
        setCategories(buildCategoryCards(productItems));
        setProductDescription(descriptionData.description || "");
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
          <div className="row gy-4">
            <div className="col-lg-4">
              <div className={styles.productFeatureGrid}>
                {categories.map((categoryCard, index) => (
                  <div key={index} className={styles.productFeatureCard}>
                    <h2>{categoryCard.category}</h2>
                    <p>{categoryCard.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-8">
              <div className="row g-4">
                {products.slice(0, 6).map((product) => (
                  <div key={product._id} className="col-lg-6 col-md-6 col-12">
                    <div className={styles.productCategoryCard}>
                      <span className={styles.productCategoryLabel}>{product.category}</span>
                      <h3>{product.name}</h3>
                      <p>{truncateText(product.shortDescription || product.description, 120)}</p>
                      <a href={`/products/${product.slug}/`} className="btn btn-outline-primary btn-sm">Learn More »</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-12">
              {productDescription ? (
                productDescription.split("\n\n").map((paragraph, idx) => (
                  <p key={idx}>{paragraph.trim()}</p>
                ))
              ) : (
                <p>No description available from the backend.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  </div>
  );
};

export default ProdcutLists;
