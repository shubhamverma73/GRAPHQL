import React from 'react';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/client/react';

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql'
});

function App() {
  	return (
		<ApolloProvider client={client}>
			<div className="main">
				<h1>Book List</h1>
				<BookList />
				<AddBook />
			</div>
		</ApolloProvider>
  	);
}

export default App;