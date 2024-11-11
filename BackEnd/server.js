// Import the express framework
const express = require('express');
// Create an instance of an Express application
const app = express();
// Set the port number for the server to listen on
const port = 4000;

// Import the cors middleware to allow Cross-Origin Resource Sharing
const cors = require('cors');
// Use the cors middleware for the app
app.use(cors());

// Middleware function to set CORS headers for all incoming requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow specific HTTP methods
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // Allow specific headers
  next(); // Move to the next middleware or route handler
});

// Import the body-parser middleware to parse incoming request bodies
const bodyParser = require('body-parser');
// Configure body-parser to parse URL-encoded data and JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import mongoose to interact with MongoDB
const mongoose = require('mongoose');
// Connect to the MongoDB database using Mongoose
mongoose.connect('mongodb+srv://admin:admin@yours.hfgz6.mongodb.net/');

// Define a schema for the movie data
const movieSchema = new mongoose.Schema({
  title: String,  // Movie title
  year: String,   // Release year of the movie
  poster: String  // URL of the movie poster
});

// Create a model based on the movie schema
const movieModel = mongoose.model('myMovies', movieSchema);

// Define a GET route to retrieve a list of movies
app.get('/api/movies', (req, res) => {
    // Sample movie data to send as a response
    const movies = [
        {
          "Title": "Avengers: Infinity War (server)",
          "Year": "2018",
          "imdbID": "tt4154756",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
        },
        {
          "Title": "Captain America: Civil War (server)",
          "Year": "2016",
          "imdbID": "tt3498820",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
        },
        {
          "Title": "World War Z (server)",
          "Year": "2013",
          "imdbID": "tt0816711",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
        }
      ];
    // Send the movie data as a JSON response with a status code of 200
    res.status(200).json({ movies });
});

// Define a POST route to add a new movie
app.post('/api/movies', async (req, res) => {
    // Log the title of the movie being added
    console.log("Movie added: " + req.body.title);

    // Destructure the title, year, and poster from the request body
    const { title, year, poster } = req.body;
    // Create a new movie instance using the movie model
    const newMovie = new movieModel({ title, year, poster });
    // Save the new movie to the database
    await newMovie.save();
    // Send a response indicating that the movie has been added
    res.send("Movie Added!");
});

// Start the Express server and listen on the specified port
app.listen(port, () => {
    // Log the server URL to the console
    console.log(`Server is running on http://localhost:${port}`);
});
