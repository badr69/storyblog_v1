// app/models/UserModel.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/sequelize.js';
import RoleModel from './RoleModel.js';

class UserModel extends Model {}

UserModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'role_id',
      references: { model: RoleModel, key: 'id' }
    },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true, // utilise createdAt et updatedAt automatiquement
  }
);

// Associations
UserModel.belongsTo(RoleModel, { foreignKey: 'roleId', as: 'role' });
RoleModel.hasMany(UserModel, { foreignKey: 'roleId', as: 'users' });

export default UserModel;
