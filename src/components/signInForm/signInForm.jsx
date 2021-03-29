import React, { useState } from 'react';
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
   const [formSent, setFormSent] = useState(false);
   const { register, handleSubmit, errors } = useForm();
   const loginUser = useSelector((state) => state.loginUser);
   const [signInError, setSignInError] = useState(false);
   const [emailOrPasswordError, setEmailOrPasswordError] = useState(false);

   const onSubmit = (user) => {
      const userData = {
         user: {
            email: user.emailAddress,
            password: user.password,
         },
      };

      if (!formSent) {
         Api.userAuthentication('/users/login', userData)
            .then((result) => {
               if (result.errors) {
                  setEmailOrPasswordError(true);
               } else {
                  setFormSent(true);
                  dispatch(getUser(result.user));
                  sessionStorage.setItem('user', JSON.stringify(result.user));
                  dispatch(Login());
                  history.push('/');
               }
            })
            .catch(() => {
               setSignInError(true);
            });
      }
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
                  pattern: /^[^\s]+(\s.*)?$/i,
               })}
            />
            {errors.emailAddress?.type === 'required' && <p>*The field cannot be empty</p>}
            {errors.emailAddress?.type === 'pattern' && <p>*The field cannot contain only a space</p>}
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
            {signInError ? <p>*Sign in error</p> : null}
            {emailOrPasswordError ? <p>*Email or password is invalid</p> : null}
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
