import css from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className={css.buttonLoad}>
      Load More
    </button>
  );
};

export default Button;
