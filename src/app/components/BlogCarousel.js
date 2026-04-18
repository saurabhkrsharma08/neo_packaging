"use client";

export default function BlogCarousel({ blogs }) {
  if (!blogs || blogs.length === 0) {
    return (
      <section className="blog-masonry-section">
        <div className="text-center py-5">
          <p className="mb-0">No blog posts available yet. Check back soon.</p>
        </div>
      </section>
    );
  }

  // Take first 4 blogs — layout needs exactly 4 slots
  const [card1, card2, card3, card4] = blogs;

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Latest";

  return (
    <section className="blog-masonry-section">
      {/* ── Header ── */}
      <div className="masonry-header">
        <h2>
          Bulk Material in the <strong>News.</strong>
        </h2>
        <p>Take a look at what we have been up to over the years.</p>
      </div>

      {/* ── Grid ──
          Columns : [  1fr  ] [  1fr  ] [ 1.4fr ]
          Row 1   : [ card1 ] [ card2 ] [ card3  ]  ← card3 spans rows 1 + 2
          Row 2   : [   card4 (span 2 cols)       ] [ card3  ]
      */}
      <div className="masonry-grid">

        {/* Top-left — small */}
        {card1 && (
          <a href={`/${card1.slug}`} className="blog-card slot-top-left">
            <img
              src={card1.image || "/images/default-blog.jpg"}
              alt={card1.title || "Blog"}
              className="card-image"
            />
            <div className="card-overlay" />
            <div className="card-content">
              <span className="card-date" suppressHydrationWarning>{formatDate(card1.createdAt)}</span>
              <h3 className="card-title">{card1.title}</h3>
            </div>
          </a>
        )}

        {/* Top-middle — small */}
        {card2 && (
          <a href={`/${card2.slug}`} className="blog-card slot-top-mid">
            <img
              src={card2.image || "/images/default-blog.jpg"}
              alt={card2.title || "Blog"}
              className="card-image"
            />
            <div className="card-overlay" />
            <div className="card-content">
              <span className="card-date" suppressHydrationWarning>{formatDate(card2.createdAt)}</span>
              <h3 className="card-title">{card2.title}</h3>
            </div>
          </a>
        )}

        {/* Right — tall, spans both rows */}
        {card3 && (
          <a href={`/${card3.slug}`} className="blog-card slot-tall-right">
            <img
              src={card3.image || "/images/default-blog.jpg"}
              alt={card3.title || "Blog"}
              className="card-image"
            />
            <div className="card-overlay" />
            <div className="card-content">
              <span className="card-date" suppressHydrationWarning>{formatDate(card3.createdAt)}</span>
              <h3 className="card-title">{card3.title}</h3>
            </div>
          </a>
        )}

        {/* Bottom — wide, spans left + middle columns */}
        {card4 && (
          <a href={`/${card4.slug}`} className="blog-card slot-bottom-wide">
            <img
              src={card4.image || "/images/default-blog.jpg"}
              alt={card4.title || "Blog"}
              className="card-image"
            />
            <div className="card-overlay" />
            <div className="card-content">
              <span className="card-date" suppressHydrationWarning>{formatDate(card4.createdAt)}</span>
              <h3 className="card-title">{card4.title}</h3>
            </div>
          </a>
        )}

      </div>

      {/* ── Footer ── */}
      <div className="masonry-footer">
        <a href="/blogs" className="news-btn">
          News &raquo;
        </a>
      </div>

      <style jsx>{`
        .blog-masonry-section {
          max-width: 1300px;
          margin: 0 auto;
          padding: 60px 24px;
          font-family: "Barlow", sans-serif;
        }

        /* ── Header ── */
        .masonry-header {
          text-align: right;
          margin-bottom: 32px;
        }

        .masonry-header h2 {
          font-size: clamp(20px, 2.5vw, 32px);
          font-weight: 400;
          letter-spacing: 2px;
          color: #888;
          margin: 0 0 8px;
          text-transform: uppercase;
        }

        .masonry-header h2 strong {
          font-weight: 800;
          color: #1a1a1a;
        }

        .masonry-header p {
          font-size: 14px;
          color: #999;
          margin: 0;
        }

        /* ── Grid ── */
        .masonry-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1.4fr;
          grid-template-rows: 260px 260px;
          gap: 10px;
          margin-bottom: 20px;
        }

        /* ── Slot placement ── */
        .slot-top-left {
          grid-column: 1;
          grid-row: 1;
        }

        .slot-top-mid {
          grid-column: 2;
          grid-row: 1;
        }

        .slot-tall-right {
          grid-column: 3;
          grid-row: 1 / 3;
        }

        .slot-bottom-wide {
          grid-column: 1 / 3;
          grid-row: 2;
        }

        /* ── Card base ── */
        .blog-card {
          position: relative;
          display: block;
          text-decoration: none;
          border-radius: 14px;
          overflow: hidden;
          background: #111;
          cursor: pointer;
        }

        /* Image */
        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease, opacity 0.4s ease;
        }

        .blog-card:hover .card-image {
          transform: scale(1.05);
          opacity: 0.85;
        }

        /* Overlay */
        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.88) 0%,
            rgba(0, 0, 0, 0.4) 45%,
            rgba(0, 0, 0, 0.05) 100%
          );
          z-index: 1;
        }

        /* Content */
        .card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px 18px;
          z-index: 2;
        }

        .card-date {
          display: block;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.65);
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 7px;
        }

        .card-title {
          font-family: "Barlow Condensed", "Barlow", sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          text-transform: uppercase;
          line-height: 1.25;
          margin: 0;
          letter-spacing: 0.3px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .slot-tall-right .card-title,
        .slot-bottom-wide .card-title {
          font-size: 20px;
        }

        /* ── Footer ── */
        .masonry-footer {
          display: flex;
          justify-content: flex-end;
        }

        .news-btn {
          display: inline-block;
          padding: 10px 24px;
          border: 1px solid #ccc;
          color: #333;
          font-size: 14px;
          font-family: "Barlow", sans-serif;
          text-decoration: none;
          border-radius: 4px;
          transition: background 0.2s, color 0.2s;
        }

        .news-btn:hover {
          background: #1a1a1a;
          color: #fff;
          border-color: #1a1a1a;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .masonry-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 220px 220px 220px;
          }

          .slot-top-left    { grid-column: 1; grid-row: 1; }
          .slot-top-mid     { grid-column: 2; grid-row: 1; }
          .slot-bottom-wide { grid-column: 1 / 3; grid-row: 2; }
          .slot-tall-right  { grid-column: 1 / 3; grid-row: 3; }
        }

        @media (max-width: 560px) {
          .masonry-grid {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(4, 200px);
          }

          .slot-top-left,
          .slot-top-mid,
          .slot-bottom-wide,
          .slot-tall-right {
            grid-column: 1 !important;
            grid-row: auto !important;
          }

          .masonry-header { text-align: left; }
          .masonry-footer { justify-content: flex-start; }
        }
      `}</style>
    </section>
  );
}