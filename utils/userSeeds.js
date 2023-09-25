const mongoose = require("mongoose");
const User = require("../models/user");

mongoose
  .connect("mongodb://localhost:27017/no-sql-database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const sampleUsers = [
  {
    username: "AliciaKeys",
    email: "alicia.keys@example.com",
  },
  {
    username: "BobbyBrown",
    email: "bobby.brown@example.com",
  },
  {
    username: "CharliePuth",
    email: "charlie.puth@example.com",
  },
  {
    username: "DavidBowie",
    email: "david.bowie@example.com",
  },
];


User.insertMany(sampleUsers)
  .then((data) => {
    console.log("Data inserted!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error inserting data: ", err);
    mongoose.connection.close();
  });
