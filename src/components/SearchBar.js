import React, { useState } from "react";
import { Badge } from "reactstrap";

function SearchBar(props) {
  const [innerSearch, setInnerSearch] = useState("");
  const [error, setError] = useState(null);
  return (
    <div>
      <input
        aria-label="search-button"
        name="search"
        id="search"
        type="search"
        spellCheck="false"
        placeholder={props.placeholder}
        value={innerSearch}
        onChange={(e) => {
          if (/[0-9]/.test(e.target.value)) {
            setError("Stocks symbols shouldn't have numbers");
          } else {
            setError(null);
          }
          setInnerSearch(e.target.value);
        }}
      />
      <button
        id="search-button"
        type="button"
        onClick={() => props.onSubmit(innerSearch)}
        disabled={error !== null}
      >
        Search
      </button>
      {error !== null ? <Badge color="danger">{error}</Badge> : null}
    </div>
  );
}

export default SearchBar;
