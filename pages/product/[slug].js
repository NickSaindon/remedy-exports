import Image from "next/image";
import Layout from '../../components/Layout';
import { useState, useContext, useEffect } from 'react';
import { Store } from '../../utils/Store';
import Link from 'next/link'
import db from '../../utils/db';
import { useRouter } from 'next/router';
import Product from '../../models/Product';

const ProductDetails = (props) => {
  const { state, dispatch } = useContext(Store);
  const { product } = props;
  const router = useRouter();
  const { userInfo } = state;
  const [selectedImg, setSelectedImg] = useState("");

  useEffect(() => {
    if (!userInfo.isVendor) {
      router.push('/login');
    }
  }, []);

  if (!product) {
    return <div>Product Not Found</div>;
  }

  const addToCartHandler = async () => {
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

    dispatch({  type: 'CART_ADD_ITEM', payload: {...product, quantity, tierPrice, processType}})
  }

  return (
    <Layout title="Product Details Page">
      <div className="details-container">
        <section>
          <div className="container-xxl">
            <div className="row gy-5">
              <div className="col p-3">
                <Link href="/products">
                  <button type="button" className="btn btn-link"><i className="bi bi-arrow-left"></i> back to products</button>
                </Link>
              </div>
            </div>
            <div className="row img-row">
              <div className="col-lg-1 col-md-9 col-sm-12 thumbnail-images">
                <div className="thumbnails">
                  <Image 
                    className="small" 
                    src={product.imageOne} 
                    alt="thumbnail"
                    onClick={() => setSelectedImg(product.imageOne)}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="thumbnails">
                  <Image 
                    className="small" 
                    src={product.imageTwo} 
                    alt="thumbnail"
                    onClick={() => setSelectedImg(product.imageTwo)}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="thumbnails">
                  <Image 
                    className="small" 
                    src={product.imageThree} 
                    alt="thumbnail"
                    onClick={() => setSelectedImg(product.imageThree)}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="thumbnails">
                  <Image 
                    className="small" 
                    src={product.imageFour} 
                    alt="thumbnail"
                    onClick={() => setSelectedImg(product.imageFour)}
                    width={200}
                    height={200}
                  />
                </div>
              </div>
              <div className="col-lg-5 col-md-12 main-img">
                <Image 
                  src={ selectedImg === "" ? product.imageOne : selectedImg } 
                  className="d-block w-100" 
                  width={640} 
                  height={640} 
                  alt={product.name} 
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="row">
                  <div className="col-lg-7 col-md-6 col-sm-12">
                    <h2 >{product.name} - {product.color}</h2>
                    <h5>Description</h5>
                    <p>{product.description}</p>
                    <h5>Benefits</h5>
                    <p>{product.benefits}</p>
                   </div>
                  <div className="col-lg-5 col-md-6 col-sm-12">
                  <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-12">
                            <ul className="text-muted">
                              <li>Add the product to cart and select your quantity in the cart.</li>
                              <li>Prices will change in accordance to the price list.</li>
                            </ul>
                          </div>
                        </div>
                        <div className="d-grid gap-2">
                          <button 
                            className="w-100 btn btn-lg btn-outline-primary light" 
                            type="button"
                            onClick={addToCartHandler}
                          >
                            Add To Cart
                          </button>
                        </div>                  
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ProductDetails;

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({slug}).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product)
    }
  };
}