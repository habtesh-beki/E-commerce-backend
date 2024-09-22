const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    // name: {
    //   type: String,
    //   required: [true, 'A product must have a name'],
    //   trim: true,
    // },
    // description: {
    //   type: String,
    //   required: [true, 'A product must have a description'],
    // },
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
    },
    // category: {
    //   type: String,
    //   required: [true, 'A product must have a category'],
    // },
    brand: {
      type: String,
      required: [true, 'A product must have a brand'],
    },
    // stock: {
    //   type: Number,
    //   required: [true, 'A product must have stock'],
    //   default: 0,
    // },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: [true, 'A product must have an image URL'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;