import Head from "next/head";
import ClientLayout from "./ClientLayout";
import "../../public/styles/globals.scss";
<link rel="sitemap" type="application/xml" title="Sitemap" href="https://www.neoconveyors.com/sitemap.xml" /> // Import Bootstrap CSS

export const metadata = {
  title: "Conveyors Manufacturer India | Belt Conveyor | Neo Conveyors",
  description: "Conveyors Manufacturer in India Neo Conveyors, as the name suggests a ‘new’ established in the year 2007, a division of Neo Packaging Industries. Neo conveyors are the masters of conveyors manufacturer in India and exporting them worldwide. The huge range comprises of Belt Conveyors, Roller Conveyors, Chain Conveyors, Apron Conveyors,… ",
  openGraph: {
    title: "Conveyors Manufacturer India | Belt Conveyor | Neo Conveyors",
    description: "Conveyors Manufacturer in India Neo Conveyors, as the name suggests a ‘new’ established in the year 2007, a division of Neo Packaging Industries. Neo conveyors are the masters of conveyors manufacturer in India and exporting them worldwide. The huge range comprises of Belt Conveyors, Roller Conveyors, Chain Conveyors, Apron Conveyors,… ",
    url: "https://www.neoconveyors.com",
    siteName: "Neo Conveyors | Conveyor manufacturers in India",
    locale: "2020-09-08T10:39:56Z",
    type: "article",
  },
  canonical: `https://www.neoconveyors.com`,
  twitterCard: {
    card: "summary",
    site: "https://www.neoconveyors.com",
    title: "Conveyors Manufacturer India | Belt Conveyor | Neo Conveyors",
    description: "Conveyors Manufacturer in India Neo Conveyors, as the name suggests a ‘new’ established in the year 2007, a division of Neo Packaging Industries. Neo conveyors are the masters of conveyors manufacturer in India and exporting them worldwide. The huge range comprises of Belt Conveyors, Roller Conveyors, Chain Conveyors, Apron Conveyors,… ",
  },
  google: {
    content: 'nositelinkssearchbox'
  },
  googleSiteVerification: "hFE4oC6N74KPe9tU6CQX7GqeJoJRGfx0Faqm9MxCvuk",
  msvalidate: "6ED90031B1757345AA8349A3F5A65E02",
  pDomainVerify: "85349ee2e73673a7630c61a29a88da52"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
        />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-1018478079"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-1018478079');
            `,
          }}
        />
      </Head>
      <body>
        <div className="container p-0">
        <ClientLayout>{children}</ClientLayout>
        </div>
      </body>
    </html>
  );
  
}
