const { Schema } = require('mongoose');

const ProductSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imgUrl: {
      type: String,
      default: null,
    },
    information: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: null,
    },
    publisher: {
      type: String,
      required: true,
    },
    publishedDate: {
      type: String,
      default: null,
    },
    orderCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export { ProductSchema };
