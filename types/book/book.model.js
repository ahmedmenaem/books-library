const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "author"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("book", bookSchema);
