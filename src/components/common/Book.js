import React, { Component } from 'react';

class Book extends Component {
    
    handleShelfChange = (e) => {
        const { book, onBookUpdate } = this.props
        onBookUpdate(book, e.target.value);
    }

    render() {
        const { title, authors, shelf, imageLinks } = this.props.book

        return (
            <li>
                <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${imageLinks.smallThumbnail})` }}></div>
                    <div className="book-shelf-changer">
                    <select value={shelf} onChange={this.handleShelfChange}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors}</div>
                </div>
            </li>
        )
    }
}

export default Book