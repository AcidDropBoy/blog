import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser, Login } from '../../redux/action';
import avatar from '../../image/avatar.svg';
import 'antd/dist/antd.css';
import './header.scss';

const Header = () => {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.loginUser);
  const user = useSelector((state) => state.user);

  const logOut = () => {
    sessionStorage.removeItem('user');
    window.location.reload();
  };

  if (!loginUser) {
    const getUserLocal = sessionStorage.getItem('user');
    const userInfo = getUserLocal ? JSON.parse(getUserLocal) : false;
    if (userInfo) {
      dispatch(Login());
      dispatch(getUser(userInfo));
    }
  }
  return (
    <div className="header">
      <Link to="/" className="header__logotype">
        <h1>Realworld Blog</h1>
      </Link>
      {loginUser ? (
        <>
          <Link to="/new-article" className="header-link">
            <button type="button" className="header-button button-green">
              Create article
            </button>
          </Link>
          <Link to="/profile" className="header-link">
            <span className="color_black">{user.username}</span>
            <img className="author-img" src={user.image || avatar} alt="avatar" />
          </Link>
          <button type="button" className="header-button button-black" onClick={logOut}>
            Log Out
          </button>
        </>
      ) : (
        <>
          <Link to="/sign-in">
            <button type="button" className="button-color_black">
              Sing In
            </button>
          </Link>
          <Link to="/sign-up">
            <button type="button" className="header-button button-green">
              Sing Up
            </button>
          </Link>
        </>
      )}
    </div>
  );
};
export default Header;
