import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import RingLoader from 'react-spinners/RingLoader';
import { getArticles, setPagination } from '../../redux/action';
import Api from '../../api/api';
import avatar from '../../image/avatar.svg';
import ArticlesContent from './articlesContent';
import 'antd/dist/antd.css';
import './articles.scss';

const Articles = ({ title, favorited, favoritesCount, tags, author, text, date, slug, loginUser, token }) => {
  const [putLike, setLike] = useState(favorited);
  const [likeCount, setLikeCount] = useState(favoritesCount);

  const liked = (token, slug, setLikeCount, likeCount, setLike) => {
    Api.likeArticle('/articles', token, slug);
    if (putLike) {
      setLikeCount((likeCount) => likeCount - 1);
      setLike(false);
    } else {
      setLikeCount((likeCount) => likeCount + 1);
      setLike(true);
    }
  };

  const likeFunc = () => liked(token, slug, setLikeCount, likeCount, setLike);

  const articleTags =
    tags.length > 0
      ? tags.map((item) => <div className="articles-tag">{item}</div>)
      : false;

  return (
    <div className="articles-conteiner">
      <ArticlesContent
        title={title}
        likeCount={likeCount}
        putLike={putLike}
        likeFunc={likeFunc}
        articleTags={articleTags}
        text={text}
        loginUser={loginUser}
        slug={slug}
      />
      <div className="articles-author">
        <div className="articles-author__text">
          <span>{author.username}</span>
          <span className="articles-date">{date}</span>
        </div>
        <img className="articles-author-img" src={author.image || avatar} alt="avatar" />
      </div>
    </div>
  );
};

const ArticlesContainer = () => {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.loginUser);
  const userState = useSelector((state) => state.user);
  const loadingArticles = useSelector((state) => state.loadingArticles);
  const articles = useSelector((state) => state.articles);
  const pageNumber = useSelector((state) => state.pageNumber);
  const authorOfArticle = useSelector((state) => state.authorOfArticle);

  const useSetPagination = (page) => {
    dispatch(setPagination(page));
  };

  useEffect(() => {
    Api.getArticles(pageNumber, userState.token, authorOfArticle)
      .then((result) => {
        dispatch(getArticles(result.articles));
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(`Error ${error}`);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingArticles, authorOfArticle]);

  const ArticlesItems = articles.map((item) => {
    const date = (date) => {
      const newDate = new Date(date);
      const endDate = `${newDate.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
      return endDate;
    };

    return (
      <Articles
        key={item.createdAt}
        title={item.title}
        favorited={item.favorited}
        favoritesCount={item.favoritesCount}
        tags={item.tagList}
        author={item.author}
        text={item.description}
        date={date(item.createdAt)}
        slug={item.slug}
        loginUser={loginUser}
        token={userState.token}
      />
    );
  });

  return (
    <div className="content">
      {!loadingArticles ? <RingLoader size={150} color="blue" /> : ArticlesItems}
      {loadingArticles && (
        <Pagination
          className="pagination__m_b"
          pageSize={5}
          current={pageNumber}
          onChange={useSetPagination}
          total={25}
          showSizeChanger={false}
        />
      )}
    </div>
  );
};

Articles.defaultProps = {
   title: 'title',
   favorited: false,
   favoritesCount: 0,
   tags: 'tag',
   author: 'author',
   text: 'text',
   date: 'date',
   slug: 'slug',
   loginUser: false,
   token: 'token',
}

Articles.propTypes = {
   title: PropTypes.string,
   favorited: PropTypes.bool,
   favoritesCount: PropTypes.number,
   tags: PropTypes.string,
   author: PropTypes.string,
   text: PropTypes.string,
   date: PropTypes.string,
   slug: PropTypes.string,
   loginUser: PropTypes.bool,
   token: PropTypes.string,
};

export default ArticlesContainer;
