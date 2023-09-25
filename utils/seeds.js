const mongoose = require("mongoose");
const Thought = require("../models/thought");
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

const sampleThoughts = [
  {
    thoughtText: "This is my first thought!",
    username: "AliciaKeys",
    reactions: [
      {
        reactionBody: "Great thought!",
        username: "bob",
      },
    ],
  },
  {
    thoughtText: "Another day, another thought.",
    username: "BobbyBrown",
    reactions: [
      {
        reactionBody: "Totally agree.",
        username: "dave",
      },
      {
        reactionBody: "Well said.",
        username: "eve",
      },
    ],
  },
];

const dataSeeding = async () => {
  try { 
    await User.deleteMany();
    await Thought.deleteMany();
    const users = await User.insertMany(sampleUsers);
    console.log(users);
    const thoughts = await Thought.insertMany(sampleThoughts);
    await User.findByIdAndUpdate(
        users[0]._id,
        {$addToSet: {thoughts: thoughts[0]._id}},
        {new: true}
    )
    await User.findByIdAndUpdate(
        users[1]._id,
        {$addToSet: {thoughts: thoughts[1]._id}},
        {new: true}
    )
    console.log('seeding complete')
    mongoose.connection.close();
  } catch (err) {
    console.error("Error inserting data: ", err);
    mongoose.connection.close();
  }
};

dataSeeding();