"use client";

import { usePathname } from "next/navigation";
import Header from "../../public/components/Header";
import Footer from "../../public/components/Footer";
import BootstrapClient from "../../public/components/BootstrapClient";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header />}
      <main className="main-content bg-white">{children}</main>
      <BootstrapClient />
      {!isAdminRoute && <Footer />}
    </>
  );
}