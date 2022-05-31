import { Schema } from 'mongoose';

const OrderSchema = new Schema(
    {
        userId:{
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
          },
        address: {
            type: new Schema(
              {
                postalCode: String,
                address1: String,
                address2: String,
              }
            ),
            required: true,
          },
        phoneNumber:{
            type: String,
            required: true,
          },
        order_data:{
            type: String,
            required: true,
        },
        price:{
            type:Number,
            required: true,
        },
        quantity:{
            type: Number,
            required: true,
        },
        request:{
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export { OrderSchema };

