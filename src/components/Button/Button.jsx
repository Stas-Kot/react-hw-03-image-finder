import s from './Button.module.css';
export default function Button({ onClick }) {
  return (
    <button type="button" className={s.button} onClick={onClick}>
      Load more
    </button>
  );
}
