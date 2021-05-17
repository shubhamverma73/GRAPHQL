import React, { useState } from 'react';
import { graphql } from '@apollo/react-hoc';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

function BookList(props) {

    const[bookId, setBookId] = useState()
    const onclickfunc = (id) => {
        setBookId(id);
    }

    const displayBooks = () => {
        var data = props.data;
        if(data.loading) {
            return (
                <div>
                    loading books ...
                </div>
            );
        } else {
            return data.books.map(book => {
                return (
                    <li key={book.id} onClick={() => onclickfunc(book.id)} >{book.name}</li>
                );
            })
        }
    }
    
    return (
        <div className="App">
            <ul id="book-list">
                {displayBooks()}
            </ul>
            <BookDetails bookId={bookId} />
        </div>
    );
}
  
export default graphql(getBooksQuery)(BookList);