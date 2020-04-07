import React, {Component} from 'react'
import '../App.css'
import PropTypes from 'prop-types'
import {update} from '../BooksAPI.js'
import { Link,Route } from 'react-router-dom'

class Book extends Component {
  state = {
    // bookState = ''
  }
  handleChange = (e) => {
    console.log(e.target.value)
    const state = e.target.value
    this.props.filteredBook.shelf = e.target.value
    this.props.handleChange(e,this.props.filteredBook)
    update(this.props.filteredBook, state)
  }

  render() {
    const book = this.props.filteredBook

    return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book ? book.imageLinks.smallThumbnail : ''})` }}></div>
            <div className="book-shelf-changer">
              <select onChange={this.handleChange} value={book.shelf}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book ? book.title : ''}</div>
          <div className="book-authors">{book ? book.authors : ''}</div>
        </div>
    )
  }
}

Book.propTypes = {
  filteredBook: PropTypes.object
};

export default Book
