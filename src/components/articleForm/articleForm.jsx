import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { loadArticles, getArticle, loadArticle } from '../../redux/action';
import Api from '../../api/api';
import TagsForm from '../tagsForm/tagsForm';
import './articleForm.scss';

const ArticleForm = ({ history, slug, newArticle = true }) => {
   const dispatch = useDispatch();
   const [formSent, setFormSent] = useState(false);
   const articleLoad = useSelector((state) => state.articleLoad);
   const article = useSelector((state) => state.article);
   const userState = useSelector((state) => state.user);
   const loginUser = useSelector((state) => state.loginUser);
   const [tagsEdit, setTagsEdit] = useState('');
   const [tagsAdd, setTagsAdd] = useState(new Set([]));
   const { register, handleSubmit, errors, setValue } = useForm();
   const [formError, setFormError] = useState(false);

   const onSubmit = (article) => {
      const userPush = {
         article: {
            title: article.title,
            description: article.shortdescription,
            body: article.text,
            tagList: newArticle ? [...tagsAdd] : [...tagsEdit],
         },
      };
      if (!formSent) {
         setFormSent(true);
         if (newArticle) {
            Api.createArticle('/articles', userPush, userState.token).then(() => {
               dispatch(loadArticles());
               history.push('/');
            })
               .catch(() => {
                  setFormError(true);
               });
         } else {
            Api.updateArticle('/articles', userPush, userState.token, slug).then(() => {
               dispatch(loadArticles());
               dispatch(loadArticle());
               history.push(`/`);
            });
         }
      }
   };

   const setValueForm = () => {
      setValue('title', article.title);
      setValue('shortdescription', article.description);
      setValue('text', article.body);
      setTagsEdit(new Set([...article.tagList]));
   };

   useEffect(() => {
      if (!newArticle) {
         if (!articleLoad) {
            Api.getArticle(slug, userState.token)
               .then((result) => {
                  dispatch(getArticle(result.article));
               })
               .catch(() => {
                  setFormError(true);
               });
         } else {
            setValueForm();
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [articleLoad]);

   if (!loginUser) {
      return <Redirect to='/' />
   }

   return (
      <div className="newArticle-container">
         <form className='newArticle-form' onSubmit={handleSubmit(onSubmit)}>
            {newArticle ? <h1>Create article</h1> : <h1>Edite article</h1>}
            <label htmlFor="title">Title</label>
            <input
               id="title"
               placeholder="Title"
               className={clsx(errors.title?.type === 'required' && 'newArticle-errors__input')}
               name="title"
               ref={register({ required: true, pattern: /^[^\s]+(\s.*)?$/i })}
            />
            {errors.title?.type === 'required' && <p>*The field cannot be empty</p>}
            {errors.title?.type === 'pattern' && <p>*The field cannot contain only a space</p>}
            <label htmlFor="shortdescription">Short description</label>
            <input
               id="shortdescription"
               placeholder="Short description"
               className={clsx(errors.shortdescription?.type === 'required' && 'newArticle-errors__input')}
               name="shortdescription"
               ref={register({ required: true, pattern: /^[^\s]+(\s.*)?$/i })}
            />
            {errors.shortdescription?.type === 'required' && <p>*The field cannot be empty</p>}
            {errors.shortdescription?.type === 'pattern' && <p>*The field cannot contain only a space</p>}
            <label htmlFor="text">Text</label>
            <textarea
               id="text"
               type="text"
               placeholder="Text"
               className={clsx(errors.text?.type === 'required' && 'newArticle-errors__input')}
               name="text"
               ref={register({ required: true, pattern: /^[^\s]+(\s.*)?$/i })}
            />
            {errors.text?.type === 'required' && <p>*The field cannot be empty</p>}
            {errors.text?.type === 'pattern' && <p>*The field cannot contain only a space</p>}
            {newArticle ? <TagsForm tags={tagsAdd} setTags={setTagsAdd} /> : <TagsForm tags={tagsEdit} setTags={setTagsEdit} />}
            {formError ? <p>*Error sending the form</p> : null}
            <input type="submit" value="Send" />
         </form>
      </div>
   );
};

ArticleForm.defaultProps = {
   history: {},
   slug: 'test',
   newArticle: true,
};

ArticleForm.propTypes = {
   history: PropTypes.objectOf,
   slug: PropTypes.string,
   newArticle: PropTypes.bool,
};

export default withRouter(ArticleForm);