const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require("axios");
axios.defaults.baseURL = "http://localhost:5000";

public_users.post("/register", (req,res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(422).send("Username or password not provided");
    if (!isValid(username)) return res.status(400).send("There is already a user with that username");

    const user = { username, password };
    users.push(user); // add user to DB
    return res.status(201).send(user.username);
});

// Get the book list available in the shop
public_users.get("/",function (req, res) {
    return res.status(200).send(JSON.stringify(books, null, 2));
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn",function (req, res) {
    const isbn = req.params.isbn;
    return res.status(200).send(books[isbn]);
 });
  
// Get book details based on author
public_users.get("/author/:author",function (req, res) {
    const author = req.params.author;
    const filtered_books = [];
    Object.entries(books).forEach(([isbn, details]) => {
        if (details.author === author) {
            details.isbn = isbn;
            filtered_books.push(details);
        }
    });
    return res.status(200).send(filtered_books);
});

// Get all books based on title
public_users.get("/title/:title",function (req, res) {
    const title = req.params.title;
    const filtered_books = [];
    Object.entries(books).forEach(([isbn, details]) => {
        if (details.title === title) {
            details.isbn = isbn;
            filtered_books.push(details);
        }
    });
    return res.status(200).send(filtered_books);
});

//  Get book review
public_users.get("/review/:isbn",function (req, res) {
    const isbn = req.params.isbn;
    return res.status(200).send(books[isbn].reviews);
});

const getBooks = () => {
    axios.get("/")
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    });
}

const getBookByISBN = async (isbn) => {
    try {
        const book = (await axios.get(`/isbn/${isbn}`)).data;
        console.log(book);
    } catch (error) {
        console.log(error);
    }
}

const getBooksByAuthor = async (author) => {
    try {
        const books = (await axios.get(`/author/${author}`)).data;
        console.log(books);
    } catch (error) {
        console.log(error);
    }
}

const getBooksByTitle = async (title) => {
    try {
        const books = (await axios.get(`/title/${title}`)).data;
        console.log(books);
    } catch (error) {
        console.log(error);
    }
}
module.exports.functions = {getBookByISBN, getBooks, getBooksByAuthor, getBooksByTitle};
module.exports.general = public_users;
