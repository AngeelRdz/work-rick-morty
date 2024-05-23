import React, { ChangeEvent, FormEvent, useState } from "react";

import styles from "./search.module.scss";

interface SearchProps {
    onSearch: (searchTerm: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // onSearch(searchTerm);
  };

  return (
    <form
      className={`${styles.search} d-flex flex-sm-row flex-column align-items-center justify-content-center gap-4 mb-5`}
    >
      <input
        onChange={handleInputChange}
        value={searchTerm}
        placeholder="Search for characters"
        className={styles.input}
        type="text"
      />
      <button
        onClick={handleSearch}
        className={`${styles.btn} btn btn-primary fs-5`}
      >
        Search
      </button>
    </form>
  );
};

export default Search;
