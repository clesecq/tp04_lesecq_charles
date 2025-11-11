import express, { Application } from "express";
import * as catalogue from "../controllers/catalogue.controllers.js";

export default (app: Application): void => {
  const router = express.Router();
  
  router.get("/", catalogue.get);
  app.use('/api/catalogue', router);
};
