const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const router = express.Router();

const Book = require("../models/Book");

// CREATE - POST /
router.post("/", async (req, res) => {
    try {
        const newBook = await Book.create(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ ALL - GET /
router.get("/", async (req, res) => {
    try {
        const books = await Book.find({});
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ ONE - GET /:id
router.get("/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE - PUT /:id
router.put("/:id", async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE - DELETE /:id
router.delete("/:id", async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);

        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;