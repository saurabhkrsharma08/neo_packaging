"use client";

import { useState, useEffect } from "react";

export default function SolutionsCarousel() {
  const [solutions, setSolutions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/product?all=true");
        if (res.ok) {
          const data = await res.json();
          // Map the first 10 products to solutions format
          const mappedSolutions = (Array.isArray(data) ? data : [])
            .slice(0, 10)
            .map((product, index) => ({
              id: product._id || index,
              number: String(index + 19).padStart(2, "0"),
              title: product.title,
              description: product.shortDescription,
              image: product.image,
              videoUrl: "#", // You can add video URLs to products if needed
              category: product.category,
            }));
          setSolutions(mappedSolutions);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const VISIBLE = 4;
  const maxCarouselIndex = Math.max(0, solutions.length - VISIBLE);
  const activeSolution = solutions[activeIndex] || null;

  const handlePrev = () => {
    setCarouselIndex((i) => Math.max(i - 1, 0));
  };

  const handleNext = () => {
    setCarouselIndex((i) => Math.min(i + 1, maxCarouselIndex));
  };

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "60px 20px" }}>Loading solutions...</div>;
  }

  if (solutions.length === 0) {
    return null;
  }

  return (
    <section className="solutions-carousel-section">
      {/* Header */}
      <div className="solutions-carousel-header">
        <h2>
          NEPTEK OFFERS A <strong>FULL RANGE OF MATERIALS HANDLING SOLUTIONS</strong> FOR FACTORY AND
          WAREHOUSE AUTOMATION.
        </h2>
        <p>Watch the videos below of the various solutions supplied by us</p>
      </div>

      {/* Main Container */}
      <div className="solutions-carousel-container">
        {/* Featured Card - Left Side */}
        {activeSolution && (
          <div className="featured-card">
            <div className="featured-image-wrapper">
              <img
                src={activeSolution.image}
                alt={activeSolution.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div className="featured-overlay">
                <div className="featured-content">
                  <h3>{activeSolution.title}</h3>
                  <p>{activeSolution.description}</p>
                  <div className="featured-buttons">
                    <a href="#" className="btn-learn-more">
                      Learn More <span>&gt;&gt;</span>
                    </a>
                    <button className="btn-play" aria-label="Play video">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Carousel - Right Side */}
        <div className="carousel-section">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={handlePrev}
            disabled={carouselIndex === 0}
            aria-label="Previous"
          >
            &#8249;
          </button>

          {/* Carousel Viewport */}
          <div className="carousel-viewport">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(calc(-${carouselIndex} * (var(--card-width) + var(--gap))))`,
              }}
            >
              {solutions.map((solution, index) => (
                <button
                  key={solution.id}
                  className={`carousel-card ${activeIndex === index ? "active" : ""}`}
                  onClick={() => {
                    handleCardClick(index);
                    setCarouselIndex(Math.max(0, Math.min(index, maxCarouselIndex)));
                  }}
                >
                  <div className="card-image">
                    <img
                      src={solution.image}
                      alt={solution.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div className="card-overlay" />
                  </div>
                  <div className="card-number">{solution.number}</div>
                  <div className="card-title">{solution.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={handleNext}
            disabled={carouselIndex >= maxCarouselIndex}
            aria-label="Next"
          >
            &#8250;
          </button>
        </div>
      </div>

      <style jsx>{`
        .solutions-carousel-section {
          width: 100%;
          padding: 80px 40px;
          background: #ffffff;
          font-family: "Barlow", sans-serif;
        }

        /* Header */
        .solutions-carousel-header {
          text-align: center;
          margin-bottom: 60px;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }

        .solutions-carousel-header h2 {
          font-size: clamp(24px, 4vw, 36px);
          font-weight: 400;
          color: #5a7a8c;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          line-height: 1.3;
          margin: 0 0 20px;
        }

        .solutions-carousel-header h2 strong {
          font-weight: 700;
          color: #4a5c66;
        }

        .solutions-carousel-header p {
          font-size: 16px;
          color: #888;
          margin: 0;
          letter-spacing: 0.5px;
        }

        /* Main Container */
        .solutions-carousel-container {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 40px;
          align-items: stretch;
        }

        /* Featured Card */
        .featured-card {
          position: relative;
          height: 500px;
          border-radius: 12px;
          overflow: hidden;
          background: #f0f0f0;
        }

        .featured-image-wrapper {
          position: absolute;
          inset: 0;
        }

        .featured-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .featured-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgb(122 99 255) 0%, rgb(122 99 255), 0.7) 100%);
          display: flex;
          align-items: flex-end;
          padding: 40px;
          z-index: 2;
        }

        .featured-content {
          color: white;
        }

        .featured-content h3 {
          font-size: 28px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0 0 16px;
          line-height: 1.2;
        }

        .featured-content p {
          font-size: 15px;
          line-height: 1.5;
          margin: 0 0 24px;
          color: rgba(255, 255, 255, 0.9);
          max-width: 400px;
        }

        .featured-buttons {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .btn-learn-more {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: transparent;
          color: white;
          border: 2px solid white;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .btn-learn-more:hover {
          background: white;
          color: #2d5582;
        }

        .btn-learn-more span {
          font-size: 12px;
        }

        .btn-play {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          color: #2d5582;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .btn-play:hover {
          transform: scale(1.1);
          background: rgba(255, 255, 255, 0.9);
        }

        /* Carousel Section */
        .carousel-section {
          position: relative;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .carousel-viewport {
          flex: 1;
          overflow: hidden;
          padding: 20px 0;
        }

        .carousel-track {
          display: flex;
          gap: var(--gap);
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          --card-width: 180px;
          --card-height: 240px;
          --gap: 16px;
        }

        /* Carousel Cards */
        .carousel-card {
          position: relative;
          flex: 0 0 var(--card-width);
          height: var(--card-height);
          border: none;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          background: #f0f0f0;
          padding: 0;
          transition: all 0.3s ease;
        }

        .carousel-card.active {
          border: 3px solid #2d5582;
        }

        .carousel-card:hover {
          transform: translateY(-4px);
        }

        .card-image {
          position: absolute;
          inset: 0;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.2);
          transition: background 0.3s ease;
        }

        .carousel-card:hover .card-overlay {
          background: rgba(0, 0, 0, 0.4);
        }

        .card-number {
          position: absolute;
          top: 16px;
          left: 16px;
          font-size: 24px;
          font-weight: 700;
          color: white;
          background: rgba(45, 85, 130, 0.7);
          padding: 8px 12px;
          border-radius: 4px;
          z-index: 2;
        }

        .card-title {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 16px;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
          color: white;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          line-height: 1.2;
          z-index: 2;
          text-align: center;
        }

        /* Navigation Arrows */
        .carousel-arrow {
          width: 44px;
          height: 44px;
          background: #1a1a1a;
          color: white;
          border: none;
          font-size: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .carousel-arrow:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .carousel-arrow:not(:disabled):hover {
          background: #333;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .solutions-carousel-container {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .featured-card {
            height: 400px;
          }

          .carousel-track {
            --card-width: 150px;
            --card-height: 200px;
          }
        }

        @media (max-width: 768px) {
          .solutions-carousel-section {
            padding: 60px 24px;
          }

          .featured-card {
            height: 350px;
          }

          .featured-overlay {
            padding: 32px;
          }

          .featured-content h3 {
            font-size: 20px;
          }

          .carousel-track {
            --card-width: 130px;
            --card-height: 180px;
          }

          .carousel-arrow {
            width: 40px;
            height: 40px;
            font-size: 24px;
          }
        }

        @media (max-width: 600px) {
          .solutions-carousel-section {
            padding: 40px 16px;
          }

          .solutions-carousel-header h2 {
            font-size: 20px;
          }

          .featured-card {
            height: 280px;
          }

          .featured-overlay {
            padding: 20px;
          }

          .featured-content h3 {
            font-size: 18px;
            margin-bottom: 12px;
          }

          .featured-content p {
            font-size: 13px;
            margin-bottom: 16px;
          }

          .featured-buttons {
            gap: 12px;
          }

          .btn-learn-more {
            padding: 10px 16px;
            font-size: 12px;
          }

          .btn-play {
            width: 40px;
            height: 40px;
          }

          .carousel-track {
            --card-width: 110px;
            --card-height: 160px;
          }

          .carousel-arrow {
            width: 36px;
            height: 36px;
            font-size: 20px;
          }
        }
      `}</style>
    </section>
  );
}
