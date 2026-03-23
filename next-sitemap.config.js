/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.neoconveyors.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,

  // ✅ Exclude admin and API paths from sitemap
  exclude: [
    '/admin/*',
    '/api/*',
    '/admin',
  ],

  additionalPaths: async (config) => {
    const resProduct = await fetch('https://www.neoconveyors.com/api/product?all=true');
    const resBlog = await fetch('https://www.neoconveyors.com/api/blog?all=true');

    const products = await resProduct.json();
    const blogs = await resBlog.json();

    const productPaths = products.map((product) => ({
      loc: `/products/${product.slug}`,
      lastmod: new Date().toISOString(),
    }));

    const blogPaths = blogs.map((blog) => ({
      loc: `/blogs/${blog.slug}`,
      lastmod: new Date().toISOString(),
    }));

    return [...productPaths, ...blogPaths];
  },
};
