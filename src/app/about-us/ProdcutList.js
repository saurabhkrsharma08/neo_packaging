"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/product?all=true")
      .then((response) => response.json())
      .then((data) => setProducts(data.slice(0, 10)));
  }, []);

  return (
    <ul>
      {products.map((product) => (
        <li key={product.slug}>
          <Link href={`/products/${product.slug}/`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default ProductsList;
