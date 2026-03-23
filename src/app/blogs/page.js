
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AboutUSImg from "../../../public/images/aboutUs-banner.jpg";
import styles from '../../../public/styles/page.module.scss';
import Image from "next/image";
import { faFilePdf, faFileText } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import BlogLists from "./BlogLists";

export const metadata = {
  title: "Blog | conveyor manufacturer in india | Neo Conveyors",
  description: "Neo conveyors, conveyor manufacturer in India, industrial conveyor systems.we are specialized in Belt conveyors, chain conveyors, screw conveyors,bucket elevators, Bag stacker, wire mesh conveyors,roller conveyors, magnetic conveyors, Truck loader conveyors.",
  keywords: ["Conveyor Manufacturer in India, Industrial Belt Conveyors Manufacturer Suppliers Exporters Ghaziabad UP India, Screw Conveyors Manufacturer for Cement Manufacturing Industries, Chain Conveyors Manufacturer for Pallet Handling, Bucket Elevators Manufacturer for Bulk Materials Handling, Sugar Bag Stacking Conveyors Manufacturer India, Affordable and Reliable Conveyors, Most Reliable Conveyors Manufacturer in Delhi NCR India, Custom Made Industrial Conveyor Systems Manufacturer in Delhi, Best Quality Conveyors Manufacturer in Noida, Conveyor Machine Manufacturer India, Top 10 Conveyors Manufacturing Companies in India, Drag Chain Conveyors Manufacturer India, Custom Made Drag Chain Conveyors Manufacturer in India, Top 10 Drag Chain Conveyors Manufacturer in Delhi India, Multi-Functional Chain Conveyors, Chain Conveyors Manufacturer in India, Pallet Handling Chain Conveyors Manufacturer in India, Quality Conveyors Manufacturer India, Belt Conveyors Manufacturer India, 5 Tips to Keep Your Chain Conveyors Operational, Conveyor Automation Systems Manufacturer in India, Industrial Automation Systems, Custom Made Conveyor Systems Manufacturer in Delhi India, Bucket Elevators for Transporting Flowable Materials, Bucket Elevator Manufacturer in India, Rice Handling Bucket Elevator Manufacturer in India, Bulk Materials Handling Bucket Elevator Manufacturer in India, Bucket Elevator Manufacturer in Pune, Bucket Elevators Manufacturer in Ludhiana, Custom Made Bucket Elevators Manufacturer, Bucket Elevators Manufacturer in Mumbai, FAQ Bucket Elevators, What Are Bucket Elevators, Bucket Elevators Manufacturer Near Me, Bucket Elevators Suppliers Exporters India, Centrifugal Bucket Elevators Manufacturer Delhi India, Z Type Bucket Elevators Manufacturer Ghaziabad UP India, Bulk Materials Handling Bucket Elevators Manufacturer Uttarakhand, Top 10 Bucket Elevators Manufacturer in India, Inclined Belt Conveyors Manufacturer in India, Inclined Belt Conveyor, Inclined Cleated Belt Conveyors, Inclined Belt Conveyor Manufacturers in India, Conveyor Belt Price in India, Conveyor Belt Manufacturers in Mumbai, Types of Conveyor Belts, Conveyor Manufacturers in Delhi NCR, Conveyor System Manufacturer, Automotive Conveyor Systems, Top Conveyor Manufacturers in India, Overhead Conveyor Manufacturer in India."],
  openGraph: {
    title: "Blog | conveyor manufacturer in india | Neo Conveyors",
    description: "Neo conveyors, conveyor manufacturer in India, industrial conveyor systems.we are specialized in Belt conveyors, chain conveyors, screw conveyors,bucket elevators, Bag stacker, wire mesh conveyors,roller conveyors, magnetic conveyors, Truck loader conveyors.",
    url: "https://www.neoconveyors.com/blogs",
    siteName: "Neo Conveyors | Conveyor manufacturers in India",
    locale: "2020-09-08T10:39:56Z",
    type: "article",
  },
  canonical: `https://www.neoconveyors.com/blogs`,
  twitterCard: {
    card: "summary",
    site: "https://www.neoconveyors.com",
    title: "Blog | conveyor manufacturer in india | Neo Conveyors",
    description: "Neo conveyors, conveyor manufacturer in India, industrial conveyor systems.we are specialized in Belt conveyors, chain conveyors, screw conveyors,bucket elevators, Bag stacker, wire mesh conveyors,roller conveyors, magnetic conveyors, Truck loader conveyors.",
  }
};

const Blog = () => {

  return (
    <>
      <div className="banner w-100">
        <Image src={AboutUSImg} alt="Banner" className="w-100" />
        <div className="banner-content">
          <h1> Blog and Events</h1>
        </div>
      </div>

      <BlogLists />
      
      <div className={`${styles.homebrochureSection} container-fluid mt-3 mt-lg-3`}>
        <div className="row">
           <Link href="/contact" className={`${styles.homebrochureLeft} col-12 col-lg-6`}>
              <div>
                <FontAwesomeIcon icon={faFileText} />
                <h3>Get It Now</h3>
              </div>
            </Link>

            <Link href="../pdf/Catalog_Neo_Conveyors.pdf" target="_blank" rel="noopener noreferrer" className={`${styles.homebrochureRight} col-12 col-lg-6`}>
              <div>
                <FontAwesomeIcon icon={faFilePdf} />
                <h3>Discover Our Brochure</h3>
              </div>
            </Link>
        </div>
      </div>
    </>
  );
};

export default Blog;