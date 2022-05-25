const { Schema } = require("mongoose");
const category = require("./category-schema");

const ProductSchema = new Schema(
  {
    category,
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
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = ProductSchema;
