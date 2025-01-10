"use client";
import Image from 'next/image';
import Link from 'next/link';
import './nav.css';
import { useSelector } from 'react-redux';

const Nav = () => {
  // recuperer le token depuis le store avec useSelector

  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <nav className="main-nav">
      <Link href="/" className="main-nav-logo">
        <Image
          src="/argentBankLogo.png"
          alt="Argent Bank Logo"
          width={200}
          height={54}
          priority
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {!isAuthenticated ?
          <Link href="/signin" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link> 
          : 
          <Link href="/signout" className="main-nav-item">
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>}

      </div>
    </nav>
  );
};

export default Nav;
