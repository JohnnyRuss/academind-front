import { useState } from 'react';
import styles from './searchBar.module.scss';
import { SearchIcon } from '../Icons/icons';

function SearchBar({ value, className, allowToggle, onFocus = () => {}, onChange = () => {} }) {
  const [showBar, setShowBar] = useState(false);

  return (
    <div className={`${styles.searchField} ${className}`}>
      <input
        onFocus={onFocus}
        onChange={onChange}
        value={value}
        type='text'
        id='search'
        className={`${styles.searchFieldInp} ${showBar ? styles.active : ''} navigation--searchBar`}
        placeholder='search...'
        data-search-bar-input
      />
      <label
        htmlFor='search'
        className={styles.searchFieldLabel}
        onClick={() => allowToggle && setShowBar((prev) => !prev)}>
        <SearchIcon />
      </label>
    </div>
  );
}

export default SearchBar;
