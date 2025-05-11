import mongoose from "mongoose";
const ContactFormSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: [/\S+@\S+\.\S+/, "Email is invalid"],
    },
    phone: { type: String },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", ContactFormSchema);
export default Contact;
