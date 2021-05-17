import { gql } from 'apollo-boost';

const getBooksQuery = gql`
{
    books {
        id
        name
    }
}
`

const getAuthorsQuery = gql`
{
    authors {
        id
        name
    }
}
`

const addBookMutation = gql`
    mutation AddBook($name: String!, $genre: String!, $authorId: ID!){
        addBook (name: $name, genre: $genre, authorId: $authorId) {
            name
            id
        }
    }
`

const getBookQuery = gql`
    query GetBook($id: ID){
        book(id: $id) {
            id
            name
            genre
            author {
                id
                name
                address
                pincode
                books {
                    name
                    id
                }
            }
        }
    }
`;

export { getBooksQuery, getAuthorsQuery, addBookMutation, getBookQuery };