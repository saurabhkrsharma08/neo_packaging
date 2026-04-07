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

  useEffect(() => {
    // Fetch products
    fetch('/api/product?all=true')
      .then(response => response.json())
      .then(data => setProducts(data?.slice(0, 8))); // Limit to 8 products

    // Fetch blogs
    fetch('/api/blog?all=true')
      .then(response => response.json())
      .then(data => setBlogs(data?.slice(0, 6))); // Limit to 6 blogs
  }, []);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
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
                        <div className="col-auto">
                          <a href="#" className="btn text-white btn-outlined px-4">Services</a>
                        </div>
                        <div className="col-auto">
                          <a href="#" className="btn text-white btn-outlined px-4">Solutions</a>
                        </div>
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

        {/* Start Prodcut Section */}
        <div className="container mt-lg-3 pe-md-5 mb-md-5 mb-4">
          <div className="row justify-content-end">
            <div className="col-12 col-lg-9 text-end">
              <h3 className="font-30 mt-5 mb-3 text-uppercase"> Neo Conveyors was established in year 2007. We are one of the leading providers </h3>
              <p className="mb-4">of custom built Industrial Conveyor Systems and automation solutions. Over the years we have successfully supplied and installed number of conveyors to various industries for different purposes.</p>
            </div>
          </div>
          <div className="row justify-content-end">

            <div className="col-lg-9">

              <Slider {...Contentsettings}>
                {products.map((product, index) => (
                  <div key={index}
                    className={`${index === 0 ? "active" : ""}`}>
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
                  <a className="btn btn-outline-primary">
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
                <div className="col-12 col-lg-3 d-flex">
                  <div className={`${styles.homeexcellencecard} m-3`}>
                    <h3>Auditing</h3>
                    <p>After undertaking an audit of our client’s equirements, Bulk Material can design a new solution or alter the current design to optimise the material handling flow.</p>
                    <a className="btn btn-outline-primary">Learn more  <em className="bi bi-chevron-double-right"></em> </a>
                    <div className={`${styles.homeexcellencecount} my-3`}>
                      01
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-3 d-flex">
                  <div className={`${styles.homeexcellencecard} m-3`}>
                    <h3>Design</h3>
                    <p>After undertaking an audit of our client’s equirements, Bulk Material can design a new solution or alter the current design to optimise the material handling flow.</p>
                    <a className="btn btn-outline-primary">Learn more  <em className="bi bi-chevron-double-right"></em> </a>
                    <div className={`${styles.homeexcellencecount} my-3`}>
                      02
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-3 d-flex">
                  <div className={`${styles.homeexcellencecard} m-3`}>
                    <h3>Implementation</h3>
                    <p>After undertaking an audit of our client’s equirements, Bulk Material can design a new solution or alter the current design to optimise the material handling flow.</p>
                    <a className="btn btn-outline-primary">Learn more  <em className="bi bi-chevron-double-right"></em> </a>
                    <div className={`${styles.homeexcellencecount} my-3`}>
                      03
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-3 d-flex">
                  <div className={`${styles.homeexcellencecard} m-3`}>
                    <h3>Project Management</h3>
                    <p>After undertaking an audit of our client’s equirements, Bulk Material can design a new solution or alter the current design to optimise the material handling flow.</p>
                    <a className="btn btn-outline-primary">Learn more  <em className="bi bi-chevron-double-right"></em> </a>
                    <div className={`${styles.homeexcellencecount} my-3`}>
                      04
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-12 my-3 d-flex">
                  <Image src={AboutUSImg} alt="Banner" className="w-100 rounded" />
                </div>
                <div className="col-12 col-lg-3 d-flex">
                  <div className={`${styles.homeexcellencecard} m-3`}>
                    <h3>Upgrades & Refurbishments</h3>
                    <p>Our engineering team will assess and evaluate your current plant and machinery and undertake to modify, upgrade or refurbish this equipment.</p>
                    <a className="btn btn-outline-primary">Learn more  <em className="bi bi-chevron-double-right"></em> </a>
                    <div className={`${styles.homeexcellencecount} my-3`}>
                      05
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-3 d-flex">
                  <div className={`${styles.homeexcellencecard} m-3`}>
                    <h3>Plant Relocation</h3>
                    <p>Bulk Material has the knowledge and experience base to relocate or move existing plants working together and organising the contractors and liaising with the client at all times to ensure a smooth transition process.</p>
                    <a className="btn btn-outline-primary">Learn more  <em className="bi bi-chevron-double-right"></em> </a>
                    <div className={`${styles.homeexcellencecount} my-3`}>
                      06
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-3 d-flex">
                  <div className={`${styles.homeexcellencecard} m-3`}>
                    <h3>Maintenance</h3>
                    <p>Bulk Material guarantees that any equipment or systems supplied into the market can be fully supported and serviced by us, through service and maintenance contracts.</p>
                    <a className="btn btn-outline-primary">Learn more  <em className="bi bi-chevron-double-right"></em> </a>
                    <div className={`${styles.homeexcellencecount} my-3`}>
                      07
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-3 d-flex">
                  <div className={`${styles.homeexcellencecard} m-3`}>
                    <h3>Spare Parts</h3>
                    <p>We supply a wide range of well-engineered original spares parts to meet our client’s requirements.</p>
                    <a className="btn btn-outline-primary">Learn more  <em className="bi bi-chevron-double-right"></em> </a>
                    <div className={`${styles.homeexcellencecount} my-3`}>
                      08
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className={`${styles.homeexcellenceSection} p-4 m-3`}>
          <div className="container">
            <div className="row">
              <div className={`${styles.homeexcellenceLeft} col-lg-7 col-12`}>

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
                {blogs.map((blog, index) => (
                  <div key={index} className={styles.homeBlogOuter}>
                    <div className={styles.homeBlogCard}>
                      <a href={`/blogs/${blog.slug}`}>
                        <img src={blog.image} className="img-fluid" alt='blog' />
                        <div className={styles.homeBlogCategory}>
                          <div className={styles.homeBlogCategoryInner}>
                            <div className={styles.homeBlogDate}>25 November 2025</div>
                            <div className={styles.homeBlogTitle}>{blog.title}</div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>

                ))}
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