import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Redirect, withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { getUser, Login } from '../../action/action';
import Api from '../../api/api';
import './signUpForm.scss';

const SignUpForm = ({ history }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, getValues } = useForm();
  const loginUser = useSelector((state) => state.loginUser);

  const onSubmit = (user) => {
    const userData = {
      user: {
        username: user.username,
        email: user.email,
        password: user.password,
      },
    };

    Api.userRegistration('/users', userData)
      .then((result) => {
        dispatch(getUser(result.user));
        sessionStorage.setItem('user', JSON.stringify(result.user));
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
        <h1>Create new account</h1>
        <label htmlFor="username">Username</label>
        <input
          className={clsx(errors.username?.type === 'required' && 'errors-input')}
          id="username"
          type="text"
          placeholder="Username"
          name="username"
          ref={register({
            required: true,
            minLength: 3,
            maxLength: 20,
          })}
        />
        {errors.username?.type === 'required' && <p>*The field cannot be empty</p>}
        {errors.username?.type === 'minLength' && <p>*The password must contain at least 3 characters</p>}
        {errors.username?.type === 'maxLength' && <p>*The password must contain no more than 20 characters</p>}
        <label htmlFor="email">Email address</label>
        <input
          className={clsx(errors.email?.type === 'required' && 'errors-input')}
          id="email"
          type="email"
          placeholder="Email address"
          name="email"
          ref={register({
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
        />
        {errors.email?.type === 'required' && <p>*The field cannot be empty</p>}
        {errors.email?.type === 'pattern' && <p>*Email address not entered correctly</p>}
        <label htmlFor="password">Password</label>
        <input
          className={clsx(
            (errors.password?.type === 'required' || getValues('password') !== getValues('repeatPassword')) &&
              'errors-input'
          )}
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
        <label htmlFor="repeatPassword">Repeat Password</label>
        <input
          className={clsx(
            (errors.repeatPassword?.type === 'required' || getValues('repeatPassword') !== getValues('password')) &&
              'errors-input'
          )}
          id="repeatPassword"
          type="password"
          placeholder="Repeat Password"
          name="repeatPassword"
          ref={register({
            required: true,
          })}
        />
        {errors.password?.type === 'required' && <p>*The field cannot be empty</p>}
        {getValues('password') !== getValues('repeatPassword') && <p>*Passwords do not match</p>}
        <div className="checkbox">
          <label htmlFor="info">I agree to the processing of my personal information</label>
          <input id="info" type="checkbox" name="info" defaultChecked ref={register({ required: true })} />
        </div>
        <input type="submit" value="Create" />
        <div className="redirect">
          Already have an account? <Link to="/sign-in">Sign In</Link>
        </div>
      </form>
    </div>
  );
};

SignUpForm.defaultProps = {
   history: {},
 };
 
 SignUpForm.propTypes = {
   history: PropTypes.objectOf,
 };

export default withRouter(SignUpForm);
