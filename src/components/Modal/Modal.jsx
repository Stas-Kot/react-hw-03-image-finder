import { Component } from 'react';
import { createPortal } from 'react-dom';
import { IoCloseOutline } from 'react-icons/io5';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.handleModal();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.handleModal();
    }
  };

  render() {
    const { largeImageURL, handleModal, tags } = this.props;
    return createPortal(
      <div className={s.overlay} onClick={this.handleBackdropClick}>
        <div className={s.modal}>
          <img src={largeImageURL} alt={tags} />
          <button type="button" className={s.iconBtn} onClick={handleModal}>
            <IoCloseOutline />
          </button>
        </div>
      </div>,
      modalRoot,
    );
  }
}
