import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import express from "express"


const app = express();

const PORT = process.env.PORT|| 5000;

app.use(bodyParser.json());

export {app};