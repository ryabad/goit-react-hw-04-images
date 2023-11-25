import { useState } from 'react';
import css from './ImageGallery.module.css';
import Modal from 'components/Modal/Modal';

const ImageGalleryItem = ({ webformatURL, largeImageURL, alt }) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const handleOpen = () => {
    setIsShowModal(true);
  };

  const handleClose = () => {
    setIsShowModal(false);
  };

  return (
    <li className={css.galleryItem}>
      <img
        src={webformatURL}
        alt={alt}
        className={css.galleryItemImage}
        onClick={handleOpen}
      />
      {isShowModal && (
        <Modal baseImg={largeImageURL} alt={alt} close={handleClose} />
      )}
    </li>
  );
};

export default ImageGalleryItem;
