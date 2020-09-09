import mongoose from "mongoose";

const { ObjectId, String } = mongoose.Schema.Types;

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
   user: {
      type: ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
