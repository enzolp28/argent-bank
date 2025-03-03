"use client";
import Image from 'next/image';
import Link from 'next/link';
import './nav.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/redux/auth/slice';
import { clearProfile } from '@/redux/profile/slice';

const Nav = () => {
  // recuperer le token depuis le store avec useSelector
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state?.auth);
  const { firstName } = useSelector((state) => state?.profile);

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
          <Link onClick={() => {
              // Clear storage
              localStorage.removeItem('token');
              sessionStorage.removeItem('token');
              // Clear Redux state
              dispatch(logout());
              dispatch(clearProfile());
            }} href="/" className="main-nav-item">
            {firstName}
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>}

      </div>
    </nav>
  );
};

export default Nav;
