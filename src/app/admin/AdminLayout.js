import React from 'react';
import { useRouter } from 'next/navigation';
import MyImage from "../../../public/images/neo_logo_circular.png";
import Link from "next/link";
import Image from "next/image";

const AdminLayout = ({ children }) => {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    router.push('/admin/login');
  };

  return (
    <div className="bg-white min-vh-100">
      <header className="d-flex justify-content-between align-items-center p-3 bg-white bg-cs">
        <div>
          <Link className="navbar-brand" href="/admin">
             <Image src={MyImage} alt="Remote Image" width={150} />
          </Link>
        </div>
        <div>
          <button className="btn btn-outline-secondary clr-wht br-solid-wht" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
      <main className="container-fluid mt-5 bg-white min-vh-100">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;