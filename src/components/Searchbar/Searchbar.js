import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  return (
    <header className={css.searchbar}>
      <form onSubmit={onSubmit} className={css.form}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
        />
      </form>
    </header>
  );
};

export default Searchbar;
