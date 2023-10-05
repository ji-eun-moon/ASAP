import React, { useState, ChangeEvent, FormEvent } from 'react';
import 'styles/common/SearchBar.scss';
import { ReactComponent as Search } from 'assets/icons/Search2.svg';

function SearchBar() {
  const [input, setInput] = useState<string>('');
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(input);
    // 검색 axios
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <div className="bar-container">
          <input
            value={input}
            type="text"
            className="w-11/12 border-none outline-none"
            onChange={handleInput}
            placeholder="원하시는 상품명 혹은 키워드를 입력하세요."
          />
          <button type="submit">
            <Search className="w-6" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
