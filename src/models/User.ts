import sequelize from './index';
import { DataTypes, Model, Optional } from 'sequelize';

// export interface UserModel extends Model<UserModel, UserCreationAttributes> {
//   id: number,
//   name: string,
//   username: string,
//   password: string
// }

// interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export interface UserAttributes {
  id: number,
  name: string,
  username: string,
  password: string
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {};

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

const User = sequelize.define<UserInstance>('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default User;