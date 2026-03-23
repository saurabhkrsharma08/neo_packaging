"use client";

import { useState, useEffect } from "react";
import { faFacebookF, faLinkedinIn, faTwitter, faWhatsapp, faWordpressSimple, faYoutube } from "@fortawesome/free-brands-svg-icons";
import MyImage from "../images/neo_logo_circular.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { faChevronRight, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import axios from "axios";

const Footer = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/product?all=true");
        setProducts(response.data.slice(0, 7)); // Limit to 6-7 products
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div id="footerSection" className="footer">
        <div className="container footer-container bg-white pb-5">
          <div className="row justify-content-between">
            <div className="col-lg-3 text-lg-start border-dashed">
               <a className="navbar-brand" href="#">
                <Image src={MyImage} className="img-fluid" alt="Neo" width={100} />
              </a>
              <p className="font-20 color-black mt-3">we focus on fully understanding our clients’ requirements and provide solutions that will add value to your business. We partner with our clients from the beginning and believe your success is our success and see every client as a long-term relationship of growth, trust and support. </p>
            </div>
            <div className="col-lg-3 text-start border-dashed">
              <h3 className="font-26 color-black">Connect with us</h3>
              <ul className="socialLinks mt-md-4">
                <li className="linkedin"><a href="https://www.linkedin.com/in/manoj-singh-neo-conveyors/" className="btn btn-social" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedinIn} /></a></li>
                <li className="facebook"><a href="https://www.facebook.com/neoconveyors1" className="btn btn-social" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookF} /></a></li>
                <li className="twitter"><a href="https://x.com/i/flow/login?redirect_after_login=%2Fneoconveyors" className="btn btn-social" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /></a></li>
                <li className="youtube"><a href="https://www.youtube.com/watch?v=yrTKpipVZ_8" className="btn btn-social" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faYoutube} /></a></li>
              </ul>

            </div>
            <div className="col-lg-3 border-dashed">
              <h3 className="font-26 color-black">Menus</h3>
              <ul className="list-unstyled mt-3">
                <li className="mb-1"><a href="/about-us">Company</a></li>
                <li className="mb-1"><a href="/products">Products</a></li>
                <li className="mb-1"><a href="/gallery">Gallery</a></li>
                <li className="mb-1"><a href="/blogs">News &amp; Events</a></li>
                <li className="mb-1"><a href="/technical-support">Technical Support</a></li>
                <li className="mb-1"><a href="/contact">Contact Us</a></li>
              </ul>
            </div>
            <div className="col-lg-3 subscribeSection">
              <h3 className="font-26 color-black">Contact Info</h3>
              <ul className="list-unstyled mt-3">
                <li className="mb-2"><FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" /> Neo Conveyors Pvt. Ltd, Plot No. A-5, MIDC Industrial Area, Hingna Road, Nagpur - 440016, Maharashtra, India.</li>
                <li className="mb-2">Phone: <a href="tel:+919654112235">+91 96541 12235</a></li>
                <li className="mb-2">Email: <a href="mailto:">abc@infoneoconvyors.com</a></li>
              </ul>
            </div>
          </div>

        </div>
        <div className="container footer-section">
          <div className="row mt-2">
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center">
              <p className="font-16">© 2025 Neo Conveyors Pvt. Ltd</p>
            </div>
          </div>
        </div>
      </div>
      <div className="stickybar">
        <div className="whatsapp">
          <Link href="tel:+919654112235">
            <FontAwesomeIcon icon={faWhatsapp} />
          </Link>
        </div>
        <div className="email">
          <Link href="mailto:neoconveyors@yahoo.com" target="blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faEnvelope} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Footer;