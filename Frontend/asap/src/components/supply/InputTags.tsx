import React, { useState, KeyboardEvent } from 'react';
import 'styles/supply/InputTags.scss';

function InputTags() {
  const initialTags = ['CodeStates', 'kimcoding'];

  const [tags, setTags] = useState(initialTags);

  const removeTags = (indexToRemove: number) => {
    const filteredTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(filteredTags);
  };

  const addTags = (event: KeyboardEvent<HTMLInputElement>) => {
    const inputElement = event.target as HTMLInputElement;
    if (
      event.key === 'Enter' &&
      inputElement.value !== '' &&
      !tags.includes(inputElement.value)
    ) {
      setTags([...tags, inputElement.value]);
      inputElement.value = ''; // Clear the input
    }
  };

  return (
    <div className="tags-input">
      <ul id="tags">
        {tags.map((tag, index) => (
          <li key={tag} className="tag">
            <span className="tag-title">{tag}</span>
            <button
              type="button"
              className="tag-close-icon"
              onClick={() => removeTags(index)}
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <input
        className="tag-input"
        type="text"
        onKeyUp={(e) => addTags(e)}
        placeholder="태그를 입력해주세요"
      />
    </div>
  );
}

export default InputTags;
