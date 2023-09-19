import React, { useState, KeyboardEvent } from 'react';
import 'styles/supply/InputTags.scss';

function InputTags() {
  const [tags, setTags] = useState<string[]>([]);
  const isInputDisabled = tags.length >= 5;

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
    <div className="flex flex-col">
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
      <div className="tags-input">
        <input
          className="tag-input"
          type="text"
          onKeyUp={(e) => addTags(e)}
          placeholder="# 태그를 입력해주세요. (최대 5개)"
          disabled={isInputDisabled}
        />
      </div>
    </div>
  );
}

export default InputTags;
