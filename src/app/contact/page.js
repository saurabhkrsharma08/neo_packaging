import Image from "next/image";
import Link from "next/link";
import ContactForm from "./ContactForm";
import ContactUSImg from "../../../public/images/contactbanner.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export const metadata = {
  title: "Contact Us-Top quality conveyors manufacturer | Neo Conveyors",
  description: "Neo conveyors are top quality conveyors manufacturer in Ghaziabad UP India,quality conveyors manufacturing Delhi India,Expert in conveying and continuous materials handling, leading manufacturer of Industrial Conveyor in Delhi, Noida and India.Best quality conveyors manufacturer near me.",
  keywords: ["neo conveyors are top quality conveyors manufacturer in ghaziabad up india,quality conveyors manufacturing delhi india,expert in conveying and continuous materials handling,leading manufacturer of industrial conveyor in delhi,noida and india.best quality conveyors manufacturer near me."],
  openGraph: {
    title: "Contact Us-Top quality conveyors manufacturer | Neo Conveyors",
    description: "Neo conveyors are top quality conveyors manufacturer in Ghaziabad UP India,quality conveyors manufacturing Delhi India,Expert in conveying and continuous materials handling, leading manufacturer of Industrial Conveyor in Delhi, Noida and India.Best quality conveyors manufacturer near me.",
    url: "https://www.neoconveyors.com/contact",
    siteName: "Neo Conveyors | Conveyor manufacturers in India",
    locale: "2020-09-08T10:39:56Z",
    type: "article",
  },
  canonical: `https://www.neoconveyors.com/contact`,
  twitterCard: {
    card: "summary",
    site: "https://www.neoconveyors.com",
    title: "Contact Us-Top quality conveyors manufacturer | Neo Conveyors",
    description: "Neo conveyors are top quality conveyors manufacturer in Ghaziabad UP India,quality conveyors manufacturing Delhi India,Expert in conveying and continuous materials handling, leading manufacturer of Industrial Conveyor in Delhi, Noida and India.Best quality conveyors manufacturer near me.",
  }
};

const Contact = () => {
  return (
    <main>
      {/* Banner Section */}
      <div className="banner w-100">
        <Image src={ContactUSImg} alt="Contact Us Banner" className="w-100" priority />
        <div className="banner-content">
          <h1>Contact Neo Conveyors</h1>
        </div>
      </div>

      {/* Page Content */}
      <section className="page-content py-3 mb-lg-3 py-lg-4">
        <div className="container">
          <div className="row">
            {/* Breadcrumb */}
            <div className="col-12">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Contact us
                  </li>
                </ol>
              </nav>
            </div>

            {/* Contact Form */}
            <div className="col-lg-6">
              <h2 className="content-heading mb-2">Get In Touch</h2>
              <p>Your email address will not be published. Required fields are marked *.</p>
              <ContactForm />
            </div>

            {/* Contact Details */}
            <div className="col-lg-6 mt-5 mt-lg-0">
              <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d56022.28677447105!2d77.461872!3d28.64795145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sG-414%2C+UPSIDC+Phase+-+II%2C+Masoori+Gulawati+Road%2C+Industrial+Area%2C+Ghazibad+(U.P.)!5e0!3m2!1sen!2sin!4v1431852789733" className="w-100" height="450" ></iframe>
            </div>

            {/* Company Information */}
            <div className="col-lg-8 mt-5 offset-lg-2">
              <div className="table-responsive">
                <table className="table align-middle table-bordered">
                  <tbody>
                    <tr>
                      <td><strong>Contact Person</strong></td>
                      <td>Mr. Manoj Singh & Mahendra Singh</td>
                    </tr>
                    <tr>
                      <td><strong>Address</strong></td>
                      <td>G-414, UPSIDC Phase-II, Masoori Gulawati Road, Industrial Area, Ghaziabad (U.P.) INDIA</td>
                    </tr>
                    <tr>
                      <td><strong>Branch Office</strong></td>
                      <td>Surya Darsan Society, Green Road, Navsari-396445, Gujarat</td>
                    </tr>
                    <tr>
                      <td><strong>Fix Phone</strong></td>
                      <td>+91-120-2807321</td>
                    </tr>
                    <tr>
                      <td><strong>Phone</strong></td>
                      <td>
                        <FontAwesomeIcon icon={faWhatsapp} /> +91-9654112235/36<br />
                        <FontAwesomeIcon icon={faWhatsapp} /> +91-9560575598 (Gujarat)
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Email</strong></td>
                      <td>
                        <a href="mailto:info@neoconveyors.com">info@neoconveyors.com</a>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Alternate Email</strong></td>
                      <td>
                        <a href="mailto:sales@neoconveyors.com">sales@neoconveyors.com</a>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Website</strong></td>
                      <td>
                        <a href="https://www.neoconveyors.com">www.neoconveyors.com</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
