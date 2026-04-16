// app/products/[slug]/page.js (Server Component)
import ProductDetail from "./ProductDetail";
import { connectToDatabase } from "../../api/lib/dbConnect";
import Product from "../../api/model/Product";

export async function generateMetadata({ params }) {
  const { slug } = await params; 
  try {
    await connectToDatabase();
    const product = await Product.findOne({ slug }).lean();
    
    if (!product) {
      return {
        title: "Product Not Found",
        description: "The requested product could not be found.",
      };
    }

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
    console.error("Error generating metadata for product:", err);
    return {
      title: "Default Title",
      description: "Default Description",
      keywords: "default, keywords",
    };
  }
}

export default async function Page({ params }) {
  const { slug } = await params; 
  try {
    await connectToDatabase();
    const product = await Product.findOne({ slug }).lean();
    
    if (!product) {
      return <p>Product not found.</p>;
    }

    // Ensure _id is serializable
    const serializedProduct = {
      ...product,
      _id: product._id?.toString() || product._id,
    };

    const relatedProducts = await Product.aggregate([
      { $match: { slug: { $ne: slug } } }, 
      { $sample: { size: 5 } } 
    ]);

    // Serialize aggregation results
    const serializedRelated = relatedProducts.map(item => ({
      ...item,
      _id: item._id?.toString() || item._id,
    }));

    return <ProductDetail product={serializedProduct} relatedProducts={serializedRelated} />;
  } catch (err) {
    console.error("Error loading product:", err);
    return <p>Failed to load product.</p>;
  }
}