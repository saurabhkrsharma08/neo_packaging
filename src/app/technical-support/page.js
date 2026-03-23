import Image from "next/image";
import Link from "next/link";
import AboutUSImg from "../../../public/images/support.jpg";
import ProductsList from "../about-us/ProdcutList"; // Import client component

export const metadata = {
  title: "Best Quality Conveyors manufacturer in India | Neo Conveyors",
  description: "Neo Conveyors, best quality conveyors manufacturer in India, industrial conveyors system manufacturer since 2007. Best quality conveyors manufacturer in India, Number one in conveyors manufacturing Delhi India, Top conveyors manufacturer in Ghaziabad U.P India, quality conveyors manufacturer suppliers exporters India",
  keywords: ["conveyor manufacturer,horizontal belt conveyor,assembly line conveyor,best quality conveyors manufacturer in india,number one in conveyors manufacturing delhi india,top conveyors manufacturer in ghaziabad u.p india,quality conveyors manufacturer suppliers exporters in india"],
  openGraph: {
    title: "Best Quality Conveyors manufacturer in India | Neo Conveyors",
    description: "Neo Conveyors, best quality conveyors manufacturer in India, industrial conveyors system manufacturer since 2007. Best quality conveyors manufacturer in India, Number one in conveyors manufacturing Delhi India, Top conveyors manufacturer in Ghaziabad U.P India, quality conveyors manufacturer suppliers exporters India",
    url: "https://www.neoconveyors.com/technical-support",
    siteName: "Neo Conveyors | Conveyor manufacturers in India",
    locale: "2020-09-08T10:39:56Z",
    type: "article",
  },
  canonical: `https://www.neoconveyors.com/technical-support`,
  twitterCard: {
    card: "summary",
    site: "https://www.neoconveyors.com",
    title: "Best Quality Conveyors manufacturer in India | Neo Conveyors",
    description: "Neo Conveyors, best quality conveyors manufacturer in India, industrial conveyors system manufacturer since 2007. Best quality conveyors manufacturer in India, Number one in conveyors manufacturing Delhi India, Top conveyors manufacturer in Ghaziabad U.P India, quality conveyors manufacturer suppliers exporters India",
  }
};

const About = () => {
  return (
    <>
      <div className="banner w-100">
        <Image src={AboutUSImg} alt="Banner" className="w-100" />
        <div className="banner-content">
          <h1>Technical Support at Neo Conveyors</h1>
        </div>
      </div>
      <div className="page-content py-3 mb-lg-3 py-lg-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Technical Support</li>
                </ol>
              </nav>
            </div>
            <div className="col-lg-8">
                <p>At Neo Conveyors, we understand that seamless operations and minimal downtime are critical to your productivity. 
                    Our dedicated technical support team is committed to ensuring your conveyor systems perform optimally 
                    through proactive and responsive solutions. Below are key features of our technical support services:
                </p>

                <ul>
                    <li><strong>24/7 Availability:</strong> Round-the-clock assistance to address emergencies, ensuring rapid resolution and uninterrupted operations.</li>
                    <li><strong>Expert Technicians:</strong> Certified professionals with in-depth knowledge of Neo Conveyor systems provide on-site or remote troubleshooting, repairs, and system optimization.</li>
                    <li><strong>Remote Diagnostics:</strong> Advanced tools enable real-time monitoring and diagnostics to swiftly identify and resolve issues, reducing downtime.</li>
                    <li><strong>Preventive Maintenance Programs:</strong> Scheduled inspections and maintenance to prevent failures, extend equipment lifespan, and maximize efficiency.</li>
                    <li><strong>Training & Knowledge Transfer:</strong> Customized training sessions for your team on operation, safety protocols, and basic troubleshooting.</li>
                    <li><strong>Comprehensive Documentation:</strong> Access to detailed manuals, troubleshooting guides, and FAQs for self-service support.</li>
                    <li><strong>Genuine Parts & Inventory Management:</strong> Guaranteed availability of OEM parts with expedited shipping to maintain system integrity.</li>
                    <li><strong>Service Level Agreements (SLAs):</strong> Tailored agreements with defined response times to meet your operational priorities.</li>
                </ul>

                <div className="contact">
                    <p>For assistance, contact our support team at  
                        <a href="mailto:info@neoconveyors.com">info@neoconveyors.com</a>  
                        or call <a href="tel:+919654112236">+91 9654112236</a>.
                    </p>
                </div>
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-3">
              <div className="sidebar">
                <h2 className="border-title color-black">Industries Conveyors</h2>
                <ProductsList /> {/* Client component */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
