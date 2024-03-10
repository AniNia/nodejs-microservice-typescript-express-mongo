import mongoose from "mongoose";
require("dotenv").config();
const uri: string = process.env.MONGO_DATABASE_URI as string;
const dbName: string = process.env.MOVIE_API_DATABASE_NAME as string

async function connectMongoose() {
    await mongoose.connect(uri, { dbName }).then(() => {
        console.log("mongoose connected...");
    }).catch((e) => {
        console.error("error in connecting mongoose :(", uri);
    })
}

export default connectMongoose;