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
    // this.setState({ searchText: searchValue, page: 1, images: null });
  };

  const handleClick = () => {
    setPage(prev => prev + 1);
    // this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  useEffect(() => {
    if (searchText === '') {
      return;
    }
    setIsLoading(true);
    // this.setState({ isLoading: true });
    fetchSearchQuery(searchText, page)
      .then(response => {
        if (response.data.total !== 0) {
          setImages(prev =>
            prev ? [...prev, ...response.data.hits] : [...response.data.hits]
          );
          setLoadMore(page < Math.ceil(response.data.totalHits / 12));
          // this.setState(
          //   prevState => ({
          //     images: prevState.images
          //       ? [...prevState.images, ...response.data.hits]
          //       : [...response.data.hits],
          //     loadMore:
          //       this.state.page < Math.ceil(response.data.totalHits / 12),
          //   }),
          //   () => {
          //     window.scrollTo({
          //       top: document.documentElement.scrollHeight,
          //       behavior: 'smooth',
          //     });
          //   }
          // );
        } else {
          setLoadMore(false);
          // this.setState({ loadMore: false });
          Notiflix.Notify.warning('There is no images for your query');
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
        // this.setState({ isLoading: false });
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

// class App extends Component {
//   state = {
//     searchText: '',
//     page: 1,
//     images: null,
//     loadMore: false,
//     isLoading: false,
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     const searchValue = e.currentTarget.elements.search.value.trim();
//     if (searchValue === '') {
//       return Notiflix.Notify.failure(
//         'Sorry, there are no images with your search query. Please, try again!'
//       );
//     }
//     this.setState({ searchText: searchValue, page: 1, images: null });
//   };

//   handleClick = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (
//       prevState.searchText !== this.state.searchText ||
//       prevState.page !== this.state.page
//     ) {
//       this.setState({ isLoading: true });
//       fetchSearchQuery(this.state.searchText, this.state.page)
//         .then(response => {
//           if (response.data.total !== 0) {
//             this.setState(
//               prevState => ({
//                 images: prevState.images
//                   ? [...prevState.images, ...response.data.hits]
//                   : [...response.data.hits],
//                 loadMore:
//                   this.state.page < Math.ceil(response.data.totalHits / 12),
//               }),
//               () => {
//                 window.scrollTo({
//                   top: document.documentElement.scrollHeight,
//                   behavior: 'smooth',
//                 });
//               }
//             );
//           } else {
//             this.setState({ loadMore: false });
//             Notiflix.Notify.warning('There is no images for your query');
//           }
//         })
//         .catch(error => console.log(error))
//         .finally(() => {
//           this.setState({ isLoading: false });
//         });
//     }
//   }

//   render() {
//     const { isLoading, images, loadMore } = this.state;

//     return (
//       <div className={css.app}>
//         <Searchbar onSubmit={this.handleSubmit} />
//         {isLoading && <Loader />}
//         {images && <ImageGallery data={images} />}
//         {loadMore && <Button onClick={this.handleClick} />}
//       </div>
//     );
//   }
// }

// export default App;
