import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar.jsx';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import Modal from './Modal/Modal.jsx';

export class App extends Component {
  state = {
    searchTag: '',
    isOpen: false,
    modalImg: '',
  };

  hendleFormSubmit = tag => {
    this.setState({
      searchTag: tag,
    });
  };

  handleImageClick = imageUrl => {
    this.setState({ modalImg: imageUrl, isOpen: true });
  };

  handleCloseModal = e => {
    this.setState({ isOpen: false, modalImg: '' });
  };

  render() {
    const { isOpen, searchTag, caunter, modalImg } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.hendleFormSubmit} />
        {
          <ImageGallery
            searchTag={searchTag}
            page={caunter}
            onClick={this.handleImageClick}
            loader={this.handleLoader}
          />
        }
        {isOpen && <Modal url={modalImg} onClose={this.handleCloseModal} />}
      </div>
    );
  }
}
