import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useParams, Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import { useNavigate, useLocation } from 'react-router';

export default function CartScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { id: productId } = params;
  // const qty = props.location.search
  //   ? Number(props.location.search.split('=')[1])
  //   : 1;
  const { search } = useLocation();
  // console.log(search);
  const qtyInUrl = new URLSearchParams(search).get('qty');
  // console.log(qtyInUrl);
  const qty = qtyInUrl ? Number(qtyInUrl) : 1;
  // console.log(qty);
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
    // props.history.push('/signin?redirect=shipping');
  };
  return (
    <div className="row top">
      <div className="col-2">
        <h1 className="h1white">Shopping Cart</h1>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div> {item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                {/* Subtotal (
                {cartItems.reduce((a, c) => Number(a) + Number(c.qty), 0)}
                items) : $
                {cartItems.reduce(
                  (a, c) => a + Number(c.price) * Number(c.qty),
                  0
                )} */}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
