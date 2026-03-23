"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import MyImage from "../images/neo_logo_circular.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faLinkedinIn, faTwitter, faWhatsapp, faWordpressSimple, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope, faHome, faBuilding, faMicrophone, faEnvelopeOpen, faBars, faClose, faQuestionCircle, faShoppingCart, faPhotoVideo } from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="topbar w-100">
        <div className="container">
          <div className="row justify-content-between">

            <div className="col-md-auto ms-auto topbar-right">
              <Link href="tel:+919081915912"><FontAwesomeIcon icon={faPhone} size="1x" />+91-9654112235</Link> |
              <Link href="mailto:neoconveyors@yahoo.com"><FontAwesomeIcon icon={faEnvelope} size="1x" />neoconveyors@yahoo.com</Link>
            </div>
          </div>

        </div>
      </div>
      <header className="bg-gray-900 text-white">
        <nav className={`navbar navbar-light pt-0 ${scrolled ? "scroll-topbar" : ""}`}>

          <div className="container position-relative navbar2">
            <h1 className="mb-0">
              <Link className="navbar-brand" href="/">
                <Image src={MyImage} alt="Remote Image" width={150} />
              </Link>
            </h1>
            <ul className="nav col-12 col-lg-auto ms-auto justify-content-center">
              <li className="nav-item">
                <Link href="/">

                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link href="#" className="nav-link dropdown-toggle" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">

                  Services<em className="bi bi-chevron-down"></em>
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                  <div className="inner-dropdown">
                    <li className="col-12 col-lg-6">
                      <div className="p-3 pt-0">
                        <a className="dropdown-item" href="#">Auditing</a>
                        <p>Our expert team will perform a detailed evaluation of your materials handling requirements.</p>
                      </div>
                    </li>
                    <li className="col-12 col-lg-6">
                      <div className="p-3 pt-0">
                        <a className="dropdown-item" href="#">Project Management</a>
                        <p>Turn-key project management services that deliver exceptional results for your business.</p>
                      </div>
                    </li>
                    <li className="col-12 col-lg-6">
                      <div className="p-3 pt-0">
                        <a className="dropdown-item" href="#">Design</a>
                        <p>Our team will design a customized solution aimed at improving the flow of materials and enhancing the overall efficiency of your?</p>
                      </div>
                    </li>
                    <li className="col-12 col-lg-6">
                      <div className="p-3 pt-0">
                        <a className="dropdown-item" href="#">Upgrades & Refurbishments</a>
                        <p>Neo conveyors will evaluate your current plant and machinery and undertake to modify, upgrade, or refurbish your equipment where</p>
                      </div>
                    </li>
                  </div>
                </ul>
              </li>

              <li className="nav-item">
                <Link href="/products">

                  Products
                </Link>
              </li>

              <li className="nav-item dropdown">
                <Link href="/about-us" className="nav-link dropdown-toggle" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">

                  About<em className="bi bi-chevron-down"></em>
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                  <div className="inner-dropdown">
                    <li className="col-12 col-lg-4">
                      <div className="p-3 pt-0">
                        <a className="dropdown-item" href="#">About Us</a>
                        <p>
                          Neoconveyors was established in 2004 by founding member and current MD, Mr Richard Nepgen. Who identified the need in the market for a specialised materials handling systems integration company.</p>
                      </div>
                    </li>
                    <li className="col-12 col-lg-4">
                      <div className="p-3 pt-0">
                        <a className="dropdown-item" href="#">Our Team</a>
                        <p>
                          Our team of experts is ready to help you with your next project.</p>
                      </div>
                    </li>
                    <li className="col-12 col-lg-4">
                      <div className="p-3 pt-0">
                        <a className="dropdown-item" href="#">Partners</a>
                        <p>Our team will design a customized solution aimed at improving the flow of materials and enhancing the overall efficiency of your?</p>
                      </div>
                    </li>

                  </div>
                </ul>
              </li>
              <li className="nav-item">
                <Link href="/blogs">

                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/gallery">

                  Gallery
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/faqs">

                  Faq's
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/contact">

                  Contact
                </Link>
              </li>
            </ul>
            <div className="d-none d-lg-block">
              <ul className="socialLinks">
                <li className="linkedin"><a href="https://www.linkedin.com/in/manoj-singh-neo-conveyors/" className="btn btn-social" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedinIn} /></a></li>
                <li className="facebook"><a href="https://www.facebook.com/neoconveyors1" className="btn btn-social" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookF} /></a></li>
                <li className="twitter"><a href="https://x.com/i/flow/login?redirect_after_login=%2Fneoconveyors" className="btn btn-social" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /></a></li>
                <li className="youtube"><a href="https://www.youtube.com/watch?v=yrTKpipVZ_8" className="btn btn-social" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faYoutube} /></a></li>
              </ul>
            </div>
            <button className="navbar-toggler d-block d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
              <FontAwesomeIcon icon={faBars} />
            </button>
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight">
              <div className="offcanvas-header">
                <button type="button" className="btn btn-tranparent" data-bs-dismiss="offcanvas" aria-label="Close" title="Close"><FontAwesomeIcon icon={faClose} /></button>
              </div>
              <div className="offcanvas-body d-flex flex-column">
                <ul className="navbar-nav justify-content-start flex-grow-1">
                  <li className="nav-item">
                    <Link className="nav-link " href="/about-us" title="About Neo Conveyors">Neo Conveyors</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/products" title="Products &amp; Solutions">Products</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/gallery" title="Gallary &amp; Papers">Gallery</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " href="/blogs" title="Events &amp; News">News & Events</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " href="/faqs" title="faqs">Faq</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " href="/contact" title="contact Us">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
