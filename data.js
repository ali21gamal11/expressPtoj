const mongoose = require("mongoose");


const books = [
  {
    title: "Black Swan",
    author: new mongoose.Types.ObjectId("68ba75e15a3f72e090ea7bf7"),
    description: "About Black Swan",
    price: 10,
    cover: "soft cover",
  },
  {
    title: "Skin In The Game",
    author: new mongoose.Types.ObjectId("68ba75e15a3f72e090ea7bf7"),
    description: "About Skin In The Game",
    price: 12,
    cover: "soft cover",
  },
  {
    title: "Fooled By Randomness",
    author: new mongoose.Types.ObjectId("68ba75e15a3f72e090ea7bf7"),
    description: "About Fooled By Randomness",
    price: 8,
    cover: "hard cover",
  },
  {
    title: "The Forty Rules Of Loves",
    author: new mongoose.Types.ObjectId("68ba75e15a3f72e090ea7bf8"),
    description: "About The Forty Rules Of Loves",
    price: 14,
    cover: "soft cover",
  },
  {
    title: "The Island Of Missing Trees",
    author: new mongoose.Types.ObjectId("68ba75e15a3f72e090ea7bf8"),
    description: "About The Island Of Missing Trees",
    price: 9,
    cover: "soft cover",
  },
  {
    title: "The Flea Palace",
    author: "68ba75e15a3f72e090ea7bf8",
    description: "About The Flea Palace",
    price: 10,
    cover: "hard cover",
  },
];

const authors = [
  {
    firstName: "Robert",
    lastName: "Kiyosaki",
    nationality: "USA",
  },
  {
    firstName: "Paulo",
    lastName: "Coelho",
    nationality: "Brazil",
  },
  {
    firstName: "marco",
    lastName: "rossi",
    nationality: "Italian",
  },
  {
    firstName: "ALi",
    lastName: "Gamal",
    nationality: "Egyption",
  },
  {
    firstName: "Wayne",
    lastName: "Dyer",
    nationality: "USA",
  },
  {
    firstName: "Rolf",
    lastName: "Dobelli",
    nationality: "Switzerland",
  },
];



module.exports = {
  books,
  authors
};