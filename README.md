# BookStore App
This is a backend app built on Node.js/Express that stores books and book reviews. The app implements an authentication layer using JWT (JSONWebToken) to prevent unauthorised users from accessing certain endpoints.

Make HTTP requests to the BookStore to retrieve JSON data on the books it has.
## Setup
1. Clone the repo
2. `cd final_project`
3. `npm i`
4. `npm start` to start the server on port 5000

You can make requests to the server with utilities like cURL or Postman. 

## Endpoints - Public

### (GET)
 - `/`- Get information on all books in the bookstore.
 - `/isbn/:isbn` - Get information on a book by ISBN.
 - `/author/:author` - Get information on all books by an author.
 - `/title/:title` - Get information on all books with a particular title.
 - `/review/:isbn` - Get the reviews for a book, specified by ISBN.
### (POST)
 - `/register` - Add yourself as a registered user, a `username` and `password` must be provided in the request body
 
 ## Endpoints - Private
 You need to make a user before using these endpoints.
 
 ### (POST)
  - `customer/login` - Send your `username` and `password` in the request body to get an authorised session token to access `customer/auth/*` endpoints.
 ### (PUT)
 - `customer/auth/review/:isbn` - Add or replace your review for a particular book. You can't change another user's review. Send your review in the request body.
 ### (DELETE)
 - `customer/auth/review/:isbn` - Delete a review you have added for a book.
