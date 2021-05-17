const graphql   = require('graphql');
var _           = require('lodash');
const Book      = require('../models/book');
const Author    = require('../models/author');

const { 
        GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList,
        GraphQLNonNull //Make fields Mandatory
    } = graphql;

// =============================== Dummy Data ===========================
/*const books = [
    { id: "1", name: 'Champak', genre: 'Story', authorId: "1" },
    { id: "2", name: 'Pratiyogita Darpan', genre: 'Current Affair', authorId: "2" },
    { id: "3", name: 'Vigyan Pragati', genre: 'Sci-Fi', authorId: "3" },
    { id: "4", name: 'Nagraj', genre: 'Comics', authorId: "4" },
    { id: "5", name: 'The Caravan', genre: 'Story', authorId: "1" },
    { id: "6", name: 'Emerging Trends in Agri-Nanotechnology', genre: 'Current Affair', authorId: "2" },
    { id: "7", name: 'The Real Estate (Regulation And Development)', genre: 'Current Affair', authorId: "2" },
]

const authors = [
    { id: "1", name: 'Delhi Press Group', address: 'New Delhi', pincode: 110059 },
    { id: "2", name: 'Shri Mahendra Jain', address: 'Agra', pincode: 223007 },
    { id: "3", name: 'NISCAIR', address: 'New Delhi', pincode: 110059 },
    { id: "4", name: 'Rajkumar Gupta', address: 'New Delhi', pincode: 110059 },
]*/

// =============================== Creating Schema ===================================
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { 
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        genre: { 
            type: GraphQLString 
        },
        author: { //Like join
            type: AuthorType,
            resolve(parent, args) {
                //return _.find(authors, {id: parent.authorId});
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { 
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        address: { 
            type: GraphQLString 
        },
        pincode: { 
            type: GraphQLInt 
        },
        books: { //Get all books associated with Author, this is called Two Way Relationship
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                //return _.filter(books, {authorId: parent.id});
                return Book.find({authorId: parent.id});
            }
        }
    })
});

//================== Creating Query Structure for get Data from Db =================
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                //Code to get the data from DB or any other source.
               //return  _.find(books, {id: args.id})
               return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                //Code to get the data from DB or any other source.
               //return  _.find(authors, {id: args.id})
               return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                //return books;
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                //return authors;
                return Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addBook: {
            type: BookType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                genre: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                authorId: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent, args) {
                let book = new Book({ //Model Name that was exported on above
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        },
        addAuthor: {
            type: AuthorType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                address: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                pincode: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve(parent, args) {
                let author = new Author({ //Model Name that was exported on above
                    name: args.name,
                    address: args.address,
                    pincode: args.pincode
                });
                return author.save();
            }
        }
    }

})

// ========================== Export modules ==============================
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});


/*
======================= Run in browser For Fetch Data ======================
{
    books {
        name
      	author {
          name
        }
    }
}

{
  book(id: 1) {
    id
    name
    genre
  }
}

{
  book(id: 1) {
    id
    name
    genre
    author { //Like join
      id
      name
      address
      pincode
    }
  }
}

=============================== Author =================================

{
    authors {
        name
      	books {
          name
        }
    }
}
{
    author(id: 1) {
        id
        name
        address
        pincode
    }
}
{
    author(id: 1) {
        id
        name
        address
        pincode
        books {
            id
            name
            genre
        }
    }
}
======================= Run in browser For Fetch Data ======================
*/

/*
======================= Run in browser For Insert Data ======================
mutation {
    addBook (
      name: "Champak",
      genre: "Story",
      authorId: "1"
    ) {
        name //Return response fields after insert data
        genre
      }
}

=============================== Author =================================
mutation {
    addAuthor (
      name: "Rajkumar Gupta",
      address: "New Delhi",
      pincode: 110059
    ) {
        name //Return response fields after insert data
        address
        pincode
      }
}
======================= Run in browser For Insert Data ======================
*/