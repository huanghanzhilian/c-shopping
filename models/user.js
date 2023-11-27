import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  mobile: { type: Number },
  role: { type: String, default: "user" },
  root: { type: Boolean, default: false },
  avatar:{ type:String, default:'/images/person.svg' }
});

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
