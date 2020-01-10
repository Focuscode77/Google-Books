import React, { Component } from 'react';
import SearchArea from './SearchArea';
import request from 'superagent';
import BookList from './BookList';

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchField: ''
    };
  }

  searchBook = e => {
    e.preventDefault();

    request
      .get('https://www.googleapis.com/books/v1/volumes?q=javascript')
      .query({ q: this.searchField })
      .then(data => {
        this.setState({ books: [...data.body.items] });
      })
      .catch(err => {
        console.log('caught', err.message);
      });
  };

  handleSearch = e => {
    this.setState({ searchField: e.target.value });
  };

  render() {
    return (
      <div>
        <SearchArea
          searchBook={this.searchBook}
          handleSearch={this.handleSearch}
        />
        <BookList books={this.state.books} />
      </div>
    );
  }
}

export default Books;
