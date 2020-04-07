import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './components/bookshelf.jsx'
import { Link,Route } from 'react-router-dom'
import Search from './components/search.jsx'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll().then(res => {

      this.setState((state) => ({
        books: res
      }));
      console.log(this.state.books)
    })
  }

    handleChange = (e,changedBook) => {
      console.log('handle change in App to'+changedBook.id);
      var allbooks = this.state.books
      allbooks.filter(book => book.id == changedBook.id).map(filteredBook => {
        filteredBook.shelf = changedBook.shelf
      })
      this.setState((state) => ({
        books: allbooks
      }));
    }

  render() {
    return (
      <div className="app">

      <Route path="/search" exact render={() => (
        <Search handleChange={(e,changedBook) => this.handleChange(e,changedBook)}>
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
                <BookShelf handleChange={(e,changedBook) => this.handleChange(e,changedBook)} title="Currently Reading" booklist={this.state.books.filter((book) => book.shelf=="currentlyReading")}></BookShelf>
                <BookShelf handleChange={(e,changedBook) => this.handleChange(e,changedBook)} title="Want To Read" booklist={this.state.books.filter((book) => book.shelf=="wantToRead")}></BookShelf>
                <BookShelf handleChange={(e,changedBook) => this.handleChange(e,changedBook)} title="Read" booklist={this.state.books.filter((book) => book.shelf=="read")}></BookShelf>
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
