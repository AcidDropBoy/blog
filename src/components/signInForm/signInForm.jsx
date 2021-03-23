import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Api from '../../api/api';
import { getUser, Login } from '../../action/action';
import './signInForm.scss';

const SignInForm = ({ history }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const loginUser = useSelector((state) => state.loginUser);

  const onSubmit = (user) => {
    const userData = {
      user: {
        email: user.emailAddress,
        password: user.password,
      },
    };

    Api.userAuthentication('/users/login', userData)
      .then((res) => {
        dispatch(getUser(res.user));
        sessionStorage.setItem('user', JSON.stringify(res.user));
        dispatch(Login());
        history.push('/');
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(`Error ${error}`);
      });
  };

  if (loginUser) {
   return <Redirect to='/' />
}

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Sing In</h1>
        <label htmlFor="emailAddress">Email address</label>
        <input
          className={clsx(errors.emailAddress?.type === 'required' && 'errors-input')}
          id="emailAddress"
          type="email"
          placeholder="Email address"
          name="emailAddress"
          ref={register({
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
        />
        {errors.emailAddress?.type === 'required' && <p>*The field cannot be empty</p>}
        {errors.emailAddress?.type === 'pattern' && <p>*Email address not entered correctly</p>}
        <label htmlFor="password">Password</label>
        <input
          className={clsx(errors.password?.type === 'required' && 'errors-input')}
          id="password"
          type="password"
          placeholder="Password"
          name="password"
          ref={register({
            required: true,
            minLength: 8,
            maxLength: 40,
          })}
        />
        {errors.password?.type === 'required' && <p>*The field cannot be empty</p>}
        {errors.password?.type === 'minLength' && <p>*The password must contain at least 8 characters</p>}
        {errors.password?.type === 'maxLength' && <p>*The password must contain no more than 40 characters</p>}
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

SignInForm.defaultProps = {
   history: {},
 };
 
 SignInForm.propTypes = {
   history: PropTypes.objectOf,
 };

export default withRouter(SignInForm);
