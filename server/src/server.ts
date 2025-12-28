import * as dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { connectToDatabase } from './database';
import { employeeRouter } from './employee.routes';

dotenv.config();

const {ATLAS_URI} = process.env;
const PORT = process.env.PORT || 5200;

if (!ATLAS_URI) {
    console.error("No ATLAS_URI provided in config");
    process.exit(1);
}

connectToDatabase(ATLAS_URI)
    .then(() => {
        const app = express();
        app.use(cors());
        app.use('/employees', employeeRouter);
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error("Failed to connect to database", error);
        process.exit(1);
    });