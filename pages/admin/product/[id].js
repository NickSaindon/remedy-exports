import axios from 'axios';
import Layout from '../../../components/Layout'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useContext, useReducer } from 'react';
import { getError } from '../../../utils/error';
import { Store } from '../../../utils/Store';
import { Controller, useForm } from 'react-hook-form';
import SideNav from '../../../components/SideNav';
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

const ProductEdit = ({ params }) => {
  const productId = params.id;
  const { state } = useContext(Store);
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const { userInfo } = state;

  useEffect(() => {
    if (!userInfo) {
      return router.push('/login');
    } else {
      const fetchData = async () => {
        try {
          dispatch({ type: 'FETCH_REQUEST' });
          const { data } = await axios.get(`/api/admin/products/${productId}`, {
            headers: { authorization: `Bearer ${userInfo.token}` },
          });
          dispatch({ type: 'FETCH_SUCCESS' });
          setValue('name', data.name);
          setValue('slug', data.slug);
          setValue('color', data.color);
          setValue('price', data.price);
          setValue('imageOne', data.imageOne);
          setValue('imageTwo', data.imageTwo);
          setValue('imageThree', data.imageThree);
          setValue('imageFour', data.imageFour);
          setValue('countInTons', data.countInTons);
          setValue('description', data.description);
          setValue('benefits', data.benefits);
        } catch (err) {
          dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
        }
      };
        fetchData();
    }
  }, []);

  const uploadHandler = async (e, imageField = 'imageOne') => {
      const file = e.target.files[0];
      const bodyFormData = new FormData();
      bodyFormData.append('file', file);
      try {
        dispatch({ type: 'UPLOAD_REQUEST' });
        const { data } = await axios.post('/api/admin/upload', bodyFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${userInfo.token}`,
          },
        });
        dispatch({ type: 'UPLOAD_SUCCESS' });
        setValue(imageField, data.secure_url);
        
        alert('File uploaded successfully');
        toast.success("File uploaded successfully", {
          theme: "colored"
        });
      } catch (err) {
        dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });

        alert('File uploaded Error');
        toast.error(getError(err), {
          theme: "colored"
        });
      }
    };
    
    const submitHandler = async ({
      name,
      slug,
      color,
      price,
      imageOne,
      imageTwo,
      imageThree,
      imageFour,
      countInTons,
      description,
      benefits
    }) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
      `/api/admin/products/${productId}`,
        {
          name,
          slug,
          color,
          price,
          imageOne,
          imageTwo,
          imageThree,
          imageFour,              
          countInTons,
          description,
          benefits
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success("Product updated successfully", {
        theme: "colored"
      });
      router.push('/admin/products');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err), {
        theme: "colored"
      });
    }
  };

  return (
    <Layout title={`Edit Product ${productId}`}>
      <div className="product-edit-container">
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
            <div className="col-lg-3">
                <SideNav />
            </div>
            <div className="col-lg-9">
              <div className="card product-edit-card">
                <div className="card-body">
                  <h2 className="card-title text-center">Product Edit {productId}</h2>
                  {loading && 
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  }
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>                    
                  )}
                  <form 
                    onSubmit={handleSubmit(submitHandler)}
                    className="col-lg-6 col-md-12 col-sm-12 form-product-edit justify-content-center" 
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
                      <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating">
                      <Controller
                        name="slug"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <input 
                            type="text" 
                            className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
                            id="slug" 
                            placeholder="Slug" 
                            {...field}
                          />
                        )}
                      />
                      <div className="invalid-feedback">
                        { errors.slug ? 'Slug is required' : '' }
                      </div>
                      <label htmlFor="slug">Slug</label>
                    </div>
                    <div className="form-floating">
                      <Controller
                        name="color"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <input 
                            type="text" 
                            className={`form-control ${errors.color ? 'is-invalid' : ''}`}
                            id="color" 
                            placeholder="Color" 
                            {...field}
                          />
                        )}
                      />
                      <div className="invalid-feedback">
                        { errors.color ? 'Color is required' : '' }
                      </div>
                      <label htmlFor="color">Color</label>
                    </div>
                    <div className="form-floating">
                      <Controller
                        name="price"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <input 
                            type="text" 
                            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                            id="price" 
                            placeholder="price" 
                            {...field}
                          />
                        )}
                      />
                      <div className="invalid-feedback">
                        { errors.price ? 'Price is required' : '' }
                      </div>
                      <label htmlFor="price">Price</label>
                    </div>
                    <div className="form-floating">
                      <Controller
                        name="imageOne"
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <input 
                            className={`form-control ${errors.imageOne ? 'is-invalid' : ''}`}
                            id="imageOne" 
                            placeholder="Image One" 
                            {...field}
                          />
                        )}
                      />
                      <div className="invalid-feedback">
                        { errors.imageOne ? 'Image One is required' : '' }
                      </div>
                      <label htmlFor="imageOne">Image One</label>
                      <div className="file btn btn-lg btn-primary">
                        Upload
                        <input onChange={uploadHandler} type="file" name="file" />
                      </div>
                    </div>
                    <div className="form-floating">
                      <Controller
                        name="imageTwo"
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <input 
                            className={`form-control ${errors.imageTwo ? 'is-invalid' : ''}`}
                            id="imageTwo" 
                            placeholder="Image Two" 
                            {...field}
                          />
                        )}
                      />
                      <div className="invalid-feedback">
                        { errors.imageTwo ? 'Image Two is required' : '' }
                      </div>
                      <label htmlFor="imageTwo">Image Two</label>
                      <div className="file btn btn-lg btn-primary">
                        Upload
                        <input onChange={(e) => console.log(uploadHandler(e, 'imageTwo'))} type="file" name="file" />
                      </div>
                    </div>
                    <div className="form-floating">
                      <Controller
                        name="imageThree"
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <input 
                            className={`form-control ${errors.imageThree ? 'is-invalid' : ''}`}
                            id="imageThree" 
                            placeholder="Image Three" 
                            {...field}
                          />
                        )}
                      />
                      <div className="invalid-feedback">
                        { errors.imageThree ? 'Image Three is required' : '' }
                      </div>
                      <label htmlFor="imageThree">Image Three</label>
                      <div className="file btn btn-lg btn-primary">
                        Upload
                        <input onChange={(e) => uploadHandler(e, 'imageThree')} type="file" name="file" />
                      </div>
                    </div>
                    <div className="form-floating">
                      <Controller
                        name="imageFour"
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <input 
                            className={`form-control ${errors.imageFour ? 'is-invalid' : ''}`}
                            id="imageFour" 
                            placeholder="Image Four" 
                            {...field}
                          />
                        )}
                      />
                      <div className="invalid-feedback">
                        { errors.imageFour ? 'Image Four is required' : '' }
                      </div>
                      <label htmlFor="imageFour">Image Four</label>
                      <div className="file btn btn-lg btn-primary">
                        Upload
                        <input onChange={(e) => uploadHandler(e, 'imageFour')} type="file" name="file" />
                      </div>
                    </div>
                    <div className="form-floating">
                      <Controller
                        name="countInTons"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <input 
                            type="text" 
                            className={`form-control ${errors.countInTons ? 'is-invalid' : ''}`}
                            id="countInTons" 
                            placeholder="countInTons" 
                            {...field}
                          />
                        )}
                      />
                      {loadingUpload && 
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      }
                      <div className="invalid-feedback">
                        { errors.countInTons ? 'Count in tons is required' : '' }
                      </div>
                      <label htmlFor="countInTons">Count in Tons</label>
                    </div>
                    <div className="form-floating">
                      <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <input 
                            type="text" 
                            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                            id="description" 
                            placeholder="Description" 
                            {...field}
                          />
                        )}
                      />
                      <div className="invalid-feedback">
                        { errors.description ? 'Price is required' : '' }
                      </div>
                      <label htmlFor="description">Description</label>
                    </div>
                    <div className="form-floating">
                      <Controller
                        name="benefits"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <input 
                            type="text" 
                            className={`form-control ${errors.benefits ? 'is-invalid' : ''}`}
                            id="benefits" 
                            placeholder="Benefits" 
                            {...field}
                          />
                        )}
                      />
                      <div className="invalid-feedback">
                        { errors.benefits ? 'Price is required' : '' }
                      </div>
                      <label htmlFor="benefits">Benefits</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Edit</button>
                    {loadingUpdate && 
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
  );
};

export async function getServerSideProps({ params }) {
    return {
      props: { params },
    };
  }
  
export default dynamic(() => Promise.resolve(ProductEdit), { ssr: false });