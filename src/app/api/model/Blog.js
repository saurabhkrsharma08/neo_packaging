import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: false },
    subCategory: { type: String, required: false },
    image: { type: String, required: false },
    shortDescription: { type: String, required: true },
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
    metaKeywords: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    canonicalUrl: { type: String },
    ogTitle: { type: String },
    ogDescription: { type: String },
    ogImage: { type: String },
    googleSiteVerification: { type: String },
    msvalidate: { type: String },
    pDomainVerify: { type: String },
    ogSiteName: { type: String },
    ogType: { type: String },
    articlePublishedTime: { type: String },
    articleModifiedTime: { type: String },
    twitterCard: { type: String },
    twitterDomain: { type: String },
    twitterTitle: { type: String },
    twitterDescription: { type: String },
    twitterImage: { type: String },
    google: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);