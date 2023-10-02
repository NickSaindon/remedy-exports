import React, { useContext, useState } from 'react';
import { Store } from '../utils/Store';
import Link from 'next/link'
import Image from "next/image";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';


function Navbar() {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const { userInfo, cart } = state;
    const [anchorEl, setAnchorEl] = useState(null);
  
    const loginMenuCloseHandler = (e, redirect) => {
      setAnchorEl(null);
      if (redirect) {
        router.push(redirect);
      }
    };
  
    const logoutClickHandler = () => {
      setAnchorEl(null);
      dispatch({ type: 'USER_LOGOUT' });
      Cookies.remove('userInfo');
      Cookies.remove('cartItems');
      Cookies.remove('shippinhAddress');
      router.push('/');
    };

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <Link href="/">
          <div className="navbar-brand">
            <Image src="/images/remedy_exports_logo.png" width={45} height={45} alt="Computer and mobile devices" />
          </div>
        </Link>        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor03">
          <ul className="navbar-nav navbar-left me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" className={router.asPath == "/" ? "nav-link active" : "nav-link"} aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className={router.asPath == "/about" ? "nav-link active" : "nav-link"}>
                  About  
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link href="/news" className={router.asPath == "/news" ? "nav-link active" : "nav-link"}>
                  News  
              </Link>
            </li> */}
            <li className="nav-item" >
              <Link href="/contact" className={router.asPath == "/contact" ? "nav-link active" : "nav-link"}>
                  Contact  
              </Link>
            </li>
            {userInfo && userInfo.isVendor === true &&
              <li>
                <Link href="/products" className={router.asPath == "/products" ? "nav-link active" : "nav-link"}>
                    Products
                </Link>
              </li>
            }
          </ul>
          <div className="d-flex">
            <ul className="navbar-nav navbar-left me-auto mb-2 mb-lg-0">
              {userInfo && userInfo.isVendor === true &&
                <li className="nav-item">
                <Link href="/cart" className={router.asPath == "/cart" ? "nav-link active" : "nav-link"}>
                {cart.cartItems.length > 0 ? (
                  <>
                    Cart
                    <span className="position-absolute top-2 translate-middle bg-primary border border-light rounded-circle">
                      {cart.cartItems.length}
                    </span>
                  </>
                    ) : (
                      'Cart'
                    )} 
                </Link>
              </li>
              }
              {userInfo && userInfo.isAdmin === true &&
                <li className="nav-item">
                <Link href="/cart" className={router.asPath == "/cart" ? "nav-link active" : "nav-link"}>
                {cart.cartItems.length > 0 ? (
                  <>
                    Cart
                    <span className="position-absolute top-2 translate-middle bg-primary border border-light rounded-circle">
                      {cart.cartItems.length}
                    </span>
                  </>
                    ) : (
                      'Cart'
                    )} 
                </Link>
              </li>
              }
              {userInfo && userInfo.isAdmin === true ? (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Admin
                  </a>
                  <ul 
                    anchorEl={anchorEl}
                    className="dropdown-menu dropdown-menu-end" 
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                        <a 
                          className="dropdown-item"
                          onClick={(e) => loginMenuCloseHandler(e, '/admin/createorder')}
                        >
                          Create Order
                        </a>
                    </li>
                    <li> 
                      <a 
                        className="dropdown-item"
                        onClick={(e) => loginMenuCloseHandler(e, '/admin/orders')}
                      >                        
                        Orders
                      </a>
                    </li>
                    <li>
                      <a 
                        className="dropdown-item"
                        onClick={(e) => loginMenuCloseHandler(e, '/admin/dashboard')}
                      >
                          Dashboard
                      </a>
                    </li>
                    <li>
                        <div 
                          className="dropdown-item"
                          onClick={logoutClickHandler}
                        >
                          Logout
                        </div>
                    </li>
                  </ul>
                </li>
              ) : userInfo && userInfo.isVendor === true ? (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {userInfo.name}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li>
                      <a 
                        className="dropdown-item"
                        onClick={(e) => loginMenuCloseHandler(e, '/vendor/profile')}
                      >
                        Profile
                      </a>
                    </li>
                    <li>
                      <a 
                          className="dropdown-item"
                          onClick={(e) => loginMenuCloseHandler(e, '/vendor/order-history')}
                      >
                          Order History
                        </a>
                    </li>
                    <li>
                        <div 
                          className="dropdown-item"
                          onClick={logoutClickHandler}
                        >
                          Logout
                        </div>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item" >
                  <Link href="/login" className={router.asPath == "/login" ? "nav-link active" : "nav-link"}>
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;