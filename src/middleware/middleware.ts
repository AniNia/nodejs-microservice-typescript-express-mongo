import { Request, Response, NextFunction } from 'express';
require("dotenv").config();

// Define the isAdmin middleware function
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const adminToken = req.headers['admin-token'];

    if (adminToken === process.env.ADMIN_TOKEN) {
        // If user is admin, proceed to the next middleware or route handler
        next();
    } else {
        // If user is not admin, return an error response
        return res.status(403).json({ message: 'Unauthorized. Admin access required.' });
    }
};