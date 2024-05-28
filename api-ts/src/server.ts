import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';

import { AppDataSource } from './data-source';
import routes from './routes';

dotenv.config();

const port = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("[data source] Data Source has been initialized!");

    const app: Express = express();

    app.use(cors({
      origin: `http://localhost:${process.env.LPORT_FRONT}`,
      methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type'],
    }));

    app.use(express.json())
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(routes);

    app.listen(port, () => {
      console.log(`[server] Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(
      "[data source] Error during Data Source initialization:",
      err
    );
  });
  