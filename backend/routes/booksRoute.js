import express from 'express';
import { Book } from '../models/bookModel.js';

const Router = express.Router();

// Route for Save a new book

Router.post('/', async (request, response) => {
  try {
    if (!request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).json({ error: "All fields are required" });

    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    const book = await Book.create(newBook);
    return response.status(201).json(book);
  }
  catch (error) {
    console.error("Error creating book:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
});

// Route for getting all books
// Router.get('/', async (request, response) => {

//   try {
//     const books = await Book.find({});
//     return response.status(200).json({
//       count: books.length,
//       data: books
//     });

//   }
//   catch (error) {
//     console.error("Error fetching books:", error);
//     return response.status(500).json({ error: "Internal server errors" });
//   }
// });

// // Route for getting a single book by ID
// Router.get('/:id', async (request, response) => {
//   try {
//     const { id } = request.params;
//     const books = await Book.findById(id);
//     return response.status(200).json({
//       count: books.length,
//       data: books
//     });

//   }
//   catch (error) {
//     console.error("Error fetching books:", error);
//     return response.status(500).json({ error: "Internal server error" });
//   }
// });

Router.get('/', async (request, response) => {
  try{
    const bookAll = await Book.find({});
    return response.status(200).json({
      count: bookAll.length,
      data: bookAll
    });
  }catch(error){
    console.error("Error is ", error);
    return response.status(500).json({error: "Internal server error"});
  }
});
// Route for updating a book
Router.put('/:id', async (request, response) => {
  try {
    if (!request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).json({ error: "All fields are required" });

    }
    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body)

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }
    return response.status(200).json({
      message: "Book updated successfully",
      data: result
    });

  }
  catch (error) {
    console.error("Error creating book:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
});

// Route for deleting a book
Router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id)
    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }
    return response.status(200).json({
      message: "Book deleted successfully",
      data: result
    });

  }
  catch (error) {
    console.error("Error creating book:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
});

export default Router;