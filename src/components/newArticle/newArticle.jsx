import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { loadArticles } from '../../action/action';
import Api from '../../api/api';
import TagsForm from '../tagsForm/tagsForm';
import './newArticle.scss';

const NewArticle = ({ history }) => {
   const dispatch = useDispatch();
   const userState = useSelector((state) => state.user);
   const [formSent, setFormSent] = useState(false);
   const [tagsAdd, setTagsAdd] = useState(new Set([]));
   const { register, handleSubmit, errors } = useForm();
   const [formError, setFormError] = useState(false);

   const onSubmit = (article) => {
      const userPush = {
         article: {
            title: article.title,
            description: article.shortdescription,
            body: article.text,
            tagList: [...tagsAdd],
         },
      };
      if (!formSent) {
         setFormSent(true);
         Api.createArticle('/articles', userPush, userState.token).then(() => {
            dispatch(loadArticles());
            history.push('/');
         })
            .catch(() => {
               setFormError(true);
            });
      }
   };

   return (
      <div className="newArticle-container">
         <form className='newArticle-form' onSubmit={handleSubmit(onSubmit)}>
            <h1>Create article</h1>
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
            <TagsForm tags={tagsAdd} setTags={setTagsAdd} />
            {formError ? <p>*Error sending the form</p> : null}
            <input type="submit" value="Send" />
         </form>
      </div>
   );
};

NewArticle.defaultProps = {
   history: {},
};

NewArticle.propTypes = {
   history: PropTypes.objectOf,
};

export default withRouter(NewArticle);
