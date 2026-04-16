export const dynamic = 'force-dynamic';
import { connectToDatabase } from "../api/lib/dbConnect";
import About from "../api/model/About";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import AboutUSImg from "../../../public/images/aboutUs-banner.jpg";

// Dynamic metadata function
export async function generateMetadata() {
  await connectToDatabase();
  const about = await About.findOne({});
  return {
    title: about?.metaTitle,
    description: about?.metaDescription || "Neo Conveyors, best quality conveyors manufacturer in India, industrial conveyors system manufacturer since 2007. Best quality conveyors manufacturer in India, Number one in conveyors manufacturing Delhi India, Top conveyors manufacturer in Ghaziabad U.P India, quality conveyors manufacturer suppliers exporters India",
    keywords: about?.metaKeywords || "conveyor manufacturer,horizontal belt conveyor,assembly line conveyor,best quality conveyors manufacturer in india,number one in conveyors manufacturing delhi india,top conveyors manufacturer in ghaziabad u.p india,quality conveyors manufacturer suppliers exporters in india",
    openGraph: {
      title: about?.metaTitle || "Best Quality Conveyors manufacturer in India | Neo Conveyors",
      description: about?.metaDescription || "Neo Conveyors, best quality conveyors manufacturer in India, industrial conveyors system manufacturer since 2007. Best quality conveyors manufacturer in India, Number one in conveyors manufacturing Delhi India, Top conveyors manufacturer in Ghaziabad U.P India, quality conveyors manufacturer suppliers exporters India",
      url: "https://www.neoconveyors.com/about-us",
      siteName: "Neo Conveyors | Conveyor manufacturers in India",
      locale: "2020-09-08T10:39:56Z",
      type: "article",
    },
    alternates: {
      canonical: "https://www.neoconveyors.com/about-us",
    },
    twitter: {
      card: "summary",
      site: "https://www.neoconveyors.com",
      title: about?.metaTitle || "Best Quality Conveyors manufacturer in India | Neo Conveyors",
      description: about?.metaDescription || "Neo Conveyors, best quality conveyors manufacturer in India, industrial conveyors system manufacturer since 2007. Best quality conveyors manufacturer in India, Number one in conveyors manufacturing Delhi India, Top conveyors manufacturer in Ghaziabad U.P India, quality conveyors manufacturer suppliers exporters India",
    }
  };
}

const AboutPage = async () => {
  await connectToDatabase();
  const about = await About.findOne({});
  return (
    <>
      <div className="banner w-100">
        <Image src={AboutUSImg} alt="Banner" className="w-100" />
      </div>
      <div className="page-content py-3 mb-lg-3 py-lg-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">About us</li>
                </ol>
              </nav>
            </div>
            <div className="col-lg-4">
              <div className="about-us-summary-card">
                <h2>NEO CONVEYORS</h2>
                <p>
                  Neo Conveyors was established in 2007 by a founding member and current MD. We specialise in materials handling systems integration with a strong focus on design, project management, implementation and after-sales support.
                </p>
                <h5 className="about-us-summary-card__label">COMPANY PROFILE PDF</h5>
                <Link href="/pdf/Catalog_Neo_Conveyors.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-light about-us-download-btn">
                  <FontAwesomeIcon icon={faFilePdf} className="me-2" />
                  Download
                </Link>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="about-us-features">
                <h2>WHY CHOOSE NEO CONVEYORS?</h2>
                <div className="about-us-content mt-4" dangerouslySetInnerHTML={{ __html: about?.content || "<p>No About Us content found.</p>" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;