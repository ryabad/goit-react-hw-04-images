import ImageGalleryItem from './ImageGalleryItem';
import css from './ImageGallery.module.css';
import { Fragment } from 'react';

const ImageGallery = ({ data, lastImageRef }) => {
  return (
    <ul className={css.gallery}>
      {data.map((el, index) => (
        <Fragment key={el.id}>
          <ImageGalleryItem
            webformatURL={el.webformatURL}
            largeImageURL={el.largeImageURL}
            alt={el.tags}
          />
          {index === data.length - 1 && <div ref={lastImageRef} />}
        </Fragment>
      ))}
    </ul>
  );
};

export default ImageGallery;
