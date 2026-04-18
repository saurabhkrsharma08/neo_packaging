// app/[slug]/page.js - Catch-all route for products and blogs
import { connectToDatabase } from '../api/lib/dbConnect';
import Product from '../api/model/Product';
import Blog from '../api/model/Blog';
import ProductDetailWrapper from '../products/[slug]/page';
import BlogDetailWrapper from '../blogs/[slug]/page';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    await connectToDatabase();

    // Try to find product first
    const product = await Product.findOne({ slug }).lean();
    if (product) {
      return {
        title: product.metaTitle || product.name,
        description: product.metaDescription || product.description,
        keywords: product.metaKeywords || "default, keywords",
        openGraph: {
          title: product.metaTitle || product.name,
          description: product.metaDescription || product.description,
          url: `https://www.neoconveyors.com/${slug}`,
          siteName: "Neo Conveyors | Conveyor manufacturers in India",
          locale: "en_US",
          type: "article",
        },
        canonical: `https://www.neoconveyors.com/${slug}`,
        twitterCard: {
          card: "summary",
          site: "https://www.neoconveyors.com",
          title: product.metaTitle || product.name,
          description: product.metaDescription || product.description,
        },
      };
    }

    // Try to find blog
    const blog = await Blog.findOne({ slug: new RegExp(slug, 'i') }).lean();
    if (blog) {
      return {
        title: blog.metaTitle || blog.title,
        description: blog.metaDescription || blog.description,
        keywords: blog.metaKeywords || "default, keywords",
        canonical: blog.canonicalUrl || `https://www.neoconveyors.com/${slug}`,
        openGraph: {
          title: blog.ogTitle || blog.title,
          description: blog.ogDescription || blog.description,
          url: `https://www.neoconveyors.com/${slug}`,
          siteName: "Neo Conveyors | Conveyor manufacturers in India",
          images: [
            {
              url: blog.ogImage || blog.image,
              width: 800,
              height: 600,
              alt: blog.title,
            },
          ],
          locale: "en_US",
          type: "article",
        },
        twitter: {
          card: "summary_large_image",
          title: blog.ogTitle || blog.title,
          description: blog.ogDescription || blog.description,
          images: [blog.ogImage || blog.image],
        },
      };
    }

    // Not found
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  } catch (err) {
    console.error("Error generating metadata:", err);
    return {
      title: "Default Title",
      description: "Default Description",
    };
  }
}

export default async function Page({ params }) {
  const { slug } = await params;

  try {
    await connectToDatabase();

    // Try to find product
    const product = await Product.findOne({ slug });
    if (product) {
      // Return the product detail page with the slug
      return <ProductDetailWrapper params={{ slug }} />;
    }

    // Try to find blog
    const blog = await Blog.findOne({ slug: new RegExp(slug, 'i') });
    if (blog) {
      // Return the blog detail page with the slug
      return <BlogDetailWrapper params={{ slug }} />;
    }

    // Not found
    notFound();
  } catch (err) {
    console.error("Error loading page:", err);
    notFound();
  }
}
