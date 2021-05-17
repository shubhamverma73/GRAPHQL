import React, { useState } from 'react';
import { graphql } from '@apollo/react-hoc';
//import {flowRight as compose} from 'lodash';
import compose from 'lodash/fp/compose'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

function AddBook(props) {

    const[book, setBook] = useState({
        name: "",
        genre: "",
        authorId: ""
    });

    const { name, genre, authorId } = book;

    const inputChange = (event) => {
        setBook({ ...book, [event.target.name]: event.target.value });
    };

    const displayAuthors = () => {
        var data = props.getAuthorsQuery;
        if(data.loading) {
            return (
                <option>Loading Authors</option>
            );
        } else {
            return data.authors.map(author => {
                return (
                    <option key={author.id} value={author.id}>{author.name}</option>
                );
            })
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        props.addBookMutation({
            variables: {
                name: name,
                genre: genre,
                authorId: authorId
            },
            refetchQueries: [{ query: getBooksQuery }] //Refresh fetch query list to show updated data after insert new record
        });
    }

    return (
        <div className="App">
            <form id="add-book" onSubmit={onSubmit}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" name="name"  onChange={inputChange} />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" name="genre" onChange={inputChange} />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select name="authorId" onChange={inputChange} >
                        <option>Select author</option>
                        { displayAuthors() }
                    </select>
                </div>
                <button>+</button>

            </form>
        
        </div>
    );
}

//export default graphql(getAuthorsQuery)(AddBook);

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);