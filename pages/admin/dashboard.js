import axios from 'axios';
import Layout from '../../components/Layout';
import dynamic from 'next/dynamic';
import { useEffect, useContext, useReducer } from 'react';
import { Store } from '../../utils/Store';
import { getError } from '../../utils/error';
import { useRouter } from 'next/router';
import SideNav from '../../components/SideNav';
import Link from 'next/link';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, summary: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

const AdminDashboard = () => {
  const { state } = useContext(Store);
  const router = useRouter();
  const { userInfo } = state;

  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: '',
  });

  useEffect(() => {
      if (!userInfo.isAdmin) {
          router.push('/login');
        }
  }, []);

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/summary`, {
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
    <Layout>
      <div className="dashboard-container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-2">
              <SideNav />
            </div>
            <div className="col-lg-10">
              <div className="card">
                {loading ? (
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : error ? (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                ) : (
                  <div className="card-body">
                  <h1 className="card-title text-center">Dashboard</h1>
                  <div className="row gx-5 dashboard-cards">
                    <div className="col-xxl-3 col-md-6 mb-5">
                      <div className="card card-raised">
                        <div className="card-body px-4">
                          <h2 className="text-center text-muted">${summary.ordersPrice}</h2>
                          <h3 className="text-center">Sales</h3>
                          <div className="card-text">
                            <div className="text-center">
                              <Link href="/admin/orders">
                                <button type="button" className="btn btn-link">
                                  View Sales
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-md-6 mb-5">
                      <div className="card card-raised">
                        <div className="card-body px-4">
                          <h2 className="text-center text-muted">{summary.ordersCount}</h2>
                          <h3 className="text-center">Orders</h3>
                          <div className="card-text">
                            <div className="text-center">
                              <Link href="/admin/orders">
                                <button type="button" className="btn btn-link">
                                  View Orders
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-md-6 mb-5">
                      <div className="card card-raised">
                        <div className="card-body px-4">
                          <h2 className="text-center text-muted">{summary.productsCount}</h2>
                          <h3 className="text-center">Products</h3>
                          <div className="card-text">
                            <div className="text-center">
                              <Link href="/admin/products">
                                <button type="button" className="btn btn-link">
                                  View Products
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-md-6 mb-5">
                      <div className="card card-raised">
                        <div className="card-body px-4">
                          <h2 className="text-center text-muted">{summary.usersCount}</h2>
                          <h3 className="text-center">Vendors</h3>
                          <div className="card-text">
                            <div className="text-center">
                              <Link href="/admin/users">
                                <button type="button" className="btn btn-link">
                                  View Vendors
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
  
export default dynamic(() => Promise.resolve(AdminDashboard), { ssr: false });
