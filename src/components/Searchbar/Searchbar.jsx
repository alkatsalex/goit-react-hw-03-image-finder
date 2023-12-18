import { Component } from 'react';
export default class Searchbar extends Component {
  state = {
    search: '',
  };

  hendleSearch = e => {
    this.setState({ search: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.search.trim() === '') {
      alert('ops');
      return;
    }
    this.props.onSubmit(this.state.search);
    this.setState({
      search: '',
    });
  };
  render() {
    const { search } = this.state;
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="button-label">🔎</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            value={search}
            placeholder="Search images and photos"
            onChange={this.hendleSearch}
          />
        </form>
      </header>
    );
  }
}
