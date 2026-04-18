"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

/* ───────── DATE FORMAT ───────── */
const fmt = (d) => {
  if (!d) return "";
  const date = new Date(d);
  return `${date.getDate()} ${date.toLocaleString("en-GB", {
    month: "long",
  })} ${date.getFullYear()}`;
};

/* ───────── HERO CARD ───────── */
function Card({ blog, className = "" }) {
  const [loaded, setLoaded] = useState(false);

  if (!blog) return null;

  return (
    <Link href={`/blogs/${blog.slug}`} className={`card ${className}`}>
      {blog.image && (
        <img
          src={blog.image}
          className="img"
          onLoad={() => setLoaded(true)}
          onError={(e) => (e.target.style.display = "none")}
          style={{ opacity: loaded ? 1 : 0 }}
        />
      )}

      <div className="overlay" />

      <div className="content">
        <span className="date">{fmt(blog.createdAt)}</span>
        <h3>{blog.title}</h3>
      </div>
    </Link>
  );
}

/* ───────── ARCHIVED CARD ───────── */
function ArchivedCard({ blog }) {
  const [loaded, setLoaded] = useState(false);

  if (!blog) return null;

  return (
    <Link href={`/blogs/${blog.slug}`} className="arc-card">
      <div className="arc-img-wrap">
        {blog.image && (
          <img
            src={blog.image}
            className="arc-img"
            onLoad={() => setLoaded(true)}
            onError={(e) => (e.target.style.display = "none")}
            style={{ opacity: loaded ? 1 : 0 }}
          />
        )}
      </div>

      <div className="arc-body">
        <h4>{blog.title}</h4>
        <span className="arc-date">{fmt(blog.createdAt)}</span>
        <p>{blog.shortDescription || blog.excerpt}</p>
      </div>
    </Link>
  );
}

/* ───────── MAIN ───────── */
const PER_PAGE = 6;

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get("/api/blog?all=true").then((res) => {
      const sorted = (res.data || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setBlogs(sorted);
    });
  }, []);

  if (!blogs.length) return null;

  const latest = blogs.slice(0, 5);
  const archived = blogs.slice(5);

  const [b1, b2, b3, b4, b5] = latest;

  const totalPages = Math.ceil(archived.length / PER_PAGE);

  const visible = archived.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  return (
    <div className="wrap">

      {/* ───────── LATEST SECTION ───────── */}
      <h2 className="title">LATEST PRESS RELEASES</h2>
      <p className="sub">
        Find all the latest interviews, articles and news on recent projects
        completed by NEPTEK.
      </p>

      <div className="grid">
        <Card blog={b1} className="big" />

        <div className="right">
          <Card blog={b2} />
          <Card blog={b3} />
          <Card blog={b4} />
          <Card blog={b5} />
        </div>
      </div>

      {/* ───────── ARCHIVED SECTION ───────── */}
      <h2 className="title archived-title">ARCHIVED PRESS RELEASES</h2>

      <div className="archived-grid">
        {visible.map((b, i) => (
          <ArchivedCard key={b._id || i} blog={b} />
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              className={page === n ? "active" : ""}
              onClick={() => setPage(n)}
            >
              {n}
            </button>
          ))}

          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            ›
          </button>
        </div>
      )}

      {/* ───────── STYLES ───────── */}
      <style jsx>{`
        .wrap {
          max-width: 1200px;
          margin: auto;
          padding: 40px 20px;
        }

        .title {
          font-size: 22px;
          font-weight: 800;
          margin-bottom: 6px;
        }

        .archived-title {
          margin-top: 60px;
        }

        .sub {
          color: #777;
          font-size: 14px;
          margin-bottom: 20px;
        }

        /* HERO GRID */
        .grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 12px;
        }

        .big {
          height: 520px;
        }

        .right {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .right a {
          height: 254px;
        }

        .card {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          background: #000;
        }

        .img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.4s;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
        }

        .content {
          position: absolute;
          bottom: 0;
          padding: 16px;
          color: #fff;
        }

        /* ARCHIVED */
        .archived-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .arc-card {
          border-radius: 10px;
          overflow: hidden;
        }

        .arc-img-wrap {
          height: 180px;
          background: #000;
        }

        .arc-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .arc-body {
          padding: 10px 0;
        }

        .arc-date {
          font-size: 12px;
          color: #888;
        }

        .arc-body p {
          font-size: 13px;
          color: #555;
        }

        /* PAGINATION */
        .pagination {
          margin-top: 20px;
          display: flex;
          gap: 8px;
        }

        .pagination button {
          padding: 6px 10px;
          border: 1px solid #ccc;
          background: #fff;
        }

        .pagination .active {
          background: #000;
          color: #fff;
        }

        @media (max-width: 900px) {
          .grid {
            grid-template-columns: 1fr;
          }

          .archived-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 600px) {
          .archived-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}