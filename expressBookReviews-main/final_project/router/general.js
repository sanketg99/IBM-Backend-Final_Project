const express = require('express');
let books = require("./booksdb.js");
const book = require('./booksdb.js');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;


  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const ISBN = req.params.isbn;
  
  res.send(books[ISBN])
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let ans = []
    for(const [key, values] of Object.entries(books)){
        const book = Object.entries(values);
        for(let i = 0; i < book.length ; i++){
            if(book[i][0] == 'author' && book[i][1] == req.params.author){
                ans.push(books[key]);
            }
        }
    }
    if(ans.length == 0){
        return res.status(404).json({message: "Author not found"});
    }
    res.send(ans);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let ans = []
  for(const [key, values] of Object.entries(books)){
      const book = Object.entries(values);
      for(let i = 0; i < book.length ; i++){
          if(book[i][0] == 'title' && book[i][1] == req.params.title){
              ans.push(books[key]);
          }
      }
  }
  if(ans.length == 0){
      return res.status(300).json({message: "Title not found"});
  }
  res.send(ans);
});



//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const ISBN = req.params.isbn;
  res.send(books[ISBN].reviews)
});

// // Task 10 to Task 13 are added here 


// // Task 10 
// // Add the code for getting the list of books available in the shop (done in Task 1) using Promise callbacks or async-await with Axios
// public_users.get('/', (req, res)=> {
//   try{
//     res.send(JSON.stringify(books, null, 4));
//   }
//   catch (error) {
//     res.send(error);
//   }
// });



// // Task 11
// // Add the code for getting the book details based on ISBN (done in Task 2) using Promise callbacks or async-await with Axios.

// // Get book details based on ISBN
// public_users.get('/isbn/:isbn', async (req, res) => {
//   const isbn = req.params.isbn;

//   try {
//     const book_ = books[isbn];
//     if (book_) {
//       res.send(JSON.stringify(book_, null, 4));
//     } else {
//       throw "Unable to find book!";
//     }
//   } catch (error) {
//     res.send(error);
//   }
// });

// // Task 12
// // Add the code for getting the book details based on Author (done in Task 3) using Promise callbacks or async-await with Axios.
// // Get book details based on author
// public_users.get('/author/:author', async (req, res) => {
//   const author = req.params.author;
//   let output = [];
//   try {
//     for (var isbn in books) {
//       let book_ = books[isbn];
//       if (book_.author === author) {
//         output.push(book_);
//       }
//     }
//     res.send(JSON.stringify(output, null, 4));
//   } catch (error) {
//     res.send(error);
//   }
// });




// // Task 13
// // Add the code for getting the book details based on Title (done in Task 4) using Promise callbacks or async-await with Axios.
// // Get all books based on title

// public_users.get('/title/:title', async (req, res) => {
//   const title = req.params.title;
//   let output = [];
//   try {
//     for (var isbn in books) {
//       let book_ = books[isbn];
//       if (book_.title === title) {
//         output.push(book_);
//       }
//     }
//     res.send(JSON.stringify(output, null, 4));
//   } catch (error) {
//     res.send(error);
//   }
// });



module.exports.general = public_users;
