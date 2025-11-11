export default app => {  
  require("./catalogue.routes").default(app);
  require("./utilisateur.routes").default(app);
  require("./pollution.routes").default(app);
}
