import { Sequelize } from "sequelize";
import { DATABASE } from '../config.js';
import utilisateur from "./utilisateurs.model.js";
import pollution from "./pollution.model.js";

const sequelize = new Sequelize(
  `postgres://${DATABASE.user}:${DATABASE.password}@${DATABASE.host}/${DATABASE.name}`,
  {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: true,
      native:true
    },
    define:  {
    	timestamps:false
    }
  }
);

const db = {};

db.sequelize = sequelize;

db.utilisateurs = utilisateur(sequelize);
db.pollutions = pollution(sequelize);

export default db;
