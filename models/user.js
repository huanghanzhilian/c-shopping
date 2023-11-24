import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  root: { type: Boolean, default: false },
  avatar:{ type:String, default:'/person.png' }
});

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
