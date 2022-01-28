import { Component } from 'react';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  inputHandler = e => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      return toast.error('Enter the search word!');
    }
    this.props.onSubmit(this.state.searchQuery);
    this.reset();
  };

  reset = () => {
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s['searchForm-button']}>
            <span className={s['searchForm-button-label']}>Search</span>
          </button>

          <input
            className={s['searchForm-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.inputHandler}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
