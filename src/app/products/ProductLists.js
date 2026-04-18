"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../../../public/styles/page.module.scss';
import { truncateText } from '../utills/utills';

const ProdcutLists = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productDescription, setProductDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productResponse, categoryResponse, descriptionResponse] = await Promise.all([
          fetch("/api/product?all=true"),
          fetch("/api/category?all=true"),
          fetch("/api/product-description")
        ]);

        if (!productResponse.ok) throw new Error("Failed to fetch products");
        if (!categoryResponse.ok) throw new Error("Failed to fetch categories");
        if (!descriptionResponse.ok) throw new Error("Failed to fetch product description");

        const productData = await productResponse.json();
        const categoryData = await categoryResponse.json();
        const descriptionData = await descriptionResponse.json();

        setProducts(productData || []);
        setCategories(categoryData || []);
        setProductDescription(descriptionData.description || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!categoryFilter) return products.slice(0, 6);
    return products.filter(product => product.category === decodeURIComponent(categoryFilter));
  }, [products, categoryFilter]);

  return (
    <div className="page-content py-3 mb-lg-3 py-lg-4">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item"><a href="/products">Products</a></li>
              {categoryFilter && (
                <li className="breadcrumb-item active" aria-current="page">{decodeURIComponent(categoryFilter)}</li>
              )}
              {!categoryFilter && (
                <li className="breadcrumb-item active" aria-current="page">All Products</li>
              )}
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
                {categories.slice(0, 2).map((category) => (
                  <div 
                    key={category._id} 
                    className={styles.productFeatureCard}
                    onClick={() => router.push(`/products?category=${encodeURIComponent(category.name)}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <h2>{category.name}</h2>
                    <p>{category.description || `Explore our ${category.name.toLowerCase()} designed for bulk material handling, automation and smooth production flow.`}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-8">
              <div className="row g-4">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="col-lg-6 col-md-6 col-12">
                    <div className={styles.productCategoryCard}>
                      <span className={styles.productCategoryLabel}>{product.category}</span>
                      <h3>{product.name}</h3>
                      <p>{truncateText(product.shortDescription || product.description, 120)}</p>
                      <a href={`/${product.slug}`} className="btn btn-outline-primary btn-sm">Learn More »</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {categoryFilter && (
            <div className="row mt-4">
              <div className="col-12">
                <button 
                  onClick={() => router.push('/products')}
                  className="btn btn-outline-secondary"
                >
                  ← Clear Category Filter
                </button>
              </div>
            </div>
          )}

          <div className="row mt-5">
            <div className="col-12">
              {!categoryFilter && productDescription ? (
                productDescription.split("\n\n").map((paragraph, idx) => (
                  <p key={idx}>{paragraph.trim()}</p>
                ))
              ) : null}
            </div>
          </div>
        </>
      )}
    </div>
  </div>
  );
};

export default ProdcutLists;
