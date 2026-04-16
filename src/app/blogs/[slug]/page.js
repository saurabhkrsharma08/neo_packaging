// app/blog/[slug]/page.js (Server Component)
import BlogDetail from "./BlogDetail";
import { connectToDatabase } from "../../api/lib/dbConnect";
import Blog from "../../api/model/Blog";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    await connectToDatabase();
    const blog = await Blog.findOne({ slug: new RegExp(slug, 'i') }).lean();

    if (!blog) {
      return {
        title: "Blog Not Found",
        description: "The requested blog post could not be found.",
      };
    }

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
    console.error("Error generating blog metadata:", err);
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
    const blog = await Blog.findOne({ slug: new RegExp(slug, 'i') }).lean();

    if (!blog) {
      return <p>Blog post not found.</p>;
    }

    // Ensure _id is serializable
    const serializedBlog = {
      ...blog,
      _id: blog._id?.toString() || blog._id,
    };

    const recentPosts = await Blog.aggregate([
      { $match: { slug: { $ne: blog.slug } } }, 
      { $sample: { size: 5 } } 
    ]);

    // Serialize aggregation results
    const serializedRecent = recentPosts.map(item => ({
      ...item,
      _id: item._id?.toString() || item._id,
    }));

    return <BlogDetail blog={serializedBlog} recentPosts={serializedRecent} />;
  } catch (err) {
    console.error("Error loading blog:", err);
    return <p>Failed to load blog.</p>;
  }
}