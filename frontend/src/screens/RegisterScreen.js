import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  // const redirect = props.location.search
  //   ? props.location.search.split('=')[1]
  //   : '/';
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password and confirm password are not match');
    } else {
      dispatch(register(name, email, password));
    }
  };
  useEffect(
    () => {
      if (userInfo) {
        // props.history.push(redirect);
        navigate(redirect);
      }
    },
    // [props.history, redirect, userInfo]);
    [navigate, redirect, userInfo]
  );
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div className="register-heading">
          <h1>Create Account</h1>
        </div>
        {loading && (
          <div>
            <LoadingBox />
          </div>
        )}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type={passwordShown ? 'text' : 'password'}
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <i
            className={passwordShown ? 'fa fa-eye-slash' : 'fa fa-eye'}
            onClick={() => setPasswordShown((prevState) => !prevState)}
            title={passwordShown ? 'Hide password' : 'Show password'}
          ></i>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type={passwordShown ? 'text' : 'password'}
            id="confirmPassword"
            placeholder="Enter confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <i
            className={passwordShown ? 'fa fa-eye-slash' : 'fa fa-eye'}
            onClick={() => setPasswordShown((prevState) => !prevState)}
            title={passwordShown ? 'Hide password' : 'Show password'}
          ></i>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            Already have an account?{' '}
            <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
