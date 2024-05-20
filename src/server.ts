import express from "express";
import dotenv from 'dotenv'
import { conexionBaseDeDatos } from "./config/db";

dotenv.config();

conexionBaseDeDatos();
const servidor = express();


export default servidor;