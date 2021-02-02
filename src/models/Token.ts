import sequelize from './index';
import { DataTypes } from 'sequelize'
import { TokenInstance } from '../services/user/usertypes';
import User from '../models/User';

const Token = sequelize.define<TokenInstance>('Token', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  expiresIn: {
    type: DataTypes.DATE
  },
  userId: {
    type : DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  }
})

Token.belongsTo(User, {onDelete: 'CASCADE'})
User.hasOne(Token)

export default Token;