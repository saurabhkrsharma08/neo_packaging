"use client";
import { useState } from "react";
import Link from 'next/link';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from '../../public/styles/page.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faQuoteLeft, faFileText, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames"; // Optional: for cleaner class management


export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
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
        <div className={styles.homevideoContainer}>
          <video className="w-100 h-100" autoPlay loop muted>
            <source
              src="https://www.conveline.com/public/assets/images/home_video.mp4"
              type="video/mp4"
            />
            Your browser does not support HTML5 video.
          </video>
          <div className={styles.homevideoCarousel}>
            <div id="homeCarousel" className="container">
              <div id="carouselExampleFade" className={`${styles.homeCarousel} carousel slide carousel-fade`} data-ride="carousel">
                <div className="carousel-inner">
                 
                  <div className="carousel-item active">
                    <h2>Master of material movements abababb</h2>
                    <p>Neo Conveyors, as the name suggests a ‘new’ established in the year 2007, </p>
                    <div className="row">
                      <div className="col-md-auto">
                        <a href="#" className="btn btn-outlined">Services</a>
                      </div>
                       <div className="col-md-auto">
                        <a href="#" className="btn btn-outlined">Solutions</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="0" className="" aria-label="Slide 0"></button>
                  <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="1" className="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="2" className="" aria-current="false" aria-label="Slide 2"></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container pt-3 pb-2 py-lg-5">
          <div className="row">
            <div className="col-12 col-lg-5">
              <h2 className="font-36 color-blue">Welcome Neo Conveyor
                <span className="color-black d-block">Manufacturer in India</span>
              </h2>
            </div>
            <div className="col-12 col-lg-7 mt-lg-0 mt-1">
              <p className="font-16 color-light-black">Neo Conveyors, as the name suggests a ‘new’ established in the year 2007, a division of Neo Packaging Industries.  Neo conveyors are the masters of conveyors manufacturer in India and exporting them worldwide. T The huge range comprises of Belt Conveyors, Roller Conveyors, Chain Conveyors, Apron Conveyors, Screw Conveyors, Slat Conveyors, Wire Mesh Conveyors, Bucket Elevator


                {isExpanded ? (
                  <>
                 & so on, the sky is the limit, because, we always try to develop according to the requirement of our client and up to their expectations. We as manufacturers and exporter of conveyors, manufacture in compliance with the international standards and we are into procuring ISO certification, also. Our robust structure, unmatched quality at a low price, and high productivity have earned us, valued clients in India and other countries like Dubai, Uganda, Costa Rica, Nigeria, 
                  </>
                ) : (
                  <>...</>
                )}
                <button className="btn btn-text read-more" onClick={toggleReadMore}>{isExpanded ? "Read Less" : "Read More"}</button> 
                </p>
            </div>
          </div>
        </div>
        <div className='container mt-lg-3'>
          <div className='row'>
            <div className='col-12 text-center'>
              <h3 className="font-36 color-black mb-3 mb-lg-5">Neo Industries Conveyors</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-12 mb-3 mb-lg-4">
              <div className={styles.homegalleryCard}>
                <a href="#" className={styles.homegalleryLink}></a>
                <img src="https://www.neoconveyors.com/wp-content/uploads/2011/07/APRON-CONVEYOR.jpg" className="img-fluid" alt="Apron Conveyors" />
                <div className={styles.homegalleryoverlay}>
                  <h4 aria-hidden="true">Apron Conveyors</h4>
                  <div className={styles.homegallerybody}>
                    <p className="mb-5">Apron Conveyors are used to carry materials and pieces horizontally and inclined lines. Neo offers Apron conveyors, which are made of pans with uneven edges to keep a check on material loss.</p>
                    <small className="color-white">Read More</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mb-3 mb-lg-4">
              <div className={styles.homegalleryCard}>
                <a href="#" className={styles.homegalleryLink}></a>
                <img src="https://www.neoconveyors.com//wp-content/uploads/2018/05/Belt-Conveyor-Manufacturers-in-India-1.jpg" className="img-fluid" alt="Belt conveyors" />
                <div className={styles.homegalleryoverlay}>
                  <h4 aria-hidden="true">Belt conveyors</h4>
                  <div className={styles.homegallerybody}>
                    <p className="mb-5">Neo conveyors, belt conveyor manufacturers since 2007 in India. Our specific design makes a very competitive flat belt conveyor price with the best quality. We manufacturer a huge range of Belt Conveyors.</p>
                    <small className="color-white">Read More</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mb-3 mb-lg-4">
              <div className={styles.homegalleryCard}>
                <a href="#" className={styles.homegalleryLink}></a>
                <img src="https://www.neoconveyors.com//wp-content/uploads/2011/07/Horizontal-Belt-Conveyor.jpg" className="img-fluid" alt="Horizontal belt conveyor" />
                <div className={styles.homegalleryoverlay}>
                  <h4 aria-hidden="true">Horizontal belt conveyor</h4>
                  <div className={styles.homegallerybody}>
                    <p className="mb-5">A horizontal belt conveyor mostly called a flat belt conveyor. It is a cost-effective conveyor system for the movement of material. The horizontal belt conveyor is used for an extremely wide array of applications and environments from automotive to abattoirs. </p>
                    <small className="color-white">Read More</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mb-3 mb-lg-4">
              <div className={styles.homegalleryCard}>
                <a href="#" className={styles.homegalleryLink}></a>
                <img src="https://www.neoconveyors.com/wp-content/uploads/2011/07/img10.jpg" className="img-fluid" alt="Incline belt conveyor" />
                <div className={styles.homegalleryoverlay}>
                  <h4 aria-hidden="true">Incline belt conveyor</h4>
                  <div className={styles.homegallerybody}>
                    <p className="mb-5">Inclined belt conveyors are based on the slider bed conveyor, depending on the size and height of the product. The Inclined Conveyors are manufactured as single file conveyor systems, which cater to a jam-free discharge of the material or product. </p>
                    <small className="color-white">Read More</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mb-3 mb-lg-4">
              <div className={styles.homegalleryCard}>
                <a href="#" className={styles.homegalleryLink}></a>
                <img src="https://www.neoconveyors.com/wp-content/uploads/2011/07/Inspection-Conveyor.png" className="img-fluid" alt="Inspection Conveyor" />
                <div className={styles.homegalleryoverlay}>
                  <h4 aria-hidden="true">Inspection Conveyor</h4>
                  <div className={styles.homegallerybody}>
                    <p className="mb-5">Inspection conveyor on which products can be conveyed, allowing them to be visually scanned for imperfections or for sorting. However, the Belt Inspection Conveyors, do so using a durable belt conveyor, as opposed to rollers. </p>
                    <small className="color-white">Read More</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mb-3 mb-lg-4">
              <div className={styles.homegalleryCard}>
                <a href="#" className={styles.homegalleryLink}></a>
                <img src="https://www.neoconveyors.com//wp-content/uploads/2011/07/Assembly-Line-Belt-Conveyors.jpg" className="img-fluid" alt="Assembly line conveyor" />
                <div className={styles.homegalleryoverlay}>
                  <h4 aria-hidden="true">Assembly line conveyor</h4>
                  <div className={styles.homegallerybody}>
                    <p className="mb-5">Assembly Line Conveyors, are specifically designed to cater to the needs of diverse industries to perform multiple functions in different environments including cleanroom, process, and packaging avoiding</p>
                    <small className="color-white">Read More</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mb-3 mb-lg-4">
              <div className={styles.homegalleryCard}>
                <a href="#" className={styles.homegalleryLink}></a>
                <img src="https://www.neoconveyors.com/wp-content/uploads/2011/07/Loading-Unloading-Conveyors.jpg" className="img-fluid" alt="Loading unloading conveyors" />
                <div className={styles.homegalleryoverlay}>
                  <h4 aria-hidden="true">Load unload conveyors</h4>
                  <div className={styles.homegallerybody}>
                    <p className="mb-5">Mobile Truck loader, is an ideal choice, if, you have no loading or unloading dock. Truck loading conveyors are highly versatile. These conveyors require very little space and can be easily moved to load or unload vehicles</p>
                    <small className="color-white">Read More</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mb-3 mb-lg-4">
              <div className={styles.homegalleryCard}>
                <a href="#" className={styles.homegalleryLink}></a>
                <img src="https://www.neoconveyors.com/wp-content/uploads/2015/01/Stacker-Radial-Stacker.jpg" className="img-fluid" alt="Stacker / Radial Stacker" />
                <div className={styles.homegalleryoverlay}>
                  <h4 aria-hidden="true">Stacker / Radial Stacker</h4>
                  <div className={styles.homegallerybody}>
                    <p className="mb-5">Neo Conveyors offers a line of rugged and durable stackable conveyors, in either channel or truss frame design.  A stackable conveyor enables the user quick, easy transport and set up, saving time and money.</p>
                    <small className="color-white">Read More</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mb-3 mb-lg-4">
              <div className={styles.homegalleryCard}>
                <a href="#" className={styles.homegalleryLink}></a>
                <img src="https://www.neoconveyors.com/wp-content/uploads/2011/08/BUCKET-ELEVATORS.jpg" className="img-fluid" alt="Bucket elevator" />
                <div className={styles.homegalleryoverlay}>
                  <h4 aria-hidden="true">Bucket elevator</h4>
                  <div className={styles.homegallerybody}>
                    <p className="mb-5">Bucket Elevator System, are known for their quality and durability. We supply a full range of belt bucket elevators and Chain Bucket Elevator. Bucket Elevator consists of a number of buckets mounted in a series on to a chain </p>
                    <small className="color-white">Read More</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mb-3 mb-lg-4">
              <div className={styles.homegalleryCard}>
                <a href="#" className={styles.homegalleryLink}></a>
                <img src="https://www.neoconveyors.com/wp-content/uploads/2015/01/Centrifugal-Discharge-Bucket-Elevators.jpg" className="img-fluid" alt="Centrifugal Discharge Bucket" />
                <div className={styles.homegalleryoverlay}>
                  <h4 aria-hidden="true">Discharge Bucket</h4>
                  <div className={styles.homegallerybody}>
                    <p className="mb-5">The most common and popular elevator is the Centrifugal Discharge bucket Elevator, which may be vertical or inclined. On Centrifugal Elevator, the material can easily be loaded from a boot, a pit, or a pile. The centrifugal Bucket Elevator has the ability to move large amounts of material</p>
                    <small className="color-white">Read More</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mb-3 mb-lg-4">
              <div className={styles.homegalleryCard}>
                <a href="#" className={styles.homegalleryLink}></a>
                <img src="https://www.neoconveyors.com/wp-content/uploads/2020/03/gravity-roller-conveyor.jpg" className="img-fluid" alt="Roller Conveyor" />
                <div className={styles.homegalleryoverlay}>
                  <h4 aria-hidden="true">Roller Conveyor</h4>
                  <div className={styles.homegallerybody}>
                    <p className="mb-5">Roller conveyors are the proper choice when you need to sideload, push off, accumulate a product, or adjust the pressure on carrying rollers. Roller conveyor types are chain driven, belt driven, line shaft is driven, accumulation, or non-powered (gravity). </p>
                    <small className="color-white">Read More</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mb-3 mb-lg-4">
              <div className={styles.homegalleryCard}>
                <a href="https://www.conveline.com/product/diverter-unit" className={styles.homegalleryLink}></a>
                <img src="https://www.neoconveyors.com/wp-content/uploads/2011/07/Free-Roller-conveyor.jpg" className="img-fluid" alt="Free roller conveyor" />
                <div className={styles.homegalleryoverlay}>
                  <h4 aria-hidden="true">Free roller conveyor</h4>
                  <div className={styles.homegallerybody}>
                    <p className="mb-5">We manufacture Free Roller Conveyor, using mild steel, stainless steel, aluminum as per the requirement. It is in demand by industries, like pharmaceutical, steel foundries, etc.</p>
                    <small className="color-white">Read More</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='container mt-lg-3'>
          <div className='row'>
            <div className='col-12 text-center'>
              <h3 className="font-36 color-black mt-4 mb-3 my-lg-5">Our Neo Credentials</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
              <div className={styles.homeautomationcol}>
                <div className={styles.homeautomationBox}>
                  <div className={`${styles.homeautomationrow} row`}>
                    <div className="col-8">
                      <h3 className="number timer count-title count-number">10</h3>
                    </div>
                    <div className="col-4">
                      <span>+</span>
                    </div>
                  </div>
                </div>
                <p>Years of Experience in Conveyor Automation</p>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
              <div className={styles.homeautomationcol}>
                <div className={styles.homeautomationBox}>
                  <div className={`${styles.homeautomationrow} row`}>
                    <div className="col-8">
                      <h3 className="number nn timer count-title count-number">5,000</h3>
                    </div>
                    <div className="col-4">
                      <span>+</span>
                    </div>
                  </div>
                </div>
                <p>Installation of Conveyor Systems</p>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
              <div className={styles.homeautomationcol}>
                <div className={styles.homeautomationBox}>
                  <div className={`${styles.homeautomationrow} row`}>
                    <div className="col-8">
                      <h3 className="number nn2 timer count-title count-number">100</h3>
                    </div>
                    <div className="col-4">
                      <span>+</span>
                    </div>
                  </div>
                </div>
                <p>Dedicated Team Members Who Can Make Neo Conveyor a Reliable Brand </p>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
              <div className={styles.homeautomationcol}>
                <div className={styles.homeautomationBox}>
                  <div className={`${styles.homeautomationrow} row`}>
                    <div className="col-8">
                      <h3 className="number nn2 timer count-title count-number">500</h3>
                    </div>
                    <div className="col-4">
                      <span>+</span>
                    </div>
                  </div>
                </div>
                <p>Installation of Conveyor Projects</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.homeexcellenceSection} my-3 my-lg-5`}>
          <div className="container">
            <div className="row">
              <div className={`${styles.homeexcellenceLeft} col-md-6 col-12`}>
                <h3 className="font-60">LET'S BUILD CONVEYOR AUTOMATION TOGETHER</h3>
              </div>
              <div className={`${styles.homeexcellenceRight} col-md-6 col-12`} >

                <h3>Inspired By Excellence</h3>
                <p>Neo Conveyors a division, of Neo Packaging Industries, came into existence in the year 2007. Since, its inception, it has witnessed substantial growth. We the manufacturer and exporter of conveyors have located our establishment at Ghaziabad, Uttar Pradesh, adjoining Delhi. The founder members of the company are Graduate Engineers, Mr.Surender Sharma, Mr. Manoj Singh, and Mr. Mahinder Singh, having 20 years of rich experience in Material Handling Systems…</p>
                <p>We have established a state-of-the-art infrastructure facility, which is equipped with all the necessary amenities and machines, that are required in smooth production process. The infrastructure facility of our firm sprawls across an extensive area, which enables us in performing all our business tasks under a single roof.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container mb-5 mb-lg-5">
          <div className="row">
            <div className="col-12">
              <h3 className="font-36 color-black text-center mt-4 mb-2 mt-lg-0 mb-lg-3">Our News</h3>
            </div>
            <div className="col-12">
              <Slider {...settings}>
                <div className="py-3 px-2">
                  <div className={styles.homeBlogCard}>
                    <a href="#">
                      <img src="https://www.neoconveyors.com/wp-content/uploads/2011/07/APRON-CONVEYOR.jpg" className="img-fluid" alt="Apron Conveyors" />
                      <div className={styles.homeBlogTitle}>Apron Conveyors</div>
                    </a>
                  </div>
                </div>
                <div className="py-3 px-2">
                  <div className={styles.homeBlogCard}>
                    <a href="#">
                      <img src="https://www.neoconveyors.com//wp-content/uploads/2018/05/Belt-Conveyor-Manufacturers-in-India-1.jpg" className="img-fluid" alt="Belt conveyors" />
                      <div className={styles.homeBlogTitle}>Belt Conveyors</div>
                    </a>
                  </div>
                </div>
                <div className="py-3 px-2">
                  <div className={styles.homeBlogCard}>
                    <a href="#">
                      <img src="https://www.neoconveyors.com//wp-content/uploads/2011/07/Horizontal-Belt-Conveyor.jpg" className="img-fluid" alt="Horizontal belt conveyor" />
                      <div className={styles.homeBlogTitle}>Horizontal belt conveyor</div>
                    </a>
                  </div>
                </div>
                <div className="py-3 px-2">
                  <div className={styles.homeBlogCard}>
                    <a href="#">
                      <img src="https://www.neoconveyors.com/wp-content/uploads/2011/07/img10.jpg" className="img-fluid" alt="Incline belt conveyor" />
                      <div className={styles.homeBlogTitle}>Incline belt conveyor</div>
                    </a>
                  </div>
                </div>
                <div className="py-3 px-2">
                  <div className={styles.homeBlogCard}>
                    <a href="#">
                      <img src="https://www.neoconveyors.com/wp-content/uploads/2011/07/Inspection-Conveyor.png" className="img-fluid" alt="Inspection Conveyor" />
                      <div className={styles.homeBlogTitle}>Inspection conveyor</div>
                    </a>
                  </div>
                </div>
                <div className="py-3 px-2">
                  <div className={styles.homeBlogCard}>
                    <a href="#">
                      <img src="https://www.neoconveyors.com//wp-content/uploads/2011/07/Assembly-Line-Belt-Conveyors.jpg" className="img-fluid" alt="Assembly line conveyor" />
                      <div className={styles.homeBlogTitle}>Assembly line conveyor</div>
                    </a>
                  </div>
                </div>
              </Slider>
            </div>
            <div className="col-12 text-center mt-3">
              <Link href="/blog" className="btn btn-outline-primary btn-lg">See more blog</Link>
            </div>
          </div>
        </div>
        <div className={`${styles.homeservicesSection} mt-3 mt-lg-5`}>

          <div className="container">
            <div className="row justify-content-center">
              <div className={`${styles.homeservicesBody} col-md-10 col-12 text-center`}>
                <ul className={`${styles.navpills} nav nav-pills mb-3`} id="pills-tab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="service-tab-1" data-bs-toggle="pill" data-bs-target="#pills-tab-1" type="button" role="tab" aria-controls="pills-tab-1" aria-selected="false">
                      <object type="image/svg+xml" data="https://www.conveline.com/public/assets/images/service-customer-support.svg" className="img-fluid" title="Customer Support">
                        Customer Support
                      </object>
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="service-tab-2" data-bs-toggle="pill" data-bs-target="#pills-tab-2" type="button" role="tab" aria-controls="pills-tab-2" aria-selected="false">
                      <object type="image/svg+xml" data="https://www.conveline.com/public/assets/images/service-technical-support.svg" className="img-fluid" title="Technical Support">
                        Technical Support
                      </object>
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="service-tab-3" data-bs-toggle="pill" data-bs-target="#pills-tab-3" type="button" role="tab" aria-controls="pills-tab-3" aria-selected="true">
                      <object type="image/svg+xml" data="https://www.conveline.com/public/assets/images/service-worker.svg" className="img-fluid" title="Worker">
                        Worker
                      </object>
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div className="tab-pane fade" id="pills-tab-1" role="tabpanel" aria-labelledby="service-tab-1">
                    <h3>CONVEYOR AUTOMATION DESIGN CONSULTING</h3>

                    <p>We conceptualize, evaluate cost, and help you make the best decision about your conveyor systems and Conveyor automation investment with strategic production operations.</p>
                    <a href="#" className="btn btn-lg btn-outline-primary px-5 mt-3" >READ MORE</a>
                  </div>
                  <div className="tab-pane fade" id="pills-tab-2" role="tabpanel" aria-labelledby="service-tab-2">
                    <h3>CLIENT SUPPORT IN CONVEYOR SYSTEM DESIGN</h3>

                    <p>We over-prepare your conveyor design staff, quickly address technical issues, and help you maintain a worry-free conveyor system and automation design.</p>
                    <a href="#" className="btn btn-lg btn-outline-primary px-5 mt-3" >READ MORE</a>
                  </div>
                  <div className="tab-pane fade active show" id="pills-tab-3" role="tabpanel" aria-labelledby="service-tab-3">
                    <h3>SPEC EXECUTION AND CONVEYOR DESIGN</h3>

                    <p>Our experts validate workability, fill in the gaps, and manage seamless integration. Conveyor Systems operations are execution focused. Execution solutions ensures proper material handling solutions by guiding direction and ensure correct quantities remain in the pick areas which is governed by Conveyor Systems Operations.</p>
                    <a href="#" className="btn btn-lg btn-outline-primary px-5 mt-3" >READ MORE</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className={`${styles.hometestimonialSection} py-3 py-lg-5`}>
          <div className="container">
            <div className="row">
              <div className={`${styles.hometestimonialLeft} col-md-6 col-12`}>
                <FontAwesomeIcon icon={faQuoteLeft} />
              </div>
              <div className={`${styles.hometestimonialRight} col-md-6 col-12`} >
                <Slider {...testimonialSettings}>
                  <div>
                    <div className={styles.hometestimonialCard}>
                      <h3>We are using conveyors systems and conveyor</h3>
                      <p>We are using conveyors systems and conveyor rollers from Neo Conveyor Systems for the past many years. They are working smoothly. Their service staff is always supportive.</p>
                      <div className={styles.hometestimonialFooter}>
                        <h4>Anonymous</h4>
                        <p> NBC Bearing</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={styles.hometestimonialCard}>
                      <h3>Good systems and great support </h3>
                      <p>Good systems and great support by Neo Conveyor to meet automation requirements.</p>
                      <div className={styles.hometestimonialFooter}>
                        <h4>Mantti Sharma</h4>
                        <p>Assistant Manager IPCA Laboratories Limited </p>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.homebrochureSection} container-fluid mt-5`}>
          <div className="row">
            <Link href="/contact" className={`${styles.homebrochureLeft} col-12 col-lg-6`}>
              <div>
                <FontAwesomeIcon icon={faFileText} />
                <h3>Get Proposal for Neo Conveyors</h3>
              </div>
            </Link>

            <Link href="/contact" className={`${styles.homebrochureRight} col-12 col-lg-6`}>
              <div>
                <FontAwesomeIcon icon={faFilePdf} />
                <h3>View Our Brochure</h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
