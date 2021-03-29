import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import RingLoader from 'react-spinners/RingLoader';
import clsx from 'clsx';
import { getUser, Login } from '../../action/action';
import Api from '../../api/api';
import './profileForm.scss';

const ProfileForm = ({ history }) => {
   const dispatch = useDispatch();
   const [formSent, setFormSent] = useState(false);
   const userState = useSelector((state) => state.user);
   const loginUser = useSelector((state) => state.loginUser);
   const [loading, setLoading] = useState(false);
   const { register, handleSubmit, errors, setValue } = useForm();

   const onSubmit = (user) => {
      setLoading(true);

      const userPush = {
         user: {
            username: user.username,
            email: user.email,
            password: user.newpassword,
            image: user.avatar,
         },
      };

      if (!formSent) {
         setFormSent(true);
         Api.updateUser('/user', userPush, userState.token)
            .then((res) => {
               setLoading(false);
               dispatch(getUser(res.user));
               sessionStorage.setItem('user', JSON.stringify(res.user));
               dispatch(Login());
               history.push('/');
            })
            .catch((error) => {
               setLoading(false);
               // eslint-disable-next-line no-console
               console.log(`Error ${error}`);
            });
      }
   };

   const setValueForm = () => {
      setValue('username', userState.username);
      setValue('email', userState.email);
      setValue('avatar', userState.image);
   };

   useEffect(() => {
      setValueForm();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   if (!loginUser) {
      return <Redirect to='/' />
   }

   return (
      <div className="container">
         {loading && <RingLoader className="ringLoader" size={150} color="blue" />}
         <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <h1>Edit Profile</h1>
            <label htmlFor="username">Username</label>
            <input
               id="username"
               placeholder="Username"
               className={clsx(errors.username?.type === 'required' && 'errors-input')}
               name="username"
               ref={register({
                  required: true,
                  minLength: 3,
                  maxLength: 20,
                  pattern: /^[^\s]+(\s.*)?$/i
               })}
            />
            {errors.username?.type === 'required' && <p>*Required field</p>}
            {errors.username?.type === 'minLength' && <p>*The name must contain at least 3 characters</p>}
            {errors.username?.type === 'maxLength' && <p>*The name must contain no more than 20 characters</p>}
            {errors.username?.type === 'pattern' && <p>*The field cannot contain only a space</p>}
            <label htmlFor="email">Email address</label>
            <input
               id="email"
               placeholder="Email address"
               className={clsx(errors.email?.type === 'required' && 'errors-input')}
               name="email"
               ref={register({
                  required: true,
                  pattern: /^[^\s]+(\s.*)?$/i,
               })}
            />
            {errors.email?.type === 'required' && <p>*Required field</p>}
            {errors.email?.type === 'pattern' && <p>*The field cannot contain only a space</p>}
            <label htmlFor="newpassword"> New password</label>
            <input
               id="newpassword"
               type="password"
               placeholder="NewPassword"
               className={clsx(errors.newpassword?.type === 'required' && 'errors-input')}
               name="newpassword"
               ref={register({
                  required: false,
                  minLength: 8,
                  maxLength: 40,
                  pattern: /^[^\s]+(\s.*)?$/i
               })}
            />
            {errors.newpassword?.type === 'required' && <p>*The field cannot be empty</p>}
            {errors.newpassword?.type === 'minLength' && <p>*The password must contain at least 8 characters</p>}
            {errors.newpassword?.type === 'maxLength' && <p>*The password must contain no more than 40 characters
</p>}
            {errors.newpassword?.type === 'pattern' && <p>*The field cannot contain only a space</p>}
            <label htmlFor="avatar">Avatar image (url)</label>
            <input
               id="avatar"
               placeholder="Avatar image (url)"
               name="avatar"
               ref={register({
                  required: false,
                  pattern: /^[^\s]+(\s.*)?$/i
               })}
            />
            {errors.avatar?.type === 'pattern' && <p>*The field cannot contain only a space</p>}
            <input type="submit" value="Send" />
         </form>
      </div>
   );
};

ProfileForm.defaultProps = {
   history: {},
};

ProfileForm.propTypes = {
   history: PropTypes.objectOf,
};

export default withRouter(ProfileForm);
