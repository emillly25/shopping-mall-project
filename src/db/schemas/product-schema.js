const { Schema } = require("mongoose");

const ProductSchema = new Schema(
  {
    categoryName: {
      type: String,
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
    information: {
      type: String,
      required: null,
    },
    author: {
      type: String,
      default: null,
    },
    publisher: {
      type: String,
      default: null,
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
  }
);

export { ProductSchema };
