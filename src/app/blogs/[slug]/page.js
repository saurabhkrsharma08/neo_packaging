// app/blog/[slug]/page.js (Server Component)
import BlogDetail from "./BlogDetail";
import axios from "axios";

export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://neoconveyors.vercel.app"; 
    const response = await axios.get(`${baseUrl}/api/blog/${slug}`);
    const blog = response.data;

    return {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.description,
      keywords: blog.metaKeywords || "default, keywords",
      canonical: blog.canonicalUrl || `https://www.neoconveyors.com/blogs/${slug}`,
      openGraph: {
        title: blog.ogTitle || blog.title,
        description: blog.ogDescription || blog.description,
        url: `https://www.neoconveyors.com/blogs/${slug}`,
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
  } catch (err) {
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
    const response = await axios.get(`${baseUrl}/api/blog/${slug}`);
    const blog = response.data;

    return <BlogDetail blog={blog} />;
  } catch (err) {
    return <p>Failed to load blog.</p>;
  }
}