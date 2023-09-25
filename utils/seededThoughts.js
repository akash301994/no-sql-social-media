const mongoose = require('mongoose');
const Thought = require('../models/thought');


mongoose.connect('mongodb://localhost:27017/no-sql-database', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const sampleThoughts = [
    {
        thoughtText: "This is my first thought!",
        username: "AliciaKeys",
        reactions: [
            {
                reactionBody: "Great thought!",
                username: "bob"
            }
        ]
    },
    {
        thoughtText: "Another day, another thought.",
        username: "BobbyBrown",
        reactions: [
            {
                reactionBody: "Totally agree.",
                username: "dave"
            },
            {
                reactionBody: "Well said.",
                username: "eve"
            }
        ]
    }
];


Thought.insertMany(sampleThoughts)
    .then(data => {
        console.log("Data inserted!");
        mongoose.connection.close();
    })
    .catch(err => {
        console.error("Error inserting data: ", err);
        mongoose.connection.close();
    });