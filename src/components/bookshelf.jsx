import React, {Component} from 'react'
import '../App.css'
import PropTypes from 'prop-types'
import Book from './book.jsx'

class BookShelf extends Component{

  handleChange = (e,changedBook) => {
    console.log('handle change in bookshelf to'+e.target.value);
    this.props.handleChange(e,changedBook)
  }

  render(){
    const booklist = this.props.booklist

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              booklist.map((filteredBook,id) => (
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

Book.propTypes = {
  title: PropTypes.string,
  booklist: PropTypes.array,
};

export default BookShelf
