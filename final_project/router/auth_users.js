const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    for (const user of users) {
        if (username === user.username) return false;
    }
    return true;
}

const authenticatedUser = (username,password)=>{ //returns boolean
    //check if username and password match the one we have in records.
    for (const user of users) {
        if (user.username === username && user.password === password) return true;
    }
    return false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const { username, password } = req.body;

    if (!username || !password) return res.status(422).send("username or password not provided");

    if (!authenticatedUser(username, password)) {
        return res.status(403).send("Incorrect username or password");
    }
    const accessToken = jwt.sign({ data: password }, "access", { expiresIn: 60 * 60 });

    req.session.authorization = { accessToken, username };
    return res.status(200).send("User logged in");
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.body.review;
    const username = req.session.authorization.username;

    if (!books[isbn]) return res.status(404).send("Book not found");

    books[isbn].reviews[username] = review;
    return res.status(200).send(books[isbn]);
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.authorization.username;

    if (!books[isbn]) return res.status(404).send("Book not found");
    if (!books[isbn].reviews[username]) {
        return res.status(200).send("no review to delete");
    }
    delete books[isbn].reviews[username];
    return res.status(200).send("successfully deleted review");
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
