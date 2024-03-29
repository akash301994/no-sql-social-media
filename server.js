

const express = require('express');
const { connectDB } = require('./config/database');
const routes = require('./routes');

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
});

connectDB();