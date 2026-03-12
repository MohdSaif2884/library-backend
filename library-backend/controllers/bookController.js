const Book = require("../models/Book");

const addBook = async (req, res, next) => {
  try {
    const {
      title,
      author,
      isbn,
      genre,
      publisher,
      publicationYear,
      totalCopies,
      availableCopies,
      shelfLocation,
      bookType,
      status,
    } = req.body;

    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      return res.status(400).json({
        success: false,
        message: `A book with ISBN "${isbn}" already exists`,
      });
    }

    const book = await Book.create({
      title,
      author,
      isbn,
      genre,
      publisher,
      publicationYear,
      totalCopies,
      availableCopies,
      shelfLocation,
      bookType,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

const getAllBooks = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      genre,
      bookType,
      status,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const filter = {};
    if (genre) filter.genre = { $regex: genre, $options: "i" };
    if (bookType) filter.bookType = bookType;
    if (status) filter.status = status;

    const sortOrder = order === "asc" ? 1 : -1;
    const skip = (Number(page) - 1) * Number(limit);

    const [books, total] = await Promise.all([
      Book.find(filter)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(Number(limit)),
      Book.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      count: books.length,
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: `Book with ID "${req.params.id}" not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  try {
    delete req.body.bookId;

    if (req.body.isbn) {
      const duplicate = await Book.findOne({
        isbn: req.body.isbn,
        _id: { $ne: req.params.id },
      });
      if (duplicate) {
        return res.status(400).json({
          success: false,
          message: `Another book with ISBN "${req.body.isbn}" already exists`,
        });
      }
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        message: `Book with ID "${req.params.id}" not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: `Book with ID "${req.params.id}" not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: { id: req.params.id, title: book.title },
    });
  } catch (error) {
    next(error);
  }
};

const searchBooks = async (req, res, next) => {
  try {
    const { title, author, page = 1, limit = 10 } = req.query;

    if (!title && !author) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one search parameter: title or author",
      });
    }

    const filter = {};
    if (title) filter.title = { $regex: title, $options: "i" };
    if (author) filter.author = { $regex: author, $options: "i" };

    const skip = (Number(page) - 1) * Number(limit);

    const [books, total] = await Promise.all([
      Book.find(filter)
        .sort({ title: 1 })
        .skip(skip)
        .limit(Number(limit)),
      Book.countDocuments(filter),
    ]);

    if (books.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No books found matching your search criteria",
      });
    }

    res.status(200).json({
      success: true,
      message: "Search results retrieved successfully",
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      count: books.length,
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks,
};
