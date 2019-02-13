const Author = require("./author.model");
const Book = require("../book/book.model");

// authors resolver
const authors = _ =>
  Author.find({})
    .lean()
    .exec();

// author reolsver
const author = (_, args) =>
  Author.findById(args.id)
    .lean()
    .exec();

// newAuthor resolver
const newAuthor = (_, args) => {
  return Author.create({ ...args.input });
};

module.exports = {
  Query: {
    authors,
    author
  },
  Mutation: {
    newAuthor
  },
  Author: {
    id: author => author._id,
    name: author => author.name,
    books: author =>
      Book.find({ author: author._id })
        .lean()
        .exec()
  }
};
