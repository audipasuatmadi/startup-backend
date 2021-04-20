import sequelize from './index';
import { Model, DataTypes } from 'sequelize/types';
import { ArticleAttribute, ArticleCreaionAttribute } from './Article.type';

class Article extends Model<ArticleAttribute, ArticleCreaionAttribute> implements ArticleAttribute {
  public id!: number;
  public writerId!: number;
  public content!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Article.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    content: {
      type: DataTypes.TEXT,
    },
    writerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      field: 'writer_id',
    }
  },
  {
    sequelize,
    tableName: 'articles'
  }
)

export default Article;