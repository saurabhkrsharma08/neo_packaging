// app/products/[slug]/page.js (Server Component)
import ProductDetail from "./ProductDetail";
import axios from "axios";

export async function generateMetadata({ params }) {
  const { slug } = params; 
  try {    
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"; 
    const response = await axios.get(`${baseUrl}/api/product/${slug}`);
    const product = response.data;

    // Return metadata
    return {
      title: product.metaTitle || product.name,
      description: product.metaDescription || product.description,
      keywords: product.metaKeywords || "default, keywords",
      openGraph: {
        title: product.metaTitle || product.name,
        description: product.metaDescription || product.description,
        url: `https://www.neoconveyors.com/products/${slug}`,
        siteName: "Neo Conveyors | Conveyor manufacturers in India",
        locale: "en_US",
        type: "article",
      },
      canonical: `https://www.neoconveyors.com/products/${slug}`,
      twitterCard: {
        card: "summary",
        site: "https://www.neoconveyors.com",
        title: product.metaTitle || product.name,
        description: product.metaDescription || product.description,
      },
    };
  } catch (err) {
    // Fallback metadata if fetching fails
    return {
      title: "Default Title",
      description: "Default Description",
      keywords: "default, keywords",
    };
  }
}

export default async function Page({ params }) {
  const { slug } = params; 
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://neoconveyors.vercel.app"; 
    const response = await axios.get(`${baseUrl}/api/product/${slug}`);
    const product = response.data;
    return <ProductDetail product={product} />;
  } catch (err) {
    return <p>Failed to load product.</p>;
  }
}