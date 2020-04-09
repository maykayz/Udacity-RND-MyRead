import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './book.js'
import './App.css'

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
        this.setState({books: res});
      })
    }

    searchBook = (e) => {
      let mybooks = this.state.books
      let myfilterbooks = []
      BooksAPI.search(e.target.value).then(res => {
        if(res.length){
          myfilterbooks = res
          myfilterbooks.map(book => {
            return mybooks.filter(mybook => {
              if(mybook.id === book.id){
                book.shelf = mybook.shelf
              }
              return mybooks.id === book.id
            })
          })
          this.setState({filteredBook: myfilterbooks});
        }
      })
    }

    handleChange = (e,changedBook) => {
      this.props.handleChange(e,changedBook)
    }

    render() {
      let filteredBook = this.state.filteredBook
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
