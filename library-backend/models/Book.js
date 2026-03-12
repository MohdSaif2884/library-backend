const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      trim: true,
    },
    publisher: {
      type: String,
      required: [true, "Publisher is required"],
      trim: true,
    },
    publicationYear: {
      type: Number,
      min: [1000, "Publication year must be a valid year"],
      max: [new Date().getFullYear(), "Publication year cannot be in the future"],
    },
    totalCopies: {
      type: Number,
      required: [true, "Total copies is required"],
      min: [1, "Total copies must be at least 1"],
    },
    availableCopies: {
      type: Number,
      min: [0, "Available copies cannot be negative"],
    },
    shelfLocation: {
      type: String,
      trim: true,
    },
    bookType: {
      type: String,
      enum: {
        values: ["Reference", "Circulating"],
        message: "Book type must be either Reference or Circulating",
      },
      default: "Circulating",
    },
    status: {
      type: String,
      enum: {
        values: ["Available", "Unavailable", "Reserved", "Damaged"],
        message: "Status must be Available, Unavailable, Reserved, or Damaged",
      },
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate bookId before saving
bookSchema.pre("save", async function (next) {
  if (!this.bookId) {
    const count = await mongoose.model("Book").countDocuments();
    this.bookId = `LIB-${String(count + 1).padStart(5, "0")}`;
  }

  // Default availableCopies to totalCopies if not provided
  if (this.availableCopies === undefined || this.availableCopies === null) {
    this.availableCopies = this.totalCopies;
  }

  next();
});

// Index for faster search queries
bookSchema.index({ title: "text", author: "text" });

module.exports = mongoose.model("Book", bookSchema);
