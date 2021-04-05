import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import './tagsForm.scss';

const TagsForm = ({ tags, setTags }) => {
  const { register, getValues, setValue } = useForm();
  const [inputValue, setInputValue] = useState(false);

  const focusdeleteTag = (tag) => {
    const newTags = tags;
    newTags.delete(tag);
    setTags(newTags);
  };

  const resultTags = [...tags].map((item) => (
      <div className="container-input delete-container">
        <input className="input" type="text" value={item} name="tag" />
        <button
          className="delete-btn"
          type="button"
          onClick={() => {
            focusdeleteTag(item);
          }}
        >
          Delete
        </button>
      </div>
    ));

  const formFunc = () => {
    if (getValues('tag')) {
      const valueForm = getValues('tag');
      if (/^\s+$/.test(valueForm)) {
         setInputValue(true);
      } else {
      setTags(new Set([...tags, getValues('tag')]));
      setValue('tag', '');
      setInputValue(false);
      }
     } else setInputValue(true);
  };

  return (
    <div>
      <div>{resultTags}</div>
      <label htmlFor="tag">Tags</label>
      <div className="container-input">
        <input
          className={inputValue && 'tag-errors__input'}
          id="tag"
          type="text"
          placeholder="Tags"
          name="tag"
          ref={register({ required: true, pattern : /^[^\s]+(\s.*)?$/i })}
        />
        {inputValue && <p>*The field cannot be empty or contain only spaces</p>}
        <input className="add-btn" type="button" value="Add tag" onClick={formFunc} />
      </div>
    </div>
  );
};

TagsForm.defaultProps = {
  tags: ['tag'],
  setTags: () => {},
};

TagsForm.propTypes = {
  tags: PropTypes.arrayOf,
  setTags: PropTypes.func,
};

export default TagsForm;
