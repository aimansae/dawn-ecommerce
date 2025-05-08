import mongoose from "mongoose";
const ShippingSchema = new mongoose.Schema(
  {
    method: { type: String, required: true },
    price: String,
  },
  { _id: false } // prevent Mongoose from creating a nested _id
);
const OrderSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    receiveEmails: Boolean,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    apartment: String,
    postalCode: String,
    city: String,
    shippingCountry: {
      country: String,
      currency: String,
      currencySymbol: String,
    },
    selectedShipping: {
      type: ShippingSchema,
      required: true,
    },
    selectedPaymentMethod: String,
    cart: [
      {
        id: String,
        name: String,
        price: Number,
        quantity: Number,
        color: String,
        image: [String],
        size: { type: String, required: false },
      },
    ],
    totalToPay: Number,
  },
  { timestamps: true }
);
delete mongoose.connection.models["Order"];

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default Order;
