import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import { Link } from 'react-router-dom';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div>
      <h1 className="h1white">Top Sellers</h1>
      {loadingSellers ? (
        <div>
          <LoadingBox />
        </div>
      ) : errorSellers ? (
        <MessageBox variant="danger">{errorSellers}</MessageBox>
      ) : (
        <>
          {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
          <Carousel showArrows autoPlay showThumbs={false}>
            {sellers.map((seller) => (
              <div key={seller._id}>
                <Link to={`/seller/${seller._id}`}>
                  <img src={seller.seller.logo} alt={seller.seller.name} />
                  <p className="legend">{seller.seller.name}</p>
                </Link>
              </div>
            ))}
          </Carousel>
        </>
      )}
      <h2>Featured Products</h2>
      {loading ? (
        <div>
          <LoadingBox />
        </div>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row center">
            {currentProducts.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            {[...Array(totalPages).keys()].map((x) => (
              <button
                key={x + 1}
                className={currentPage === x + 1 ? 'active' : ''}
                onClick={() => handlePageChange(x + 1)}
              >
                {x + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
