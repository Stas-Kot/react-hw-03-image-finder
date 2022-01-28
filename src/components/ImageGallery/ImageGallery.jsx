import { Component } from 'react';
import { Bars } from 'react-loader-spinner';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import galleryAPI from '../../sevices/gallery-api';
import Button from 'components/Button/Button';
import { toast } from 'react-toastify';

export default class ImageGallery extends Component {
  api_KEY = '21750958-271f4873848cc9d3a2fe2c382';

  state = {
    images: [],
    page: 1,
    error: null,
    status: 'idle',
    hitsLength: 0,
  };

  onLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const newQuery = this.props.searchQuery;
    if (prevQuery !== newQuery) {
      this.setState({ status: 'pending', page: 1 });

      galleryAPI
        .fetchGallery(newQuery, this.api_KEY, this.state.page)
        .then(({ hits }) => {
          if (hits.length === 0) {
            toast.error(`No results were found for your query: ${newQuery}`);
            this.setState({ status: 'idle', hitsLength: 0 });
            return;
          }
          this.props.onNewFetch(hits);
          this.setState({
            images: hits,
            status: 'resolved',
            hitsLength: hits.length,
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
    if (prevState.page !== this.state.page && this.state.page > 1) {
      this.setState({ status: 'pending' });

      galleryAPI
        .fetchGallery(newQuery, this.api_KEY, this.state.page)
        .then(({ hits }) => {
          if (hits.length === 0) {
            toast.error(
              `We're sorry, there are no more results for: ${newQuery}`,
            );
            this.setState({ status: 'resolved', hitsLength: 0 });
            return;
          }
          this.props.onLoadMoreFetch(hits);
          this.setState(prev => ({
            images: [...prev.images, ...hits],
            status: 'resolved',
            hitsLength: hits.length,
          }));
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  render() {
    const { images, error, status, hitsLength } = this.state;
    if (status === 'idle') {
      return <></>;
    }

    if (status === 'pending') {
      return (
        <div className={hitsLength > 0 ? s.spinnerBottom : s.spinner}>
          <Bars heigth="100" width="100" color="#3f51b5" ariaLabel="loading" />
        </div>
      );
    }

    if (status === 'rejected') {
      return <h1 className={s.message}>{error.message}</h1>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={s.imageGallery}>
            {images.map(({ webformatURL, tags }, index) => (
              <ImageGalleryItem
                key={index}
                webformatURL={webformatURL}
                tags={tags}
                onClick={() => this.props.onClick(index)}
              />
            ))}
          </ul>
          {hitsLength !== 0 && (
            <Button type="button" onClick={this.onLoadMore} />
          )}
        </>
      );
    }
  }
}
