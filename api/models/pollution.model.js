import Sequelize from "sequelize";

export default (sequelize) => {
  const Pollution = sequelize.define("pollutions", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.ENUM('plastique', 'chimique', 'depot-sauvage', 'eau', 'air', 'autre'),
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    observedAt: {
      type: Sequelize.DATE,
      allowNull: false
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false
    },
    latitude: {
      type: Sequelize.DECIMAL(10, 6),
      allowNull: false
    },
    longitude: {
      type: Sequelize.DECIMAL(10, 6),
      allowNull: false
    },
    photoUrl: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });

  return Pollution;
};
