import PropTypes from 'prop-types';
import styles from './Search.module.css';

export const Search = ({ query, onQueryChange }) => {
  return (
    <div className={styles.SearchBar}>
      <input type="text" className={styles.SearchBar_input} value={query} onChange={onQueryChange} placeholder='Search...' />
    </div>
  )
}

Search.propTypes = {
  query: PropTypes.string,
  onQueryChange: PropTypes.func,
}
