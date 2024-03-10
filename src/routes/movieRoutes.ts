import express from 'express';
const router = express.Router();
const movieController = require('../controller/movieController');
import { isAdmin } from "../middleware/middleware";

router.post('/movies', isAdmin, movieController.addMovie);
router.get('/movies', movieController.getMovies);
router.get('/movies/?q', movieController.getMovie);
router.put('/movies/:id', isAdmin, movieController.updateMovie);
router.delete('/movies/:id', isAdmin, movieController.deleteMovie);

// Log all routes and their corresponding controllers
router.stack.forEach((route) => {
    if (route.route) {
        const path = route.route.path;
        const methods = Object.keys(route.route.methods).join(', '); // Convert methods object to string
        console.log(`${methods} ${path}`);
    }
});

module.exports = router; 