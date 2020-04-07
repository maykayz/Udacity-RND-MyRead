import React, {Component} from 'react'
import '../App.css'
import PropTypes from 'prop-types'
import * as BooksAPI from '../BooksAPI'
import { Link,Route } from 'react-router-dom'
import Book from './book.jsx'

class Search extends Component {
  state = {
    books : [],
    filteredBook: []
  }
    componentDidMount() {
      BooksAPI.getAll().then(res => {
        this.setState((state) => ({
          books: res,
          filteredBook: res
        }));
        console.log(this.state.books)
      })
    }

    searchBook = (e) => {
      const keyword = e.target.value
      const filterBook = this.state.books.filter(book => book.title.includes(keyword) || book.authors.filter(author => author.includes(keyword)).length)
      this.setState((state) => ({
        filteredBook: filterBook
      }));
    }
    handleChange = (e,changedBook) => {
      console.log('handle change in bookshelf to'+e.target.value);
      this.props.handleChange(e,changedBook)
    }

  render() {
    return (
        <div className="search-books">
          <div className="search-books-bar">

               <Link to="/"><button className="close-search">Close</button></Link>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author" onChange={(e) => this.searchBook(e)}/>

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {
                  this.state.filteredBook.map((filteredBook,id) => (
                    <li>
                      <Book key={id} filteredBook={filteredBook} handleChange={(e,changedBook) => this.handleChange(e,changedBook)}></Book>
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
