import React from 'react';
import PropTypes from 'prop-types';
import avatar from '../../image/avatar.svg';
import like from '../../image/like.svg';
import activeLike from '../../image/activeLike.svg';

const ArticleSection = ({ title, putLike, likeCount, tags, userName, image, createdAt, loginUser, likeFunc }) => {
  const date = (date) => {
    const newDate = new Date(date);
    const endDate = `${newDate.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
    return endDate;
  };

  const likeIcon = putLike ? activeLike : like;

  return (
    <div className="article-section">
      <div className="article-header">
        <span>{title}</span>
        {!loginUser ? (
          <img className="article-like-img" src={likeIcon} alt="like" />
        ) : (
          <button onClick={likeFunc} type="button">
            <img className="article-like-img" src={likeIcon} alt="like" />
          </button>
        )}
        <span className="article-like-counter">{likeCount}</span>
        <div className="article-tags">{tags}</div>
      </div>
      <div className="article-author">
        <div className="article-author-name">
          <span>{userName}</span>
          <span className="article-date">{date(createdAt)}</span>
        </div>
        <img className="article-author-img" src={image || avatar} alt="avatar" />
      </div>
    </div>
  );
};

ArticleSection.defaultProps = {
   title: 'title',
   putLike: false,
   likeCount: 0,
   tags: 'tag',
   userName: 'username',
   image: 'url',
   createdAt: 'date',
   loginUser: false,
   likeFunc: () => {},
};

ArticleSection.propTypes = {
   title: PropTypes.string,
   putLike: PropTypes.bool,
   likeCount: PropTypes.number,
   tags: PropTypes.string,
   userName: PropTypes.string,
   image: PropTypes.string,
   createdAt: PropTypes.string,
   loginUser: PropTypes.bool,
   likeFunc: PropTypes.func,
};

export default ArticleSection;
