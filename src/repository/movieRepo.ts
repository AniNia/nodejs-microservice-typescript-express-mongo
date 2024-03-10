import { Model } from "mongoose";
import { Movie, MovieModel } from "../models/movieModel";

export class MovieRepository {
  private movieModel: Model<Movie>;

  constructor(movieModel: Model<Movie>) {
    this.movieModel = movieModel;
  }

  async addMovie(uuid: string, movieId: string, movieName: string, movieTitle: string, movieDescription: string, movieGenre: string, movieLink: string, movieRating: number, createdDate: Date, updatedDate: Date): Promise<Movie> {
    try {
      const movie = await MovieModel.create({
        uuid, movieId, movieName, movieTitle, movieDescription, movieGenre, movieLink, movieRating, createdDate, updatedDate,
      });
      return movie;
    } catch (error: any) {
      throw new Error(`Failed to add movie: ${error.message}`);
    }
  }

  async getMovies(): Promise<Movie[]> {
    try {
      return await MovieModel.find();
    } catch (error: any) {
      throw new Error(`Failed to get movies: ${error.message}`);
    }
  }

  async getMovie(q: string): Promise<Movie[]> {
    try {
      const searchQuery = {
        $or: [
          { movieGenre: q },
          { movieTitle: q }
        ]
      };
      return await MovieModel.find(searchQuery);
    } catch (error: any) {
      throw new Error(`Failed to get movie: ${error.message}`);
    }
  }

  async updateMovie(uuid: string, movieTitle: string, movieGenre: string, movieLink: string, movieRating: number, updatedDate: Date): Promise<Movie | null> {
    try {
      return await MovieModel.findOneAndUpdate({ uuid }, {
        $set: { movieTitle, movieGenre, movieLink, movieRating, updatedDate }
      }, { new: true });
    } catch (error: any) {
      throw new Error(`Failed to update movie: ${error.message}`);
    }
  }

  async deleteMovie(uuid: string): Promise<Movie | null> {
    try {
      return await MovieModel.findOneAndDelete({ uuid });
    } catch (error: any) {
      throw new Error(`Failed to delete movie: ${error.message}`);
    }
  }
}

export default MovieRepository;
