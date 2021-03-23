import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import clsx from 'clsx';

const ArticleDescription = ({ description, userName, authorName, slug, modal, deleteArticle, setModal, loginUser }) => (
    <div className="article-description">
      <div className="article-text">
        <div className="article-text">{description}</div>
      </div>
      <div className="article-btn">
        {loginUser && userName === authorName ? (
          <div>
            <Button
              onClick={() => {
                setModal(true);
              }}
              className="article-btn-delet"
            >
              Delete
            </Button>
            <Button className="article-btn-edit">
              <Link to={`/articles/${slug}/edit`}>Edit</Link>
            </Button>
          </div>
        ) : null}
        <div className={clsx('article-modal-delete', !modal && 'article-modal-delete-close')}>
          <div>Are you shure?</div>
          <div className="article-btn-modal">
            <Button onClick={deleteArticle} className="article-btn-yes">
              Yes
            </Button>
            <Button
              onClick={() => {
                setModal(false);
              }}
              className="article-btn-no"
            >
              No
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  ArticleDescription.defaultProps = {
   description: 'description',
   userName: 'username',
   authorName: 'authorname',
   slug: 'slug',
   modal: false,
   deleteArticle: () => {},
   setModal: () => {},
   loginUser: false,
};

ArticleDescription.propTypes = {
   description: PropTypes.string,
   userName: PropTypes.string,
   authorName: PropTypes.string,
   slug: PropTypes.string,
   modal: PropTypes.bool,
   deleteArticle: PropTypes.func,
   setModal: PropTypes.func,
   loginUser: PropTypes.bool,
};

export default ArticleDescription;
