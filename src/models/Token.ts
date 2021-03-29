import {
  Model,
  DataTypes,
  HasOneGetAssociationMixin,
  Association,
  BelongsToGetAssociationMixin,
} from 'sequelize';
import {
  TokenAttributes,
  TokenCreationAttributes,
} from '../services/user/usertypes';
import sequelize from './index';
import User from './User';

class Token
  extends Model<TokenAttributes, TokenCreationAttributes>
  implements TokenAttributes {
  public id!: number;
  public token!: string;
  public expiresIn!: Date;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Token.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    expiresIn: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'expires_in',
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      field: 'user_id'
    }
  },
  {
    sequelize,
    tableName: 'tokens',
  }
);

export default Token;
