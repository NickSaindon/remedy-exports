import axios from 'axios';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import React, { useEffect, useContext, useReducer } from 'react';
import { Store } from '../../utils/Store';
import Link from 'next/link'
import { getError } from '../../utils/error';
import SideNav from '../../components/SideNav';
import { ToastContainer, toast, Slide } from "react-toastify";

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, users: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      state;
  }
}

const AdminUsers = () => {
  const { state } = useContext(Store);
  const router = useRouter();
  const { userInfo } = state;

  const [{ loading, error, users, successDelete, loadingDelete }, dispatch] = 
  useReducer(reducer, { 
      loading: true, 
      users: [], 
      error: '',
  });

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }

    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/users`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }

  }, [successDelete]);

  const deleteHandler = async (userId) => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      await axios.delete(`/api/admin/users/${userId}`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: 'DELETE_SUCCESS' });
      toast.success("User deleted successfully", {
        theme: "colored"
      });
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' });
      toast.error(getError(err), {
        theme: "colored"
      });
    }
  };

  return (
    <Layout title="Users">
      <div className="users-container">
        <ToastContainer 
          position="top-center" 
          draggable={false} 
          transition={Slide} 
          autoClose={3000}
          hideProgressBar={true}
          className="toast-alert"
        />
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-2 col-md-12">
              <SideNav />
            </div>
            <div className="col-lg-10 col-md-12">
              <div className="card vendor-user-card">
                <div className="card-body">
                  <h1 className="card-title text-center">Vendor Users</h1>
                  {loadingDelete && 
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  }
                  <div className="users-table">
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
                            <th scope="col">NAME</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col">PHONE</th>
                            <th scope="col">COMPANY</th>
                            <th scope="col">ADDRESS</th>
                            <th scope="col">ISVENDOR</th>
                            <th scope="col">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.filter(user => user.isAdmin === false).map((user) => (
                            <tr key={user._id}>
                              <td>{user._id.substring(20, 24)}</td>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.phone}</td>
                              <td>{user.companyName}</td>
                              <td>{user.address} {user.city} {user.state} {user.zipCode}</td>
                              <td>{user.isVendor ? 'Yes' : 'No'}</td>
                              <td className="table-actions">
                                <Link 
                                  href={`/admin/user/${user._id}`}
                                >
                                  <button type="button" className="btn btn-primary">Edit</button>
                                </Link>
                                <button 
                                  type="button" 
                                  className="btn btn-danger"
                                  onClick={() => deleteHandler(user._id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
              <div className="card admin-user-card">
                <div className="card-body">
                  <h1 className="card-title text-center">Admin Users</h1>
                  {loadingDelete && 
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  }
                  <div className="users-table">
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
                            <th scope="col">NAME</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col">ISADMIN</th>
                            <th scope="col">ACTIONS</th>
                          </tr>
                        </thead>
                      <tbody>
                        {users.filter(user => user.isAdmin === true).map((user) => (
                          <tr key={user._id}>
                            <td>{user._id.substring(20, 24)}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                              <td className="table-actions">
                                <Link 
                                  href={`/admin/user/${user._id}`}
                                >
                                  <button type="button" className="btn btn-primary">Edit</button>
                                </Link>
                                <button 
                                  type="button" 
                                  className="btn btn-danger"
                                  onClick={() => deleteHandler(user._id)}
                                >
                                  Delete
                                </button>
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
};

export default AdminUsers;
