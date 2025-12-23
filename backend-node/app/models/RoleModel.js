import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/sequelize.js'; // connexion DB

class RoleModel extends Model {}

// Définition de la table "roles"
RoleModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
    timestamps: false, // on gère created_at / updated_at nous-mêmes
  }
);

export default RoleModel;
