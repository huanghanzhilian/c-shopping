import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Categories = mongoose.models.categories || mongoose.model("categories", CategoriesSchema);

export default Categories;
