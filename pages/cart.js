import Image from "next/image";
import Layout from '../components/Layout';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useContext } from 'react';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';

const Cart = () => {
  const { state, dispatch } = useContext(Store);
    const router = useRouter();
    const { userInfo, cart: { cartItems }} = state;
    const process = [
      {value: 'fine', text: 'Fine'},
      {value: 'nano', text: 'Nano'},
    ];

    useEffect(() => {
        if (!userInfo.isVendor && !userInfo.isAdmin) {
            router.push('/login');
        }
    }, []);

    const updateProcessHandler = async (item, processType) => {
      dispatch({ 
        type: 'CART_ADD_ITEM', 
        payload: { 
          ...item, 
          processType,
        } 
      });
    };

    const updateCartHandler = async (item, quantity) => {
      dispatch({ 
        type: 'CART_ADD_ITEM', 
        payload: { 
          ...item, 
          quantity,
          tierPrice: quantity <= 10 ? (item.price
            ) : quantity >= 11 && quantity <= 15 ? (
              item.price - 1
            ) : quantity >= 16 && quantity <= 19 ? (
              item.price - 2
            ) : quantity >= 20 && quantity <= 29 ? (
              item.price - 3
            ) : (
              item.price - 5
            ),
        } 
      });
    };

    const removeItemHandler = (item) => {
      dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    };

  return (
    <Layout>
        <div className="cart-container">
          <div className="container-fluid">
            <div className="row text-center">
              <h1>Shopping Cart</h1>
            </div>
            {cartItems.length === 0 ? (
              <div className="empty-cart text-center">
                <h2>Cart is empty.</h2>
                <Link href="/products" passHref>
                  <button type="button" className="btn btn-link">Go make an order <i className="bi bi-arrow-right"></i></button>
                </Link>
              </div>
            ) : (
              <div className="row">

              <div className="col-lg-9 cart">

                {cartItems.map((item) => (
                  <div className="card" key={item._id}>
                    <div className="card-body">
                    <div className="cart-row d-flex justify-content-between align-items-center">
                  <div className="product-img">
                    <Image src={item.imageOne} className="d-block w-100" width={50} height={50} alt="..." />
                  </div>
                  <div className="product-name d-flex align-items-center">
                    <p className="text-center">
                      {item.name}<br />
                      {item.color}
                    </p>
                  </div>
                  <div className="quantity-select">
                    <span>In Tons</span>
                    <select 
                      className="form-select" 
                      value={item.quantity}
                      onChange={(e) =>
                        updateCartHandler(item, e.target.value)
                      }
                    >
                      {[...Array(item.countInTons).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="price d-flex align-items-center">
                    <p onChange={(e) =>
                        updateCartHandler(item, e.target.value)
                      }>${item.tierPrice}</p>
                  </div>
                  <div className="grind-select">
                    <span>Process Type</span>
                    <select 
                      className="form-select" 
                      value={item.processType}
                      onChange={(e) =>
                        updateProcessHandler(item, e.target.value)
                      }
                    >
                      {process.map((state) => (
                        <option key={state.value} value={state.value}>{state.text}</option>
                      ))}
                    </select>
                  </div>
                  <div className="">
                    <button 
                      type="button" 
                      className="btn btn-outline-primary"
                      onClick={() => removeItemHandler(item)}
                    >
                      X
                    </button>
                  </div>
                </div>
                    </div>
                  </div>
                ))}

              </div>
              <div className="col-lg-3">
                <div className="card checkout-card">
                  <div className="card-body">
                    <div className="d-grid gap-2">
                        <button 
                          className="w-100 btn btn-lg btn-outline-primary light"  
                          type="button"
                          onClick={() => router.push('/shipping')}
                        >
                          Check Out
                        </button>
                    </div>                  
                  </div>
                </div>
              </div>
            </div>
            )}

          </div>
        </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Cart), { ssr: false });