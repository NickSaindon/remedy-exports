import Image from 'next/image';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useEffect, useContext } from 'react';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import db from '../utils/db';
import Product from '../models/Product';

const Products = (props) => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { userInfo } = state;
  const { products } = props;

  useEffect(() => {
    if (!userInfo.isVendor) {
      router.push('/login');
    }
  }, []);

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const processType = 'nano';
    const tierPrice = quantity <= 10 ? (product.price
      ) : quantity >= 11 && quantity <= 15 ? (
        product.price - 1
      ) : quantity >= 16 && quantity <= 19 ? (
        product.price - 2
      ) : quantity >= 20 && quantity <= 29 ? (
        product.price - 3
      ) : (
        product.price - 5
      )

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity, tierPrice, processType } });
  };

  return (
    <Layout title="Products Page">
      <div className="products-container">
        <div className="product-list-header">
            <div className="product-list-header-text">
                <h1>Remedy Products</h1>
                <p>We have a wide varity of products so take a look.</p>
            </div>
            <ul className="slider">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        </div>
        <div className="product-list-container">
          <div className="product-list-wrapper">
            <div className="container-xl">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-3">
                {products.sort((a, b) => a.name.localeCompare(b.name)).map((product) => (
                  <div className="col" key={product._id}>
                    <div className="card shadow-sm">
                      <Link 
                        key={product.name}
                        href={`/product/${product.slug}`} 
                      >
                          <div className="product-card-img" style={{backgroundImage: `url(${product.imageOne})` }}></div>
                      </Link>
                      <div className="card-body">
                        <h4 className="card-text">{product.name} - {product.color}</h4>
                        <p>{product.benefits.substring(0, 70)}{ product.description.length >= 10 && `...` }</p>
                        <div className="row">
                          <div className="col-lg-6">
                          <Link 
                            key={product.name}
                            href={`/product/${product.slug}`} 
                          >
                            <button 
                              type="button" 
                              className="w-100 btn btn-lg btn-outline-primary light"
                            >
                              Read More
                            </button>
                          </Link>
                          </div>
                          <div className="col-lg-6">

                          <button 
                            type="button" 
                            className="w-100 btn btn-lg btn-outline-primary light"
                            onClick={() => addToCartHandler(product)}
                          >
                            Add To Cart
                          </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj)
    }
  }
}