import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import RingLoader from 'react-spinners/RingLoader';
import ReactMarkdown from 'react-markdown';
import { getArticle, loadArticles, loadArticle } from '../../redux/action';
import ArticleSection from './articleSection';
import ArticleDescription from './articleDescription';
import Api from '../../api/api';
import 'antd/dist/antd.css';
import './article.scss';

const Article = ({ article, tags, userName, slug, modal, setModal, deleteArticle, token, loginUser }) => {
  const { title, favoritesCount, favorited, description, author, createdAt, body } = article;
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

  return (
    <div className="article-main">
      <div className="article-conteiner">
        <div className="article-content">
          <ArticleSection
            title={title}
            likeCount={likeCount}
            tags={tags}
            putLike={putLike}
            userName={author.username}
            image={author.image}
            createdAt={createdAt}
            loginUser={loginUser}
            likeFunc={likeFunc}
          />
          <ArticleDescription
            description={description}
            userName={userName}
            authorName={author.username}
            slug={slug}
            modal={modal}
            deleteArticle={deleteArticle}
            setModal={setModal}
            loginUser={loginUser}
          />
        </div>
        <ReactMarkdown className="article-text-public">{body}</ReactMarkdown>
      </div>
    </div>
  );
};

const ArticleContainer = ({ slug, history }) => {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.loginUser);
  const user = useSelector((state) => state.user);
  const articleLoad = useSelector((state) => state.articleLoad);
  const article = useSelector((state) => state.article);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    Api.getArticle(slug, user.token)
      .then((result) => {
        dispatch(getArticle(result.article));
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(`Error ${error}`);
      });
    return () => {
      dispatch(loadArticle());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteArticle = () => {
    Api.deleteArticle('/articles', slug, user.token).then(() => {
      dispatch(loadArticles());
      history.push('/');
    });
  };

  let tags;

  if (articleLoad) {
    tags =
      article.tagList.length > 0
        ? article.tagList.map((item) => <div className="article-tags-item">{item}</div>)
        : [];
  }

  return (
    <div className="section">
      {!articleLoad ? (
        <RingLoader size={150} color="blue" />
      ) : (
        <Article
          article={article}
          tags={tags}
          userName={user.username}
          slug={slug}
          modal={modal}
          setModal={setModal}
          deleteArticle={deleteArticle}
          token={user.token}
          loginUser={loginUser}
        />
      )}
    </div>
  );
};

ArticleContainer.defaultProps = {
  slug: 'slug',
  history: {},
};

ArticleContainer.propTypes = {
  slug: PropTypes.string,
  history: PropTypes.objectOf,
};

Article.defaultProps = {
   article: {
      title: 'article',
      favoritesCount: 0,
      favorited: false,
      description: 'text',
      author: 'author',
      createdAt: 'date',
      body: 'text',
   },
   tags: ['tag'],
   userName: 'username',
   slug: 'slug',
   modal: false,
   setModal: () => {},
   deleteArticle: () => {},
   token: 'token',
   loginUser: false,
}

Article.propTypes = {
   article: PropTypes.objectOf,
   tags: PropTypes.arrayOf,
   userName: PropTypes.string,
   slug: PropTypes.string,
   modal: PropTypes.bool,
   setModal: PropTypes.func,
   deleteArticle: PropTypes.func,
   token: PropTypes.string,
   loginUser: PropTypes.bool,
};

export default withRouter(ArticleContainer);
