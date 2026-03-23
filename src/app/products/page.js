import Image from "next/image";
import styles from '../../../public/styles/page.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFileText } from "@fortawesome/free-solid-svg-icons";
import AboutUSImg from "../../../public/images/aboutUs-banner.jpg";
import ProdcutLists from "./ProductLists";
import Link from "next/link";

export const metadata = {
  title: "Products | Neo Conveyors",
  description: "We specialize in the manufacture of Belt Conveyors and are one of best manufacturer and exporter of belt conveyors in India, which you can avail at Neo Conveyors at competitive price with best quality. We have a huge range of Belt Conveyors, which are in demand due to its robust construction and tensile strength.",
  keywords: ["Belt Conveyors Manufacturer, Belt Conveyors Exporter, Belt Conveyors India, Industrial Belt Conveyors, Conveyor Systems Manufacturer, Neo Conveyors, High-Quality Belt Conveyors, Competitive Price Conveyors, Robust Conveyor Systems, Tensile Strength Conveyors"],
  openGraph: {
    title: "Products | Neo Conveyors",
    description: "We specialize in the manufacture of Belt Conveyors and are one of best manufacturer and exporter of belt conveyors in India, which you can avail at Neo Conveyors at competitive price with best quality. We have a huge range of Belt Conveyors, which are in demand due to its robust construction and tensile strength.",
    url: "https://www.neoconveyors.com/products",
    siteName: "Neo Conveyors | Conveyor manufacturers in India",
    locale: "2020-09-08T10:39:56Z",
    type: "article",
  },
  canonical: `https://www.neoconveyors.com/products`,
  twitterCard: {
    card: "summary",
    site: "https://www.neoconveyors.com",
    title: "Products | Neo Conveyors",
    description: "We specialize in the manufacture of Belt Conveyors and are one of best manufacturer and exporter of belt conveyors in India, which you can avail at Neo Conveyors at competitive price with best quality. We have a huge range of Belt Conveyors, which are in demand due to its robust construction and tensile strength.",
  }
};

const Products = () => {

  return (
    <>
      <div className="banner w-100">
        <Image src={AboutUSImg} alt="Banner" className="w-100" />
        <div className="banner-content">
          <h1>Products Neo Conveyors</h1>
        </div>
      </div>

     {/* Import Prodcuts List */}
    <ProdcutLists />

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

export default Products;
