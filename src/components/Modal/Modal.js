import { useEffect } from 'react';

import css from './Modal.module.css';

const Modal = ({ close, baseImg, alt }) => {
  const handleClick = e => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  useEffect(() => {
    const handleESC = e => {
      if (e.code === 'Escape') {
        close();
      }
    };
    document.addEventListener('keydown', handleESC);

    return () => {
      document.removeEventListener('keydown', handleESC);
    };
  }, [close]);

  return (
    <div className={css.overlay} onClick={handleClick}>
      <div className={css.modal}>
        <img src={baseImg} alt={alt} />
      </div>
    </div>
  );
};

export default Modal;
