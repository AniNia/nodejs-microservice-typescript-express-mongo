import express from "express";
import bodyParser from "body-parser";
import connectMongoose from "./database/db";
import { MovieService } from "./services/movieService";
import { MovieRepository } from "./repository/movieRepo";
const customResourceResponse = require("./utils/constant");
const movieModel = require('./models/movieModel');
const movieRepo = new MovieRepository(movieModel);
const movieService = new MovieService(movieRepo);
const movieRoutes = require("./routes/movieRoutes");


require("dotenv").config();

const app = express();

app.use(bodyParser.json());

connectMongoose();

app.use("/api/v1", movieRoutes);

// Basic 404 handler
app.use((req, res) => {
    res.status(404).send({
        message: 'The requested URL could not be found.',
        statusCode: 404,
    });
});

app.use((error: any, req: any, res: any, next: any) => {
    const { message } = customResourceResponse.serverError;
    const data = {
        Code: `${error.code ? error.code : ''}`,
        Stacktrace: `${error.stack}`
    };
    res.status(500).json({ message, data });
});

const port = process.env.MOVIE_API_PORT || 3001;

console.log(`Movie server started and listening on port ${port}`);

app.listen(port);