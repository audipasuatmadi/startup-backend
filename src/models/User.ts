import {
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasOneGetAssociationMixin,
  HasOneCreateAssociationMixin,
  Association,
} from 'sequelize';
import {
  UserAttributes,
  UserCreationAttributes,
  TokenAttributes,
  TokenCreationAttributes,
  TokenInstance,
} from '../services/user/usertypes';
import sequelize from './index';
import Token from './Token';
import Article from './Article';

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: number;
  public username!: string;
  public name!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getToken!: HasOneGetAssociationMixin<Token>;
  public createToken!: HasOneCreateAssociationMixin<Token>;

  public saveArticle!: HasManyCreateAssociationMixin<Article>
  public getArticles!: HasManyGetAssociationsMixin<Article>

  public static associations: {
    token: Association<User, Token>;
    articles: Association<User, Article>
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    sequelize,
  }
);

export default User;
