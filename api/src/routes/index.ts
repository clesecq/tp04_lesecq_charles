import { Application } from "express";
import catalogueRoutes from "./catalogue.routes.js";
import utilisateurRoutes from "./utilisateur.routes.js";
import pollutionRoutes from "./pollution.routes.js";

export default (app: Application): void => {  
  catalogueRoutes(app);
  utilisateurRoutes(app);
  pollutionRoutes(app);
};
