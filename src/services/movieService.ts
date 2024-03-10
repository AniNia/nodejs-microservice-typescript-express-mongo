import { v4 as uuidv4 } from 'uuid';
const customResourceResponse = require("../utils/constant");

interface MovieRepository {
    addMovie(uuid: String, movieId: String, movieName: String, movieTitle: String, movieDescription: String, movieGenre: String, movieLink: String, movieRating: Number, createdDate: Date, updatedDate: Date): Promise<any>;
    updateMovie(uuid: String, movieTitle: String, movieGenre: String, movieLink: String, movieRating: Number, updatedDate: Date): Promise<any | null>;
    deleteMovie(uuid: String): Promise<any | null>;
    getMovies(): Promise<any>;
    getMovie(q: String): Promise<any>;
}

export class MovieService {
    private movieRepo: MovieRepository;

    constructor(movieRepo: MovieRepository) {
        this.movieRepo = movieRepo;
    }

    async addMovie(req: any) {
        const { movieId, movieName, movieTitle, movieDescription, movieGenre, movieLink, movieRating } = req.body;
        const uuidV4 = uuidv4();
        const response = {
            message: "",
            statusCode: "",
            data: ""
        };

        if (!movieId || !movieName || !movieTitle || !movieDescription || !movieGenre || !movieLink || !movieRating) {
            response.message = customResourceResponse.reqValidationError.message;
            response.statusCode = customResourceResponse.reqValidationError.statusCode;
            return response;
        }

        let createdDate: Date = new Date();
        let updatedDate: Date = new Date();
        console.log("addMovie service: ", { movieId, movieName, movieTitle, movieDescription, movieGenre, movieLink, movieRating, createdDate, updatedDate })
        const movie = await this.movieRepo.addMovie(uuidV4, movieId, movieName, movieTitle, movieDescription, movieGenre, movieLink, movieRating, createdDate, updatedDate);

        if (!movie) {
            response.message = customResourceResponse.serverError.message;
            response.statusCode = customResourceResponse.serverError.statusCode;
            return response;
        }
        response.message = customResourceResponse.reqCreated.message;
        response.statusCode = customResourceResponse.reqCreated.statusCode;
        response.data = movie;
        return response;
    }

    async getMovies(req: any) {
        const response = {
            message: "",
            statusCode: "",
            data: ""
        };


        const movies = await this.movieRepo.getMovies();

        if (!movies) {
            response.message = customResourceResponse.recordNotFound.message;
            response.statusCode = customResourceResponse.recordNotFound.statusCode;
            return response;
        }
        response.message = customResourceResponse.success.message;
        response.statusCode = customResourceResponse.success.statusCode;
        response.data = movies;
        return response;
    }

    async getMovieByTitleOrGenre(req: any) {
        const response = {
            message: "",
            statusCode: "",
            data: ""
        }; 
        const { q } = req.query;

        console.log("getMovieByTitleOrGenre service: ", { q})

        const movie = await this.movieRepo.getMovie(q);
        if (!movie) {
            response.message = customResourceResponse.recordNotFound.message;
            response.statusCode = customResourceResponse.recordNotFound.statusCode;
            return response;
        }
        response.message = customResourceResponse.success.message;
        response.statusCode = customResourceResponse.success.statusCode;
        response.data = movie;
        return response;
    }

    async updateMovie(req: any) {
        const { movieTitle, movieGenre, movieLink, movieRating } = req.body;

        const response = {
            message: "",
            statusCode: "",
            data: ""
        };        
        
        const { id } = req.params;

        let updatedDate: Date = new Date();

        console.log("updateMovie service: ", { id, movieTitle, movieGenre, movieLink, movieRating, updatedDate });
        const updatedMovie = await this.movieRepo.updateMovie(id, movieTitle, movieGenre, movieLink, movieRating, updatedDate);
        if (!updatedMovie) {
            response.message = customResourceResponse.recordNotFound.message;
            response.statusCode = customResourceResponse.recordNotFound.statusCode;
            return response;
        }

        response.message = customResourceResponse.success.message;
        response.statusCode = customResourceResponse.success.statusCode;
        response.data = updatedMovie;
        return response;
    }

    async deleteMovie(req: any) {
        const response = {
            message: "",
            statusCode: "",
        };        
        
        const { id } = req.params;
        console.log("deleteMovie service: ", { id });

        const deletedMovie = await this.movieRepo.deleteMovie(id);

        if (!deletedMovie) {
            response.message = customResourceResponse.recordNotFound.message;
            response.statusCode = customResourceResponse.recordNotFound.statusCode;
            return response;
        }

        response.message = customResourceResponse.success.message;
        response.statusCode = customResourceResponse.success.statusCode;
        return response;
    }
}

module.exports = {
    MovieService,
};