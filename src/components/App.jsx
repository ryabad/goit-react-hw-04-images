import { useEffect, useRef, useState } from 'react';

import fetchSearchQuery from 'services/pixabay';

import Notiflix from 'notiflix';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

import css from './App.module.css';

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState(null);
  const [loadMore, setLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const lastImageRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    const searchValue = e.currentTarget.elements.search.value.trim();
    if (searchValue === '') {
      return Notiflix.Notify.failure(
        'Sorry, there are no images with your search query. Please, try again!'
      );
    }
    setSearchText(searchValue);
    setPage(1);
    setImages(null);
  };

  const handleClick = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    if (searchText === '') {
      return;
    }
    setIsLoading(true);
    fetchSearchQuery(searchText, page)
      .then(response => {
        if (response.data.total !== 0) {
          setImages(prev =>
            prev ? [...prev, ...response.data.hits] : [...response.data.hits]
          );
          setLoadMore(page < Math.ceil(response.data.totalHits / 12));
        } else {
          setLoadMore(false);
          Notiflix.Notify.warning('There is no images for your query');
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchText, page]);

  useEffect(() => {
    if (lastImageRef.current) {
      lastImageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [images]);

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {images && <ImageGallery data={images} lastImageRef={lastImageRef} />}
      {loadMore && <Button onClick={handleClick} />}
    </div>
  );
};

export default App;
