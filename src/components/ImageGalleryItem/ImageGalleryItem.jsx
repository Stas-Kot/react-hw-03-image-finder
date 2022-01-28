import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ webformatURL, tags, onClick }) {
  return (
    <li className={s.ImageGalleryItem} onClick={onClick}>
      <img src={webformatURL} alt={tags} />
    </li>
  );
}
