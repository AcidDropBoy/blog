import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import like from '../../image/like.svg';
import activeLike from '../../image/activeLike.svg';

const ArticlesContent = ({ title, likeCount, putLike, likeFunc, articleTags, text, loginUser, slug }) => {
  const likeIcon = putLike ? activeLike : like;

  return (
    <div className="articles-content">
      <div className="articles-header">
        <Link to={`/articles/${slug}`}>
          <span>{title}</span>
        </Link>
        {!loginUser ? (
          <img className="articles-like-img" src={likeIcon} alt="like" />
        ) : (
          <button onClick={likeFunc} type="button">
            <img className="articles-like-img articles-like-img-cursor" src={likeIcon} alt="like" />
          </button>
        )}
        <span className="articles-like">{likeCount}</span>
      </div>
      <div className="tags">{articleTags}</div>
      <div className="articles-text">{text}</div>
    </div>
  );
};

ArticlesContent.defaultProps = {
   title: 'title',
   likeCount: 0,
   putLike: false,
   likeFunc: () => {},
   articleTags: 'tags',
   text: 'text',
   loginUser: false,
   slug: 'slug',
}

ArticlesContent.propTypes = {
   title: PropTypes.string,
   likeCount: PropTypes.number,
   putLike: PropTypes.bool,
   likeFunc: PropTypes.func,
   articleTags: PropTypes.string,
   text: PropTypes.string,
   loginUser: PropTypes.bool,
   slug: PropTypes.string,
};

export default ArticlesContent;
