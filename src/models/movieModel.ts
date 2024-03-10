import mongoose, { Model } from 'mongoose';

const { Schema } = mongoose;

export interface Movie {
  uuid: String,

  movieId: String,

  movieName:  String,

  movieTitle: String,

  movieDescription: String,

  movieGenre: String,

  movieLink: String,

  movieRating: Number,

  createdDate: mongoose.Schema.Types.Date,

  updatedDate: mongoose.Schema.Types.Date,
}

export const MovieSchema = new Schema<Movie>({
  uuid: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true
  },
  movieName: {
    type: String,
    required: true
  },
  movieTitle: {
    type: String,
    required: true
  },
  movieDescription: {
    type: String,
    required: true
  },
  movieGenre: {
    type: String,
    required: true
  },
  movieLink: {
    type: String,
    required: true
  },
  movieRating: {
    type: Number,
    required: true
  },
  createdDate: {
    type: mongoose.Schema.Types.Date,
    required: true
  },
  updatedDate: {
    type: mongoose.Schema.Types.Date,
    required: true
  }
});

export const MovieModel = mongoose.model<Movie>('MovieModel', MovieSchema, "movie");

export default MovieModel;