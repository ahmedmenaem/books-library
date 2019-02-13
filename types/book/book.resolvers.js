const Book = require("./book.model");
const Author = require("../author/author.model");

// books resolver
const books = _ =>
  Book.find({})
    .lean()
    .exec();

// book resolver
const book = (_, args) =>
  Book.findById(args.id)
    .lean()
    .exec();

// newBook resolver
const newBook = (_, args) => Book.create({ ...args.input });

module.exports = {
  Query: {
    books,
    book
  },
  Mutation: {
    newBook
  },
  Book: {
    id: book => book._id,
    name: book => book.name,
    price: book => book.price,
    author: book =>
      Author.findById(book.author)
        .lean()
        .exec()
  }
};
