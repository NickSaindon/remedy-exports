import axios from 'axios';
import Layout from '../../../components/Layout'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useContext, useReducer, useState } from 'react';
import { getError } from '../../../utils/error';
import { Store } from '../../../utils/Store';
import { Controller, useForm } from 'react-hook-form';
import SideNav from '../../../components/SideNav';
import StateOptions from '../../../utils/stateOptions';
import NumberFormat from 'react-number-format';
import { ToastContainer, toast, Slide } from "react-toastify";

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true, errorUpdate: '' };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, errorUpdate: '' };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
}

const UserEdit = ({ params }) => {
  const userId = params.id;
  const { state } = useContext(Store);
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVendor, setIsVendor] = useState(false);
  const router = useRouter();
  const { userInfo } = state;
  const [states, setStates] = useState("");
  const stateOption = StateOptions.states;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      return router.push('/login');
    } else {
      const fetchData = async () => {
        try {
          dispatch({ type: 'FETCH_REQUEST' });
          const { data } = await axios.get(`/api/admin/users/${userId}`, {
            headers: { authorization: `Bearer ${userInfo.token}` },
          });
          setIsAdmin(data.isAdmin);
          setIsVendor(data.isVendor);
          dispatch({ type: 'FETCH_SUCCESS' });
          setValue('name', data.name);
          setValue('email', data.email);
          setValue('phone', data.phone);
          setValue('companyName', data.companyName);
          setValue('address', data.address);
          setValue('city', data.city);
          setValue('state', data.state);
          setValue('zipCode', data.zipCode);
        } catch (err) {
          dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
        }
      };
      fetchData();
    }
  }, []);
  
  const submitHandler = async ({ name, email, phone, companyName, address, city, state, zipCode }) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/admin/users/${userId}`,
        {
          name,
          email,
          phone,
          companyName,
          address,
          city,
          state,
          zipCode,
          isAdmin,
          isVendor
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success("User updated successfully", {
        theme: "colored"
      });
      router.push('/admin/users');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err), {
        theme: "colored"
      });
    }
  };

  return (
    <Layout title={`Edit User ${userId}`}>
      <div className="user-edit-container">
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
            <div className="col-lg-10">
              <div className="card user-edit-card">
                <div className="card-body">
                  <h1 className="card-title text-center">Edit User {userId}</h1>
                  <div>
                    {
                      loading && 
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                    }
                    {
                      error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                    )}
                  </div>
                  <form 
                    onSubmit={handleSubmit(submitHandler)} 
                    className="col-lg-6 col-md-12 col-sm-12 form-user-edit justify-content-center" 
                    noValidate
                  >
                    <div className="form-floating">
                      <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <input 
                            type="text" 
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            id="name" 
                            placeholder="Full Name" 
                            {...field}
                          />
                        )}
                      />
                      <div className="invalid-feedback">
                        { errors.name ? 'Name is required' : '' }
                      </div>
                      <label htmlFor="name">Full Name</label>
                    </div>
                    <div className="form-floating">
                      <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                          pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        }}
                        render={({ field }) => (
                          <input 
                              type="email" 
                              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                              id="email" 
                              placeholder="name@example.com" 
                              {...field}
                          />
                        )}
                      />
                      <div className="invalid-feedback">
                        {errors.email
                          ? errors.email.type === 'pattern'
                          ? 'Email is not valid'
                          : 'Email is required'
                          : ''
                        }
                      </div>
                      <label htmlFor="email">Email</label>
                    </div>
                    <div className="form-floating">
                      <Controller 
                        name="phone"
                        control={control}
                        rules={{
                          required: true,
                          pattern: /^\(?\b[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}\b$/,
                        }}
                        render={({ field: {onChange, name, value} }) => (
                          <NumberFormat
                            format="(###) ###-####"
                            name={name}
                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                            value={value}
                            id="phone" 
                            placeholder="Phone Number" 
                            onChange={onChange}
                          />
                        )}
                      />
                      <div className="invalid-feedback">
                        {errors.phone
                          ? errors.phone.type === 'pattern'
                            ? 'Phone number is not completed'
                            : 'Phone number is required'
                          : ''
                        }
                      </div>
                      <label htmlFor="floatingInput">Phone Number</label>
                    </div>
                    <div className="form-floating">
                      <Controller
                        name="companyName"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                          minLength: 2,
                        }}
                        render={({ field }) => (
                          <input 
                            type="text" 
                            className={`form-control ${errors.companyName ? 'is-invalid' : ''}`}
                            id="companyName" 
                            placeholder="Company Name" 
                            {...field}
                          />
                        )}
                      />
                      <div className="invalid-feedback">
                        {errors.companyName
                          ? errors.companyName.type === 'minLength'
                            ? 'Company Name length is more than 1'
                            : 'Company Name is required'
                          : ''
                        }
                      </div>
                      <label htmlFor="companyName">Company Name</label>
                    </div>
                    <div className="form-floating">
                      <Controller
                        name="address"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                          minLength: 2,
                        }}
                        render={({ field }) => (
                        <input 
                          type="text" 
                          className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                          id="address" 
                          placeholder="Address" 
                          {...field}
                        />
                      )}
                      />
                      <div className="invalid-feedback">
                        {errors.address
                          ? errors.address.type === 'minLength'
                            ? 'Address length is more than 1'
                            : 'Address is required'
                          : ''
                        }
                      </div>
                      <label htmlFor="address">Address</label>
                    </div>
                    <div className="form-floating">
                      <Controller
                        name="city"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                          minLength: 2,
                        }}
                        render={({ field }) => (
                          <input 
                            type="text" 
                            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                            id="city" 
                            placeholder="City" 
                            {...field}
                          />
                        )}
                      />
                      <div className="invalid-feedback">
                        {errors.city
                          ? errors.city.type === 'minLength'
                            ? 'City length is more than 1'
                            : 'City is required'
                          : ''
                        }
                      </div>
                      <label htmlFor="city">City</label>
                    </div>
                    <div className="form-floating">
                      <Controller
                        name="state"
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <select 
                            defaultValue='DEFAULT'
                            className={`form-select ${errors.state ? 'is-invalid' : ''}`} 
                            onChange={(e) => setStates(e.target.value)}
                            value={states}
                            {...field}
                          >
                            <option disabled value="DEFAULT">Select a State</option>
                            {stateOption.map((state) => (
                              <option key={state.value} value={state.value}>{state.label}</option>
                            ))}
                          </select>
                        )}
                      />
                      <div className="invalid-feedback">
                        { errors.state ? 'State is required' : '' }
                      </div>
                    </div>
                    <div className="form-floating">
                      <Controller
                        name="zipCode"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                          minLength: 2,
                        }}
                        render={({ field }) => (
                        <input 
                          type="text" 
                          className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
                          id="zipCode" 
                          placeholder="Zip Code" 
                          {...field}
                        />
                      )}
                      />
                      <div className="invalid-feedback">
                          {errors.zipCode
                            ? errors.zipCode.type === 'minLength'
                              ? 'Zip Code length is more than 1'
                              : 'Zip Code is required'
                            : ''
                          }
                      </div>
                      <label htmlFor="address">Zip Code</label>
                    </div>



                    <div className="form-floating">
                      <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                          minLength: 6
                        }}
                        render={({ field }) => (
                          <input 
                            type="password" 
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            id="password" 
                            placeholder="Password" 
                            {...field}
                          />
                        )}
                      />
                      <div className="invalid-feedback">
                        {errors.password
                              ? errors.password.type === 'minLength'
                              ? 'Password is more than 5'
                              : 'Password is required'
                              : ''
                        }
                      </div>
                      <label htmlFor="password">Password</label>
                    </div>
                    <div className="row py-3 justify-content-between">
                    <div className="col-4">
                    <div className="form-check">
                    <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="gridCheck" 
                        onClick={(e) => setIsVendor(e.target.checked)}
                        checked={isVendor}
                        name="isVendor"
                      />
                      <label className="form-check-label" htmlFor="gridCheck">
                        Vendor
                      </label>
                    </div>
                    </div>
                    <div className="col-4">

                    <div className="form-check float-end">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="gridCheck" 
                        onClick={(e) => setIsAdmin(e.target.checked)}
                        checked={isAdmin}
                        name="isAdmin"
                      />
                      <label className="form-check-label" htmlFor="gridCheck">
                        Admin
                      </label>
                    </div> 
                    </div>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="submit">Edit</button>
                    {
                      loadingUpdate && 
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                    }
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
};

export async function getServerSideProps({ params }) {
  return {
    props: { params },
  };
}
  
export default dynamic(() => Promise.resolve(UserEdit), { ssr: false });