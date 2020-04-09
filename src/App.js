import React from 'react'
import { Link,Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './bookshelf.js'
import Search from './search.js'
import './App.css'

const shelves = [
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

class BooksApp extends React.Component {
  state = {
    books: []
    }
    componentDidMount() {
      BooksAPI.getAll().then(res => {
        this.setState({books: res});
      })
    }

    handleChange = (e,changedBook) => {
      let allbooks = this.state.books
      allbooks.filter(book => book.id === changedBook.id).map(filteredBook =>
        filteredBook.shelf = changedBook.shelf
      )
      this.setState({books: allbooks});
    }
    refetchData = (e) => {
      BooksAPI.getAll().then(res => {
        this.setState({books: res});
      })
    }

  render() {
    return (
      <div className="app">
        <Route path="/search" exact render={() => (
            <Search
              handleChange={(e,changedBook) => this.handleChange(e,changedBook)}
              refetchData={(e) => this.refetchData(e)}
            />
          )}
        />
        <Route path="/" exact
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                {
                  shelves.map(shelf => (
                    <BookShelf
                      key={shelf.keyword}
                      handleChange={(e,changedBook) => this.handleChange(e,changedBook)}
                      title={shelf.title}
                      booklist={this.state.books.filter((book) => book.shelf=== shelf.keyword)}
                    />
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
