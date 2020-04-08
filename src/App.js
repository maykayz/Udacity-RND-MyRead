import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link,Route } from 'react-router-dom'
import BookShelf from './bookshelf.jsx'
import Search from './search.jsx'


class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage: false,
    shelves: [
        {
          title: 'Currently Reading',
          keyword: 'currentlyReading'
        },
        {
          title: 'Want To Read',
          keyword: 'wantToRead'
        },
        {
          title: 'Read',
          keyword: 'read'
        },
      ]
    }
    componentDidMount() {
      BooksAPI.getAll().then(res => {
        this.setState((state) => ({
          books: res
        }));
      })
    }

    handleChange = (e,changedBook) => {
      var allbooks = this.state.books
      allbooks.filter(book => book.id === changedBook.id).map(filteredBook =>() => {
        filteredBook.shelf = changedBook.shelf
      })
      this.setState((state) => ({
        books: allbooks
      }));
    }
    refetchData = (e) => {
      BooksAPI.getAll().then(res => {
        this.setState((state) => ({
          books: res
        }));
      })
    }

  render() {
    return (
      <div className="app">
        <Route path="/search" exact render={() => (
          <Search handleChange={(e,changedBook) => this.handleChange(e,changedBook)} refetchData={(e) => this.refetchData(e)}>
          </Search>
        )}/>
        <Route path="/" exact
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                {
                  this.state.shelves.map(shelf => (
                    <BookShelf key={shelf.keyword} handleChange={(e,changedBook) => this.handleChange(e,changedBook)} title={shelf.title} booklist={this.state.books.filter((book) => book.shelf=== shelf.keyword)}></BookShelf>
                  ))
                }
                </div>
              </div>
              <div className="open-search">
                <Link to="/search"><button>Search A Book</button></Link>
              </div>
            </div>
          )}
        />
      </div>
    )
  }
}

export default BooksApp
