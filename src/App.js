import { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';

class App extends Component {
  state = {
    searchQuery: '',
    gallery: [],
    showModal: false,
    activeImgIdx: 0,
  };

  forSubmitHandler = text => {
    this.setState({ searchQuery: text });
  };

  newFetchHandler = hits => {
    this.setState({ gallery: hits });
  };

  loadMoreFetchHandler = hits => {
    this.setState(({ gallery }) => ({
      gallery: [...gallery, ...hits],
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onClickHandler = index => {
    this.setState({
      activeImgIdx: index,
    });
    this.toggleModal();
  };

  render() {
    const { showModal, searchQuery, gallery, activeImgIdx } = this.state;

    return (
      <div className="App">
        {showModal && (
          <Modal
            handleModal={this.toggleModal}
            largeImageURL={this.state.gallery[activeImgIdx].largeImageURL}
            tags={gallery[activeImgIdx].tags}
          />
        )}
        <Searchbar onSubmit={this.forSubmitHandler} />
        <ImageGallery
          handleModal={this.toggleModal}
          onNewFetch={this.newFetchHandler}
          onLoadMoreFetch={this.loadMoreFetchHandler}
          searchQuery={searchQuery}
          onClick={this.onClickHandler}
        />
        <ToastContainer theme={'colored'} autoClose={3000} />
      </div>
    );
  }
}

export default App;
