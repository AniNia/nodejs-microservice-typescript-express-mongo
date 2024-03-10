import {Request, Response, NextFunction} from "express";
const { MovieService } = require('../services/movieService');
const { MovieRepository } = require('../repository/movieRepo');

const MovieModel = require('../models/movieModel');

const movieRepository = new MovieRepository(MovieModel);

const movieService = new MovieService(movieRepository);

exports.addMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await movieService.addMovie(req);
    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    next(error);
  }
};
exports.getMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await movieService.getMovies(req);
    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    next(error);
  }
};
exports.getMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await movieService.getMovie(req);
    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    next(error);
  }
};

exports.updateMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await movieService.updateMovie(req);
    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    next(error);
  }
};

exports.deleteMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await movieService.deleteMovie(req);
    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    next(error);
  }
};