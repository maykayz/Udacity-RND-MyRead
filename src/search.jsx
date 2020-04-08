import React, {Component} from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import Book from './book.jsx'


const location = {
  pathname: '/',
  state: { fromDashboard: true }
}

class Search extends Component {

    state = {
      books : [],
      filteredBook: []
    }

    componentDidMount() {
      BooksAPI.getAll().then(res => {
        this.setState((state) => ({
          books: res
        }));
      })
    }

    searchBook = (e) => {
      BooksAPI.search(e.target.value).then(res => {
        this.setState((state) => ({
          filteredBook: res
        }));
      })
    }

    handleChange = (e,changedBook) => {
      this.props.handleChange(e,changedBook)
    }

    render() {
      var filteredBook = this.state.filteredBook
      return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to={location} onClick={(e) => this.props.refetchData(e)}><button className="close-search">Close</button></Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={(e) => this.searchBook(e)}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {
                  filteredBook && filteredBook.length > 0 &&
                    filteredBook.map((book,index) => (
                      <li key={index}>
                        <Book filteredBook={book} handleChange={(e,changedBook) => this.handleChange(e,changedBook)}></Book>
                      </li>
                    ))
                }
              </ol>
            </div>
          </div>
      )
    }
}


export default Search
