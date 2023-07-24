import React, { useContext, useEffect, useRef, useState } from 'react';
import SearchContext from '../../api-hooks/useSearchContext';

const SearchButton = () => {
  const {searchValue, setSearchValue} = useContext(SearchContext);
  const [showInput, setShowInput] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (showInput) {
      inputRef.current.focus();
    }
  }, [showInput]);
  const submitForm = () => {
    setShowInput(false);
  };

  return (
    <>
      <button
        className="search-button"
        onClick={() => {
          if (showInput) {
            submitForm();
          } else {
            setShowInput(true);
          }
        }}
      >
        {showInput && (
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault();
              submitForm();
            }}
          >
            <input
              name="searchValue"
              ref={inputRef}
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </form>
        )}
        <img height="16px" width="16px" src="https://test.create.diagnal.com/images/search.png" alt="search" />
      </button>
    </>
  );
};

export default SearchButton;
