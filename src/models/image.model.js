const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    contentType: {
      type: String,
      required: true,
      enum: ["image/jpeg", "image/png", "image/gif", "image/webp"]
    },
    data: {
      type: Buffer,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", imageSchema);
