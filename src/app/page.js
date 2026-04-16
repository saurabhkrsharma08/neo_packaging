"use client";

import { useState, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import AboutUSImg from "../../public/images/aboutUs-banner.jpg";
import "slick-carousel/slick/slick-theme.css";
import styles from '../../public/styles/page.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faQuoteLeft, faFileText, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames"; // Optional: for cleaner className management
import { truncateText } from './utills/utills';

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [productsResponse, blogsResponse, categoriesResponse] = await Promise.all([
          fetch('/api/product?all=true'),
          fetch('/api/blog?all=true'),
          fetch('/api/category?all=true'),
        ]);

        if (!productsResponse.ok) {
          const errorText = await productsResponse.text();
          throw new Error(`Products fetch failed: ${productsResponse.status} ${productsResponse.statusText} - ${errorText}`);
        }
        if (!blogsResponse.ok) {
          const errorText = await blogsResponse.text();
          throw new Error(`Blogs fetch failed: ${blogsResponse.status} ${blogsResponse.statusText} - ${errorText}`);
        }
        if (!categoriesResponse.ok) {
          const errorText = await categoriesResponse.text();
          throw new Error(`Categories fetch failed: ${categoriesResponse.status} ${categoriesResponse.statusText} - ${errorText}`);
        }

        const productsData = await productsResponse.json();
        const blogsData = await blogsResponse.json();
        const categoriesData = await categoriesResponse.json();

        setProducts(Array.isArray(productsData) ? productsData : []);
        setBlogs(Array.isArray(blogsData) ? blogsData.slice(0, 6) : []);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      } catch (error) {
        console.error('Error loading home data:', error);
      }
    }

    loadData();
  }, []);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  // Get products for a specific category - ensures no duplicate products across categories
  const getProductsByCategory = (categoryName, productsToExclude = new Set()) => {
    return products
      .filter(product => product.category === categoryName && !productsToExclude.has(product._id))
      .slice(0, 6);
  };

  // Organize products by category for display without duplication
  const getOrganizedCategoryProducts = () => {
    const shownProductIds = new Set();
    const categoryProducts = [];

    categories.forEach((category) => {
      const categoryProds = getProductsByCategory(category.name, shownProductIds);
      if (categoryProds.length > 0) {
        categoryProds.forEach(prod => shownProductIds.add(prod._id));
        categoryProducts.push({
          category,
          products: categoryProds
        });
      }
    });

    return categoryProducts;
  };

  // Get remaining products not shown in category sliders
  const getRemainingProducts = () => {
    const organizedProducts = getOrganizedCategoryProducts();
    const usedIds = new Set();
    organizedProducts.forEach(({ products: categoryProds }) => {
      categoryProds.forEach(prod => usedIds.add(prod._id));
    });
    return products.filter(p => !usedIds.has(p._id));
  };

  // Custom Next Arrow Component
  const NextArrow = ({ onClick, currentSlide, slideCount }) => {
    const isDisabled = currentSlide === slideCount - 1;
    return (
      <button
        onClick={!isDisabled ? onClick : undefined}
        className={classNames("slick-arrow slick-next", { "slick-disabled": isDisabled })}
        disabled={isDisabled}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    );
  };

  // Custom Prev Arrow Component
  const PrevArrow = ({ onClick, currentSlide }) => {
    const isDisabled = currentSlide === 0;
    return (
      <button
        onClick={!isDisabled ? onClick : undefined}
        className={classNames("slick-arrow slick-prev", { "slick-disabled": isDisabled })}
        disabled={isDisabled}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
    );
  };

  const Contentsettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024, // Below 1024px
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 992, // Below 768px (Tablet)
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };



  const testimonialSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <>
      <div>

        {/* Start Home Page */}
        <div className={styles.homevideoContainer}>
          <video className="w-100 h-100" autoPlay loop muted>
            <source
              src="../images/Neo_video.mp4"
              type="video/mp4"
            />
            Your browser does not support HTML5 video.
          </video>
          <div className={styles.homevideoCarousel}>
            <div id="homeCarousel" className="container">
              <div id="carouselExampleFade" className={`${styles.homeCarousel} carousel slide carousel-fade`} data-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="text-center">
                      <h2>Masters of material movement</h2>
                      <p>Neo Conveyors, founded in 2007, is a leading indian manufacture of industrial conveyor systems.</p>
                      <div className="row justify-content-center mt-4">
                        {categories.length > 0 ? (
                          categories.map((category, index) => (
                            <div className="col-auto" key={category._id || index}>
                              <a
                                href={`/products?category=${encodeURIComponent(category.name)}`}
                                className="btn text-white btn-outlined px-4"
                              >
                                {category.name}
                              </a>
                            </div>
                          ))
                        ) : (
                          <>
                            <div className="col-auto">
                              <a href="/products" className="btn text-white btn-outlined px-4">All Products</a>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <div className="carousel-item ">
                    <h2>Neo Conveyors a division</h2>
                    <p>Neo Packaging Industries, came into existence in the year 2007. Since, its inception, it has witnessed substantial growth.</p>
                  </div>
                  <div className="carousel-item ">
                    <h2>Master of material movements</h2>
                    <p>Neo Conveyors, as the name suggests a ‘new’ established in the year 2007, </p>
                  </div> */}
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Start Product Section */}
        <div className="container mt-lg-3 pe-md-5 mb-md-5 mb-4">
          <div className="row justify-content-end">
            <div className="col-12 col-lg-9 text-end">
              <h3 className="font-30 mt-5 mb-3 text-uppercase"> Neo Conveyors was established in year 2007. We are one of the leading providers </h3>
              <p className="mb-4">of custom built Industrial Conveyor Systems and automation solutions. Over the years we have successfully supplied and installed number of conveyors to various industries for different purposes.</p>
            </div>
          </div>

          {/* Category-wise Product Sliders */}
          {getOrganizedCategoryProducts().map(({ category, products: categoryProducts }) => (
            <div key={category._id} className="row justify-content-end mb-5">
              <div className="col-lg-9">
                <h4 className="text-uppercase mb-4" style={{ fontWeight: 600, color: '#1d2c54' }}>
                  {category.name}
                </h4>
                <Slider {...Contentsettings}>
                  {categoryProducts.map((product, index) => (
                    <div key={product._id} className={`${index === 0 ? "active" : ""}`}>
                      <div className={styles.homegalleryCard}>
                        <a href={`/products/${product.slug}/`} className={styles.homegalleryLink}></a>
                        <img src={product.image} className="img-fluid" alt={product.title} />
                        <div className={styles.homegalleryoverlay}>
                          <h4 aria-hidden="true">{product.title}</h4>
                          <div className={styles.homegalleryseprator}></div>
                          <div className={styles.homegallerybody}>
                            <p className="mb-5">{truncateText(product.shortDescription, 40)}</p>
                            <div className="d-flex justify-content-start gap-2">
                              <a className="btn text-white btn-outlined" href={`/products/${product.slug}/`}>
                                Learn more <em className="bi bi-chevron-double-right"></em>
                              </a>
                              <a className="btn text-white btn-outlined" href={`/products/${product.slug}/`}>
                                Play <em className="bi bi-play-circle"></em>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          ))}
        </div>


        {/* Start Inspired Section */}
        <div className={`${styles.homeexcellenceSection} p-4 m-3`}>
          <div className="container">
            <div className="row">
              <div className={`${styles.homeexcellenceLeft} col-lg-7 col-12`}>

              </div>
              <div className={`${styles.homeexcellenceRight} col-lg-5 col-12`} >

                <h3>Driven by excellence, Build for you</h3>
                <p>Neo Conveyors a division, of Neo Packaging Industries, came into existence in the year 2007. Since, its inception, it has witnessed substantial growth. We the manufacturer and exporter of conveyors have located our establishment at Ghaziabad, Uttar Pradesh, adjoining Delhi.</p>

                <div className="accordion accordion-flush" id="accordionFlushExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        EXPERTISE
                      </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                      <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> className. This is the first item’s accordion body.</div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                        Comprehensive Services
                      </button>
                    </h2>
                    <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                      <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> className. This is the second item’s accordion body. Let’s imagine this being filled with some actual content.</div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                        Tailored Solutions
                      </button>
                    </h2>
                    <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                      <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> className. This is the third item’s accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                        Proven Technology
                      </button>
                    </h2>
                    <div id="flush-collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                      <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> className. This is the third item’s accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                        Client Success Stories
                      </button>
                    </h2>
                    <div id="flush-collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                      <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> className. This is the third item’s accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                    </div>
                  </div>
                </div>
                <p>
                  The founder members of the company are Graduate Engineers, Mr.Surender Sharma, Mr. Manoj Singh, and Mr. Mahinder Singh, having 20 years of rich experience in Material Handling Systems…
                </p>
                <div>
                  <a href="/contact" className="btn btn-outline-primary">
                    Contact us
                    <em className="bi bi-chevron-double-right"></em>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-lg-3">
          <div className="row justify-content-end">
            <div className="col-12 col-lg-9 text-end">
              <h3 className="font-30 mt-5 mb-3 text-uppercase"> Neo Conveyors provides a comprehensive
                range of services for the materials
                handling industry. </h3>
              <p className="mb-4">of custom built Industrial Conveyor Systems and automation solutions. Over the years we have successfully supplied and installed number of conveyors to various industries for different purposes.</p>
            </div>
          </div>
          <div className="row justify-content-end">

            <div className="col-lg-11">

              <div className="row">
                {getRemainingProducts().length > 0 ? (
                  getRemainingProducts().slice(0, 4).map((product, index) => (
                    <div key={product._id || index} className="col-12 col-lg-3 d-flex">
                      <div className={`${styles.homeexcellencecard} m-3`}>
                        <h3>{product.title || `Product ${index + 1}`}</h3>
                        <p>{product.shortDescription || product.description || 'High quality industrial product designed to meet your needs.'}</p>
                        <a href={`/products/${product.slug || ''}`} className="btn btn-outline-primary">
                          Learn more  <em className="bi bi-chevron-double-right"></em>
                        </a>
                        <div className={`${styles.homeexcellencecount} my-3`}>
                          {String(index + 1).padStart(2, '0')}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <p className="mb-0">No more products available.</p>
                  </div>
                )}
                {/* <div className="col-12 col-lg-12 my-3 d-flex">
                  <Image src={AboutUSImg} alt="Banner" className="w-100 rounded" />
                </div> */}
                {/* {getRemainingProducts().length > 4 && (
                  getRemainingProducts().slice(4, 8).map((product, index) => (
                    <div key={product._id || index} className="col-12 col-lg-3 d-flex">
                      <div className={`${styles.homeexcellencecard} m-3`}>
                        <h3>{product.title || `Product ${index + 5}`}</h3>
                        <p>{product.shortDescription || product.description || 'High quality industrial product designed to meet your needs.'}</p>
                        <a href={`/products/${product.slug || ''}`} className="btn btn-outline-primary">
                          Learn more  <em className="bi bi-chevron-double-right"></em>
                        </a>
                        <div className={`${styles.homeexcellencecount} my-3`}>
                          {String(index + 5).padStart(2, '0')}
                        </div>
                      </div>
                    </div>
                  ))
                )} */}
              </div>
            </div>

          </div>
        </div>

        <div className={`${styles.homeexcellenceSection} p-4 m-3`}>
          <div className="container">
            <div className="row">
              <div className={`${styles.homeexcellenceLeft} col-lg-7 col-12`}>
                <Image src={AboutUSImg} alt="Conveyor Automation" className="w-100 h-100 rounded" style={{ objectFit: 'cover' }} />
              </div>
              <div className={`${styles.homeexcellenceRight} col-lg-5 col-12`} >

                <h3>CONVEYOR AUTOMATION DESIGN CONSULTING</h3>
                <p>Our technical support is designed to empower your operations, enhance safety, and deliver long-term value. For assistance, contact our support team at info@neoconveyors.com or call
                </p>
                <div>
                  <a className="btn btn-outline-primary">
                    Contact us
                    <em className="bi bi-chevron-double-right"></em>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Start Blog Section */}
        <div className="container px-4 mt-4 mt-lg-5">
          <div className="row">
            <div className="col-12">
              <h3 className="font-30 color-black text-end mt-4 mb-2 mt-lg-0 mb-lg-3">Bulk Material in the News.
              </h3>
              <p className=" text-end">Take a look at what we have been up to over the years.</p>
            </div>
            <div className="col-12">
              <div className="row">
                {blogs.length > 0 ? (
                  blogs.map((blog, index) => (
                    <div key={blog._id || index} className="col-12 col-md-6 col-lg-4 mb-4">
                      <div className={`${styles.homeBlogOuter} h-100`}>
                        <div className={styles.homeBlogCard}>
                          <a href={`/blogs/${blog.slug}`} className="d-block">
                            <img src={blog.image || '/images/default-blog.jpg'} className="img-fluid" alt={blog.title || 'Blog'} />
                          </a>
                          <div className={styles.homeBlogCategory}>
                            <div className={styles.homeBlogCategoryInner}>
                              <div className={styles.homeBlogDate}>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Latest'}</div>
                              <div className={styles.homeBlogTitle}>{blog.title}</div>
                            </div>
                          </div>
                          <div className={styles.homeBlogSummary}>
                            <p>{blog.shortDescription || blog.description?.slice(0, 120) || 'Read our latest update.'}</p>
                          </div>
                          <div className="text-end mt-2">
                            <a href={`/blogs/${blog.slug}`} className="btn btn-outline-primary">
                              Read more <em className="bi bi-chevron-double-right"></em>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <p className="mb-0">No blog posts available yet. Check back soon.</p>
                  </div>
                )}
              </div>
            </div>
            <div className="col-12 text-end my-3">
              <a href="/blogs" className="btn btn-outline-primary">News   <em className="bi bi-chevron-double-right"></em></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}