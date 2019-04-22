const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server');
const uuid = require('uuid');
const mongoose = require('mongoose');
const Book = require('./models/Book');
const Author = require('./models/Author');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const pubsub = new PubSub();

mongoose.set('useFindAndModify', false);

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((e) => {
        console.error('error connection to MongoDB:', e.message);
    })

/*
let authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]*/

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/
/*
let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'The Demon ',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]*/

const typeDefs = gql`
    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
    }

    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int
            genres: [String]
        ): Book
        editAuthor(name: String! setBornTo: Int!): Author
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
    }

    type Query {
        bookCount: Int
        authorCount: Int
        allBooks(author: String genre: String): [Book]
        allAuthors: [Author]
        me: User
        favoriteBooks: [Book!]!
    }

    type Subscription {
        bookAdded: Book!
    }
`

const resolvers = {
    Mutation: {
        addBook: async (root, args, context) => {
            try {
                if (!context.currentUser) {
                    throw new AuthenticationError("nto authenticated")
                }
                if (!Author.find({name: args.name})) {
                    newAuthor = new Author({ name: args.name, id: uuid() });
                    newAuthor.save();
                }

                const author = Author.find({name: args.name});
                const book = new Book({...args, author});
                await book.save();
                pubsub.publish('BOOK_ADDED', {bookAdded: book})
                return book;
            } catch (error) {
                throw new UserInputError(error.message, {invalidArgs: args});
            }
            
        },
        editAuthor: (root, args, context) => {
            if (!context.currentUser) {
                throw new AuthenticationError("nto authenticated")
            }
            try {
                for (var a in authors) {
                    if (authors[a].name === args.name) {
                        authors[a].born = args.setBornTo;
                        return Author.findByIdAndUpdate(Author.find({name: authors[ə].name}), {name: authors[a].name, born: authors[a].born}) ;
                    }
                }
            } catch (error) {
                throw new UserInputError(error.message, {invalidArgs: args});
            }
            
            return null;
        },
        createUser: (root, args) => {
            const user = new User({username: args.username});
            return user.save()
                .catch(e => {
                    throw new UserInputError(e.message, {invalidArgs: args});
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({username: args.username});
            if (!user || args.password !== 'secred') {
                throw new UserInputError("wrong credentials");
            }
            const userForToken = {
                username: user.username,
                id: user._id
            }
            return {value: jwt.sign(userForToken, JWT_SECRET)};
        }
    },
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: (root, args) => Book.find({genre: {$in: [args.genre]}}),
        allAuthors: () => Author.find({}),
        me: (root, args, context) => context.currentUser,
        favoriteBooks: (root, args, context) => {
            const favoriteGenres = context.currentUser.favoriteGenres;
            const books = Book.find({});
            const favoriteBooks = books.filter(b => favoriteGenres.map(g => b.genres.includes(g)));
            return favoriteBooks;
        }
    },
    Author: {
        bookCount: (root, args) => Book.collection.countDocuments()/*.filter(b => b.author === root.name).length*/
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`);
    console.log(`Subscriptions ready at ${subscriptionsUrl}`);
})