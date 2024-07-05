import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import MapScreen from './screens/MapScreen';
import DashboardScreen from './screens/DashboardScreen';
import SupportScreen from './screens/SupportScreen';
import ChatBox from './components/ChatBox';

function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  // useEffect(() => {
  //   dispatch(listProductCategories());
  // }, [dispatch]);
  useEffect(() => {
    let isMounted = true; // Mounted flag

    const fetchCategories = async () => {
      if (isMounted) {
        dispatch(listProductCategories());
      }
    };

    fetchCategories();

    // Cleanup function to set the flag to false on unmount
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-sliders"></i>
            </button>
            <Link className="brand" to="/">
              myzon
            </Link>
          </div>
          <div>
            <SearchBox />
          </div>
          <div>
            <Link to="/cart">
              <i className="fa fa-opencart"></i>
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#seller">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                  <li>
                    <Link to="/support">Support</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-sliders"></i>
              </button>
              <Link className="brand" to="/">
                myzon
              </Link>
            </li>

            <li>
              <strong className="li-sid">Categories</strong>
            </li>
            {loadingCategories ? (
              <li className="li-sid">
                <LoadingBox></LoadingBox>
              </li>
            ) : errorCategories ? (
              <li className="li-sid">
                <MessageBox variant="danger">{errorCategories}</MessageBox>
              </li>
            ) : (
              categories.map((c) => (
                <li className="li-sid" key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main>
          <Routes>
            <Route path="/seller/:id" element={<SellerScreen />}></Route>
            <Route path="/cart" element={<CartScreen />}></Route>
            <Route path="/cart/:id" element={<CartScreen />}></Route>
            <Route
              path="/product/:id"
              element={<ProductScreen />}
              exact
            ></Route>
            <Route
              path="/product/:id/edit"
              element={<ProductEditScreen />}
              exact
            ></Route>
            <Route path="/signin" element={<SigninScreen />}></Route>
            <Route path="/register" element={<RegisterScreen />}></Route>
            <Route path="/shipping" element={<ShippingAddressScreen />}></Route>
            <Route path="/payment" element={<PaymentMethodScreen />}></Route>
            <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
            <Route path="/order/:id" element={<OrderScreen />}></Route>
            <Route
              path="/orderhistory"
              element={<OrderHistoryScreen />}
            ></Route>
            <Route path="/search/name" element={<SearchScreen />} exact></Route>
            <Route
              path="/search/name/:name"
              element={<SearchScreen />}
              exact
            ></Route>
            <Route
              path="/search/category/:category"
              element={<SearchScreen />}
              exact
            ></Route>
            <Route
              path="/search/category/:category/name/:name"
              element={<SearchScreen />}
              exact
            ></Route>
            <Route
              path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
              element={<SearchScreen />}
              exact
            ></Route>

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfileScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/map"
              element={
                <PrivateRoute>
                  <MapScreen />
                </PrivateRoute>
              }
            />

            <Route
              path="/productlist"
              element={
                <AdminRoute>
                  <ProductListScreen />
                </AdminRoute>
              }
            />

            <Route
              path="/productlist/pageNumber/:pageNumber"
              element={
                <AdminRoute>
                  <ProductListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/orderlist"
              element={
                <AdminRoute>
                  <OrderListScreen />
                </AdminRoute>
              }
            />

            <Route
              path="/userlist"
              element={
                <AdminRoute>
                  <UserListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/userlist/pageNumber/:pageNumber"
              element={
                <AdminRoute>
                  <UserListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/user/:id/edit"
              element={
                <AdminRoute>
                  <UserEditScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <AdminRoute>
                  <DashboardScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/support"
              element={
                <AdminRoute>
                  <SupportScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/productlist/seller"
              element={
                <SellerRoute>
                  <ProductListScreen />
                </SellerRoute>
              }
            />
            <Route
              path="/orderlist/seller"
              element={
                <SellerRoute>
                  <OrderListScreen />
                </SellerRoute>
              }
            />

            <Route path="/" element={<HomeScreen />} exact></Route>
          </Routes>
        </main>
        <footer className="row center">
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
          <div>All right reserved</div>{' '}
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

// import React from 'react';
// import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
// import { signout } from './actions/userActions';
// import { useDispatch, useSelector } from 'react-redux';
// import HomeScreen from './screens/HomeScreen';
// import ProductScreen from './screens/ProductScreen';
// import CartScreen from './screens/CartScreen';
// import SigninScreen from './screens/SigninScreen';
// import RegisterScreen from './screens/RegisterScreen';
// import ShippingAddressScreen from './screens/ShippingAddressScreen';
// import PaymentMethodScreen from './screens/PaymentMethodScreen';
// import PlaceOrderScreen from './screens/PlaceOrderScreen';
// import ProfileScreen from './screens/ProfileScreen';
// import ProductListScreen from './screens/ProductListScreen';
// import ProductEditScreen from './screens/ProductEditScreen';
// import OrderHistoryScreen from './screens/OrderHistoryScreen';
// import OrderScreen from './screens/OrderScreen';
// import OrderListScreen from './screens/OrderListScreen';
// import PrivateRoute from './components/PrivateRoute';
// import AdminRoute from './components/AdminRoute';
// // import ChatboxScreen from './screens/ChatboxScreen';

// function App() {
//   const cart = useSelector((state) => state.cart);
//   const { cartItems } = cart;
//   const userSignin = useSelector((state) => state.userSignin);
//   const { userInfo } = userSignin;
//   const dispatch = useDispatch();
//   const signoutHandler = () => {
//     dispatch(signout());
//   };
//   return (
//     <BrowserRouter>
//       <div className="grid-container">
//         <header className="row">
//           <div>
//             <Link className="brand" to="/">
//               myzone
//             </Link>
//           </div>
//           <div>
//             <Link to="/cart">
//               Cart
//               {cartItems.length > 0 && (
//                 <span className="badge">{cartItems.length}</span>
//               )}
//             </Link>
//             {userInfo ? (
//               <div className="sidenave">
//                 <div className="dropdown">
//                   <Link to="#">
//                     {userInfo.name} <i className="fa fa-caret-down"></i>
//                   </Link>
//                   <ul className="dropdown-content">
//                     <li>
//                       <Link to="/profile">User Profile</Link>
//                     </li>
//                     <li>
//                       <Link to="/orderhistory">Order History</Link>
//                     </li>
//                     <li>
//                       <Link to="#signout" onClick={signoutHandler}>
//                         Sign Out
//                       </Link>
//                     </li>
//                   </ul>
//                 </div>
//                 {/* <ChatboxScreen /> */}
//               </div>
//             ) : (
//               <Link to="/signin">Sign In</Link>
//             )}
//             {userInfo && userInfo.isAdmin && (
//               <div className="dropdown">
//                 <Link to="#admin">
//                   Admin <i className="fa fa-caret-down"></i>
//                 </Link>
//                 <ul className="dropdown-content">
//                   <li>
//                     <Link to="/dashboard">Dashboard</Link>
//                   </li>
//                   <li>
//                     <Link to="/productlist">Products</Link>
//                   </li>
//                   <li>
//                     <Link to="/orderlist">Orders</Link>
//                   </li>
//                   <li>
//                     <Link to="/userlist">Users</Link>
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </header>
//         <main>
//           <Routes>
//             <Route path="/cart/:id" element={<CartScreen />}></Route>
//             <Route path="/cart" element={<CartScreen />}></Route>
//             <Route
//               exact
//               path="/product/:id"
//               element={<ProductScreen />}
//             ></Route>
//             <Route path="/chatbox" element={<ChatboxScreen />} />
//             <Route path="/signin" element={<SigninScreen />}></Route>
//             <Route path="/register" element={<RegisterScreen />}></Route>
//             <Route path="/shipping" element={<ShippingAddressScreen />}></Route>
//             <Route path="/payment" element={<PaymentMethodScreen />}></Route>
//             <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
//             <Route path="/order/:id" element={<OrderScreen />}></Route>
//             <Route
//               exact
//               path="/product/:id/edit"
//               element={<ProductEditScreen />}
//             ></Route>

//             <Route
//               path="/orderhistory"
//               element={<OrderHistoryScreen />}
//             ></Route>
//             <Route
//               path="/profile"
//               element={
//                 <PrivateRoute>
//                   <ProfileScreen />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/productlist"
//               element={
//                 <AdminRoute>
//                   <ProductListScreen />
//                 </AdminRoute>
//               }
//             />
//             <Route
//               path="/orderlist"
//               element={
//                 <AdminRoute>
//                   <OrderListScreen />
//                 </AdminRoute>
//               }
//             />
//             <Route exact path="/" element={<HomeScreen />}></Route>
//           </Routes>
//         </main>
//         <footer className="row center">All right reserved</footer>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;
