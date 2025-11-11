import { Sequelize, DataTypes, Model, Optional } from "sequelize";

// Interface for Utilisateur attributes
export interface UtilisateurAttributes {
  id: string;
  nom: string;
  prenom?: string;
  login: string;
  pass?: string;
}

// Optional fields for creation
interface UtilisateurCreationAttributes extends Optional<UtilisateurAttributes, 'prenom' | 'pass'> {}

// Model class
export class Utilisateur extends Model<UtilisateurAttributes, UtilisateurCreationAttributes> 
  implements UtilisateurAttributes {
  public id!: string;
  public nom!: string;
  public prenom?: string;
  public login!: string;
  public pass?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Utilisateur.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prenom: {
      type: DataTypes.STRING
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pass: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    tableName: 'utilisateurs',
    timestamps: false
  });

  return Utilisateur;
};
