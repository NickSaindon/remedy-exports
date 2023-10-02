import axios from 'axios';
import Layout from '../../components/Layout';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Link from 'next/link'
import React, { useEffect, useContext, useReducer } from 'react';
import { getError } from '../../utils/error';
import { Store } from '../../utils/Store';
import SideNav from '../../components/SideNav';
import moment from 'moment';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

const AdminOrders = () => {
  const { state } = useContext(Store);
  const router = useRouter();
  const { userInfo } = state;

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/orders`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  return (
    <Layout title="Orders">
      <div className="users-container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-2">
              <SideNav />
            </div>
            <div className="col-lg-10">
              <div className="card vendor-user-card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <h1 className="card-title text-center">All Orders</h1>
                    </div>
                  </div>
                  <div className="product-list-table">
                    {loading ? (
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : error ? (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    ) : (
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">USER</th>
                            <th scope="col">DATE</th>
                            <th scope="col">COMPANY</th>
                            <th scope="col">PAID</th>
                            <th scope="col">DELIVERED</th>
                            <th scope="col">ACTION</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order) => (
                            <tr key={order._id}>
                              <td>{order._id.substring(20, 24)}</td>
                              <td>{order.user ? order.user.name : 'DELETED USER'}</td>

                              <td>{moment(order.createdAt).format('MM/DD/YYYY')}</td>
                              <td>
                                {order.shippingAddress.companyName}
                                </td>
                              <td>
                                {order.isPaid
                                  ? `paid at ${moment(order.paidAt).format('MM/DD/YYYY')}`
                                  : 'not paid'}
                              </td>
                              <td>
                                {order.isDelivered
                                  ? `delivered at ${moment(order.deliveredAt).format('MM/DD/YYYY')}`
                                  : 'not delivered'}
                              </td>
                              <td className="table-actions">
                                <Link href={`/order/${order._id}`}>
                                  <button 
                                    type="button" 
                                    className="btn btn-primary"
                                  >
                                    Details
                                  </button>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(AdminOrders), { ssr: false });
