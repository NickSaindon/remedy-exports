import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useState, useContext, useEffect } from 'react';
import StateOptions from "../utils/stateOptions";
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';

const Shipping = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [states, setStates] = useState("");
  const stateOption = StateOptions.states;
  const [shipments, setShipments] = useState("");


  useEffect(() => {
    if (!userInfo.isVendor && !userInfo.isAdmin) {
      router.push('/login');
    }
  }, []);

  const submitHandler = ({ fullName, email, shipmentType, companyName, address, city, state, zipCode }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, email, shipmentType, companyName, address, city, state, zipCode },
    });
    Cookies.set('shippingAddress', {
      fullName,
      email,
      shipmentType,
      companyName,
      address,
      city,
      state,
      zipCode,
      location,
    });
    if (userInfo.isVendor) {
      router.push('/placeorder');
    } else {
      router.push('/');
    }
  };


  const shipmentOption = [
    {
      label: "Ocean Freight",
      value: "Ocean Freight",
    },
    {
      label: "Air Freight",
      value: "Air Freight",
    }
  ];

  return (
    <Layout>
      <div className="shipping-container text-center">
        <div className="container">
          <div classNaame="row">
            <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1">
              <h1> Shipping Information</h1>
              <p>* Fill out the shipping where you want your shippment to be made 
                and fill in the <b>email where you want the payment request</b> to be sent.
                Any Air Shipments will include shipping charges.  Also Ocean Freight under 10 tons
                will also include shipping charges.
              </p>
            </div>
          </div>
        </div>

        <main className="form-shipping">
          <div className="container">
            <div className="row justify-content-md-center">
              <form onSubmit={handleSubmit(submitHandler)} className="col-lg-6 col-md-12 col-sm-12">
                <div className="form-floating">
                  <Controller
                    name="fullName"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 2,
                    }}
                    render={({ field }) => (
                      <input 
                        type="text" 
                        className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                        id="fullName" 
                        placeholder="Full Name" 
                        {...field}
                      />
                    )}
                  />
                  <div className="invalid-feedback">
                    {
                      errors.fullName
                      ? errors.fullName.type === 'minLength'
                      ? 'Full Name length is more than 1'
                      : 'Full Name is required'
                      : ''
                    }
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
                        placeholder="Email" 
                        {...field}
                      />
                    )}
                  />
                  <div className="invalid-feedback">
                    {
                      errors.email
                        ? errors.email.type === 'pattern'
                          ? 'Email is not valid'
                          : 'Email is required'
                        : ''
                    }
                  </div>
                  <label htmlFor="name">Email</label>
                </div>
                <div className="form-floating">
                  <Controller
                    name="shipmentType"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <select 
                        defaultValue='DEFAULT'
                        className={`form-select ${errors.shipmentType ? 'is-invalid' : ''}`} 
                        onChange={(e) => setShipments(e.target.value)}
                        value={shipments}
                        {...field}
                      >
                        <option disabled value="DEFAULT">Shipment Options</option>
                        {shipmentOption.map((state) => (
                          <option key={state.value} value={state.value}>{state.label}</option>
                        ))}
                      </select>
                    )}
                  />
                  <div className="invalid-feedback">
                    {
                      errors.shipmentType
                      ? 'Shipping Type is required'
                      : ''
                    }
                  </div>
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
                    {
                      errors.companyName
                      ? errors.companyName.type === 'minLength'
                      ? 'Company Name length is more than 1'
                      : 'Company Name is required'
                      : ''
                    }
                  </div>
                  <label htmlFor="name">Company Name</label>
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
                    {
                      errors.address
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
                    {
                      errors.city
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
                    {
                      errors.state
                      ? 'State is required'
                      : ''
                    }
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
                    {
                      errors.zipCode
                        ? errors.zipCode.type === 'minLength'
                          ? 'Zip Code length is more than 1'
                          : 'Zip Code is required'
                        : ''
                    }
                  </div>
                  <label htmlFor="address">Zip Code</label>
                </div>
                <button className="w-100 btn btn-3 btn-outline-primary btn-lg px-4 me-sm-3" type="submit">
                  Continue
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default Shipping;