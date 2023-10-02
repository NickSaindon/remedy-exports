import React, { useContext } from 'react';
import { Store } from '../utils/Store';
import Link from 'next/link'

const SideNav = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;

  return (
    <div className="card side-nav">
      <div className="card-body">
      {userInfo && userInfo.isAdmin === true &&
        <nav className="nav flex-column">
          <Link href="/admin/dashboard" className="nav-link active" aria-current="page">
            Dashboard
          </Link>
          <Link href="/admin/orders" className="nav-link">
            Orders
          </Link>
          <Link href="/admin/products" className="nav-link">
            Products
          </Link>
          <Link href="/admin/users" className="nav-link">
            Users
          </Link>
          <Link href="/admin/blogs" className="nav-link">
            Blogs
          </Link>
        </nav>
      }
      {userInfo && userInfo.isVendor === true &&
        <nav className="nav flex-column">
          <Link href="/vendor/profile" className="nav-link active" aria-current="page">
              Profile
          </Link>
          <Link href="/vendor/order-history" className="nav-link">
              Order History
          </Link>
        </nav>
      }
      </div>
    </div>
  )
}

export default SideNav;