import { Schema } from 'mongoose';

const OrderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    address: {
      type: new Schema({
        postalCode: String,
        address1: String,
        address2: String,
      }),
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    order_data: {
      type: Object,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    request: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'orders',
    timestamps: true,
  },
);

export { OrderSchema };
